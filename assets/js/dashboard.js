document.addEventListener("DOMContentLoaded",()=>{
 const d=new Date();document.getElementById("today").textContent=d.toLocaleDateString("en-BD",{day:"numeric",month:"short",year:"numeric"});
 const box=document.getElementById("businessCards");
 businesses.forEach(b=>box.innerHTML+=`<div class="business-card" onclick="location.href='business.html?b=${b.id}'"><div class="biz-icon">${b.icon}</div><div><h4>${b.name}</h4><p>${b.desc}</p></div><em>→</em></div>`);
});