let customers=JSON.parse(localStorage.getItem("snkCustomers")||"null")||[
{name:"Rahim Traders",business:"Sarakat Agency",phone:"01711-000111",status:"Active",balance:18000},
{name:"Nusrat Fashion",business:"Website Sale",phone:"01822-000222",status:"Active",balance:8500},
{name:"Local Food House",business:"Digital Marketing",phone:"01933-000333",status:"Pending",balance:12500},
{name:"Anjona Ladies Tailors",business:"Sarakat Agency",phone:"01644-000444",status:"Active",balance:0},
{name:"Tech Point BD",business:"Website Sale",phone:"01555-000555",status:"Inactive",balance:3200}];
function renderCustomers(){const q=(search.value||"").toLowerCase(), st=status.value;customerRows.innerHTML=customers.filter(c=>(!st||c.status===st)&&Object.values(c).some(v=>String(v).toLowerCase().includes(q))).map(c=>`<tr><td><div class="customer-name"><span class="customer-avatar">${c.name[0]}</span><b>${c.name}</b></div></td><td>${c.business}</td><td>${c.phone}</td><td><span class="badge">${c.status}</span></td><td class="balance">৳ ${Number(c.balance).toLocaleString()}</td><td><button class="btn" onclick="alert('Customer profile: ${c.name}')">View</button></td></tr>`).join("")||'<tr><td colspan="6">No customers found.</td></tr>'}
function openCustomer(){modal.classList.add("show")}
function closeCustomer(){modal.classList.remove("show")}
customerForm.addEventListener("submit",e=>{e.preventDefault();customers.unshift({name:cName.value,business:cBusiness.value,phone:cPhone.value,status:"Active",balance:Number(cBalance.value||0)});localStorage.setItem("snkCustomers",JSON.stringify(customers));customerForm.reset();closeCustomer();renderCustomers()});
document.addEventListener("DOMContentLoaded",renderCustomers);