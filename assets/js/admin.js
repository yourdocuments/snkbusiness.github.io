document.addEventListener("DOMContentLoaded",()=>{
 if(!SNK || SNK.role!=="super"){document.querySelector(".content").innerHTML='<div class="panel"><h2>Access restricted</h2><p class="muted">Browser UI editing and system administration require Super Admin access.</p><a class="btn btn-primary" href="dashboard.html">Back to Dashboard</a></div>';return}
 const ui=JSON.parse(localStorage.getItem("snkUI")||"{}");document.getElementById("uiCount").textContent=Object.keys(ui).length?8:8;
 document.getElementById("uiPreview").innerHTML=["Homepage headline","Hero subheadline","Primary button","Business cards","Footer text","Contact section","About section","SEO description"].map(x=>`<div>✓ ${x}</div>`).join("");
});