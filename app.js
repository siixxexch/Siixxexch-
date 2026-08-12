const KEY="siixxexch_demo_v1";
const DEFAULT={host:{id:"HOST001",password:"ChangeMe123!",coins:99999999999},players:[]};
let db=JSON.parse(localStorage.getItem(KEY)||"null")||DEFAULT;
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function header(){return `<div class="top"><div class="wrap"><div class="brand">SIIXXEXCH</div><div class="tag">Best Trusted Gaming Website · Demo Coins Only</div></div></div>`}
function login(){
document.getElementById("app").innerHTML=header()+`<div class="wrap"><div class="card"><h2>Login</h2>
<p class="muted">Host or player account</p><input id="id" class="input" placeholder="ID"><input id="pw" class="input" type="password" placeholder="Password">
<button class="btn" onclick="doLogin()">Login</button><button class="btn alt" onclick="guest()">Demo Lobby</button>
<p class="muted">Default host: HOST001 / ChangeMe123!</p></div></div>`}
function doLogin(){
let id=document.getElementById("id").value.trim(),pw=document.getElementById("pw").value;
if(id===db.host.id&&pw===db.host.password)return host();
let p=db.players.find(x=>x.id===id&&x.password===pw); if(p)return player(p.id);
alert("Invalid ID or password")}
function guest(){lobby("Guest")}
function host(){
document.getElementById("app").innerHTML=header()+`<div class="wrap">
<div class="row"><h2>Host Dashboard</h2><button class="btn alt" onclick="login()">Logout</button></div>
<div class="grid"><div class="card"><div class="muted">Host balance</div><div class="coin">${db.host.coins.toLocaleString()} 🪙</div></div>
<div class="card"><div class="muted">Players</div><div class="coin">${db.players.length}</div></div></div>
<div class="card"><h3>Create Player ID</h3><input id="pid" class="input" placeholder="Player ID"><input id="ppw" class="input" placeholder="Temporary password">
<input id="pcoins" class="input" type="number" placeholder="Coins to give"><button class="btn" onclick="createPlayer()">Create & Give Coins</button></div>
<div class="card"><h3>Player Management</h3><div id="plist"></div></div>
<div class="card"><h3>Host Password</h3><input id="oldh" class="input" type="password" placeholder="Current password"><input id="newh" class="input" type="password" placeholder="New password"><button class="btn" onclick="changeHostPw()">Change Password</button></div>
</div>`;renderPlayers()}
function createPlayer(){
let id=document.getElementById("pid").value.trim(),pw=document.getElementById("ppw").value,amt=Number(document.getElementById("pcoins").value||0);
if(!id||!pw)return alert("Enter player ID and password");
if(db.players.some(p=>p.id===id)||id===db.host.id)return alert("ID already exists");
if(amt<0||amt>db.host.coins)return alert("Invalid coin amount");
db.host.coins-=amt;db.players.push({id,password:pw,coins:amt});save();host();alert("Player created")}
function renderPlayers(){
let el=document.getElementById("plist"); if(!db.players.length){el.innerHTML="<p class='muted'>No players yet.</p>";return}
el.innerHTML=`<table><tr><th>ID</th><th>Coins</th><th>Actions</th></tr>`+db.players.map(p=>`<tr><td>${esc(p.id)}</td><td>${p.coins.toLocaleString()}</td><td><button class="btn" onclick="give('${encodeURIComponent(p.id)}')">Give</button><button class="btn alt" onclick="resetPlayer('${encodeURIComponent(p.id)}')">Password</button></td></tr>`).join("")+"</table>"}
function give(enc){let p=db.players.find(x=>x.id===decodeURIComponent(enc));let a=Number(prompt("Coins to give:",0));if(!p||!Number.isFinite(a)||a<0||a>db.host.coins)return alert("Invalid amount");db.host.coins-=a;p.coins+=a;save();host()}
function resetPlayer(enc){let p=db.players.find(x=>x.id===decodeURIComponent(enc));let pw=prompt("New player password:");if(p&&pw){p.password=pw;save();host()}}
function changeHostPw(){if(document.getElementById("oldh").value!==db.host.password)return alert("Current password incorrect");let n=document.getElementById("newh").value;if(!n)return alert("Enter new password");db.host.password=n;save();host()}
function player(id){
let p=db.players.find(x=>x.id===id); document.getElementById("app").innerHTML=header()+`<div class="wrap"><div class="row"><h2>Player Account</h2><button class="btn alt" onclick="login()">Logout</button></div>
<div class="card"><div class="muted">Player ID</div><h3>${esc(p.id)}</h3><div class="muted">Demo coin balance</div><div class="coin">${p.coins.toLocaleString()} 🪙</div></div>
<div class="card"><h3>Change Password</h3><input id="oldp" class="input" type="password" placeholder="Current password"><input id="newp" class="input" type="password" placeholder="New password"><button class="btn" onclick="changePlayerPw('${encodeURIComponent(p.id)}')">Change Password</button></div>
<div class="card"><button class="btn" onclick="lobby('${esc(p.id)}')">Open Game Lobby</button></div></div>`}
function changePlayerPw(enc){let p=db.players.find(x=>x.id===decodeURIComponent(enc));if(document.getElementById("oldp").value!==p.password)return alert("Current password incorrect");let n=document.getElementById("newp").value;if(!n)return alert("Enter new password");p.password=n;save();player(p.id)}
function lobby(user){document.getElementById("app").innerHTML=header()+`<div class="wrap"><div class="row"><h2>Game Lobby</h2><button class="btn alt" onclick="login()">Login</button></div>
<div class="card"><span class="pill">PLAY-MONEY DEMO</span><h3>Games</h3><div class="grid">
<div class="card"><h3>Demo Cricket</h3><p class="muted">Practice-only game interface.</p><button class="btn" onclick="alert('Demo game — no real-money wagering.')">Open</button></div>
<div class="card"><h3>Demo Cards</h3><p class="muted">Practice-only card interface.</p><button class="btn" onclick="alert('Demo game — no real-money wagering.')">Open</button></div>
<div class="card"><h3>Demo Casino</h3><p class="muted">Practice-only lobby.</p><button class="btn" onclick="alert('Demo game — no real-money wagering.')">Open</button></div>
</div></div></div>`}
login();