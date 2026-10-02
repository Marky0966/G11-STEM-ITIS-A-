const OWNER='dapidran9@gmail.com';
const SUBJECTS=['General Mathematics','Earth & Life Science','Oral Communication','Komunikasyon at Pananaliksik','Computer Programming (ITIS)','Pre-Calculus','Physical Education','Understanding Culture & Society'];
const TERMS=['Term 1','Term 2','Term 3'];
const db={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const user=()=>db.get('user',null);
const isOwner=()=>user()&&user().email===OWNER;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function login(name,email){
  name=name.trim();email=email.trim().toLowerCase();
  if(email){if(!/^[^@\s]+@gmail\.com$/.test(email))return'Gmail lang po (halimbawa: pangalan@gmail.com).';if(!name)name=email.split('@')[0];}
  else if(name.split(/\s+/).length<2)return'Kung walang Gmail, ilagay ang buong pangalan (first at last name).';
  db.set('user',{name,email});
  const l=db.get('logins',[]);l.push({name,email:email||'—',at:new Date().toLocaleString()});db.set('logins',l);return'';
}
function guard(){if(!user())location.href='login.html'}
function nav(p){
  const links=[['index.html','Home'],['subjects.html','Subjects & Lessons'],['chat.html','Class Chat']];
  if(isOwner())links.push(['admin.html','Owner Panel']);
  document.body.insertAdjacentHTML('afterbegin',`<header><b><a href="index.html" style="padding:0"><img src="logo.svg" alt="G11 STEM ITIS A1" height="40"></a></b>${links.map(l=>`<a href="${l[0]}" class="${l[0]==p?'on':''}">${l[1]}</a>`).join('')}<span>${esc(user().name)}</span><a href="#" onclick="localStorage.removeItem('user');location.href='login.html'">Logout</a></header>`);
}

function googleLogin(){const e=prompt('Google Sign-In (demo): ilagay ang iyong Gmail');if(e===null)return;const r=login('',e);r?alert(r):location.href='index.html'}
