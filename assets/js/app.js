(() => {
const session=JSON.parse(sessionStorage.getItem("snkSession")||localStorage.getItem("snkRemember")||"null");
if(!session && !location.pathname.endsWith("login.html") && !location.pathname.endsWith("index.html")) location.href="login.html";
window.SNK=session;
window.logout=()=>{sessionStorage.removeItem("snkSession");localStorage.removeItem("snkRemember");location.href="login.html"};
window.toggleSidebar=()=>document.getElementById("sidebar")?.classList.toggle("open");
const businesses=[
{id:"sarakat",name:"Sarakat Agency",desc:"Agency services & client operations",icon:"SA"},
{id:"website",name:"Website Sale",desc:"Website inventory & sales",icon:"WS"},
{id:"marketing",name:"Digital Marketing",desc:"Clients, campaigns & ads",icon:"DM"}
];
const nav=`<div class="side-brand"><a class="brand" href="dashboard.html"><span class="brand-mark">S</span><span>SNK <b>Business</b></span></a></div>
<div class="nav-label">WORKSPACE</div>
<a class="nav-item" href="dashboard.html"><span class="nav-icon">⌂</span>Dashboard</a>
<a class="nav-item" href="dashboard.html#businesses"><span class="nav-icon">▦</span>My Businesses</a>
<div class="nav-label">MANAGEMENT</div>
<a class="nav-item" href="customers.html"><span class="nav-icon">♙</span>Customers</a>
<a class="nav-item" href="business.html?b=sarakat"><span class="nav-icon">◫</span>Projects</a>
<a class="nav-item" href="business.html?b=website"><span class="nav-icon">◈</span>Payments</a>
<a class="nav-item" href="business.html?b=marketing"><span class="nav-icon">▤</span>Reports</a>
<div class="nav-label">ADMIN</div>
<a class="nav-item" href="admin.html"><span class="nav-icon">⚙</span>Admin Panel</a>
<a class="nav-item" href="browser-ui.html"><span class="nav-icon">✦</span>Browser UI Editor</a>
<div class="side-bottom"><a class="nav-item logout" href="#" onclick="logout();return false;"><span class="nav-icon">↪</span>Sign Out</a></div>`;
document.addEventListener("DOMContentLoaded",()=>{
 const s=document.getElementById("sidebar"); if(s)s.innerHTML=nav;
 document.querySelectorAll("#userName").forEach(e=>e.textContent=session?.name||"Admin");
});
window.businesses=businesses;
})();