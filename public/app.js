// Theme boot
const savedTheme = localStorage.getItem("empire_theme") || "simple";
if(savedTheme === "luxury"){ document.documentElement.setAttribute("data-theme","luxury"); }

// Tabs
const tabs = document.querySelectorAll(".tabs button");
const sections = document.querySelectorAll(".tab");
tabs.forEach(btn=>{
  btn.onclick=()=>{
    tabs.forEach(b=>b.classList.remove("active"));
    sections.forEach(s=>s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

// Theme buttons
document.getElementById("themeSimple").onclick=()=>{
  document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("empire_theme","simple");
};
document.getElementById("themeLuxury").onclick=()=>{
  document.documentElement.setAttribute("data-theme","luxury");
  localStorage.setItem("empire_theme","luxury");
};

// PIN lock
const lock = document.getElementById("lockscreen");
const pinInput = document.getElementById("pin");
const loginBtn = document.getElementById("loginBtn");
const DEFAULT_PIN = "1111";
const storedPin = localStorage.getItem("empire_pin") || DEFAULT_PIN;

function unlockIfAuthed(){
  if(localStorage.getItem("empire_authed")==="yes"){
    lock.classList.add("hidden");
  }
}
unlockIfAuthed();

loginBtn.onclick=()=>{
  if(pinInput.value === storedPin){
    localStorage.setItem("empire_authed","yes");
    lock.classList.add("hidden");
  }else{
    alert("Wrong PIN");
  }
};

// Save new PIN
document.getElementById("savePin").onclick=()=>{
  const np = document.getElementById("newPin").value.trim();
  if(/^\d{4}$/.test(np)){
    localStorage.setItem("empire_pin",np);
    alert("PIN updated.");
  }else{
    alert("Enter a 4-digit PIN.");
  }
};

// Export (placeholder JSON)
document.getElementById("exportBtn").onclick=()=>{
  const data = {
    goal:"$5k–$10k/month",
    theme: localStorage.getItem("empire_theme") || "simple",
    notes:["EmpireS2H seed data"]
  };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "empire-export.json";
  a.click();
};
