const DATA={
 sarakat:{name:"Sarakat Agency",desc:"Agency services, projects, customers and payments.",stats:[["Revenue","৳ 185,000"],["Customers","74"],["Projects","18"],["Pending","৳ 31,500"]],mods:["Overview","Customers","Projects","Payments","Expenses","Invoices","Employees","Tasks","Reports"]},
 website:{name:"Website Sale",desc:"Ready-made website inventory and sales management.",stats:[["Sales","৳ 146,000"],["Inventory","42"],["Sold","31"],["Pending","৳ 22,000"]],mods:["Overview","Website Inventory","Available Websites","Sold Websites","New Customer","Payments","Hosting / Domain","Delivery","Sales History"]},
 marketing:{name:"Digital Marketing",desc:"Clients, campaigns, Facebook Ads and performance.",stats:[["Revenue","৳ 97,500"],["Clients","81"],["Campaigns","23"],["Ad Spend","৳ 48,200"]],mods:["Overview","Clients","Campaigns","Facebook Ads","Content","Reports","Payments","Tasks"]}}
document.addEventListener("DOMContentLoaded",()=>{
 const key=new URLSearchParams(location.search).get("b")||"sarakat", d=DATA[key]||DATA.sarakat;
 document.title=d.name+" | SNK Business";document.getElementById("businessName").textContent=d.name;document.getElementById("businessTitle").textContent=d.name;document.getElementById("businessDesc").textContent=d.desc;
 document.getElementById("businessStats").innerHTML=d.stats.map(x=>`<div class="stat"><span>${x[0]}</span><strong>${x[1]}</strong><small>Current period</small></div>`).join("");
 document.getElementById("moduleGrid").innerHTML=d.mods.map((m,i)=>`<div class="module" onclick="alert('${m} module ready for integration.')"><strong>${["◫","♙","▦","৳","−","▤","♟","✓","◉"][i%9]} ${m}</strong><span>Open ${m.toLowerCase()} →</span></div>`).join("");
});