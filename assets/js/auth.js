(() => {
const ACCOUNTS=[
 {email:"admin@snkbusiness.com",password:"SNK@12345",role:"super",name:"Super Admin"},
 {email:"manager@snkbusiness.com",password:"Admin@12345",role:"admin",name:"Business Admin"}
];
document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("email").value.trim().toLowerCase(), pass=document.getElementById("password").value;
 const account=ACCOUNTS.find(a=>a.email===email&&a.password===pass);
 if(!account){document.getElementById("loginError").textContent="Invalid email or password.";return}
 sessionStorage.setItem("snkSession",JSON.stringify(account));
 if(document.getElementById("remember").checked)localStorage.setItem("snkRemember",JSON.stringify(account));
 location.href="dashboard.html";
});
})();