const $=s=>document.querySelector(s);

const root=document.documentElement;
const setT=t=>{root.dataset.theme=t;$('#tg').textContent=t==='dark'?'Light mode':'Dark mode';document.querySelector('meta[name=theme-color]').content=t==='dark'?'#0c0a1a':'#f6f4ff'};
setT(root.dataset.theme||'dark');
$('#tg').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';setT(t);try{localStorage.setItem('theme',t)}catch(e){}};
$('#yr').textContent=new Date().getFullYear();
$('#mb').onclick=()=>$('#menu').classList.toggle('open');
$('#menu').onclick=e=>{if(e.target.tagName==='A')$('#menu').classList.remove('open')};

const modal=$('#modal'),box=$('#mbody');
const openM=()=>{modal.classList.add('on');document.body.style.overflow='hidden'};
const closeM=()=>{modal.classList.remove('on');document.body.style.overflow=''};
$('#x').onclick=closeM;
modal.onclick=e=>{if(e.target===modal)closeM()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});

const demos={
food(){
 const items=[["Paneer Tikka",220],["Butter Chicken",320],["Veg Biryani",240],["Garlic Naan",50],["Gulab Jamun",90]],cart={};
 box.innerHTML='<h3>Restaurant ordering</h3><div id="ml"></div><div class="tot"><span>Total</span><b id="tt">&#8377;0</b></div><div style="display:flex;gap:10px"><button class="btn" id="cl">Clear</button><button class="btn pri" id="or">Place sample order</button></div><p class="note" id="mg"></p>';
 const draw=()=>{
  $('#ml').innerHTML=items.map((it,i)=>`<div class="item"><span>${it[0]}<small>&#8377;${it[1]}</small></span><span class="qty"><button data-i="${i}" data-d="-1" aria-label="Remove one">&minus;</button><b>${cart[i]||0}</b><button data-i="${i}" data-d="1" aria-label="Add one">+</button></span></div>`).join('');
  $('#tt').textContent='\u20B9'+items.reduce((s,it,i)=>s+it[1]*(cart[i]||0),0);
 };
 $('#ml').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=b.dataset.i;cart[i]=Math.max(0,(cart[i]||0)+Number(b.dataset.d));draw()};
 $('#cl').onclick=()=>{for(const k in cart)delete cart[k];$('#mg').textContent='';draw()};
 $('#or').onclick=()=>{const t=$('#tt').textContent;$('#mg').textContent=t==='\u20B90'?'Add at least one dish first.':'Sample order placed. Total '+t+'. This is a demo, so no real order was sent.'};
 draw();
},
book(){
 const today=new Date().toISOString().split('T')[0];
 box.innerHTML=`<h3>Appointment booking</h3><form id="bf"><label>Name<input id="bn" required></label><label>Service<select id="bs"><option>Haircut</option><option>Facial</option><option>Consultation</option></select></label><label>Date<input id="bd" type="date" min="${today}" required></label><label>Time<select id="bt"><option>10:00 AM</option><option>12:00 PM</option><option>3:00 PM</option><option>5:00 PM</option></select></label><button class="btn pri" type="submit">Book appointment</button></form><div id="bc"></div>`;
 $('#bf').onsubmit=e=>{e.preventDefault();
  const d=new Date($('#bd').value+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  $('#bc').innerHTML=`<div class="box" style="margin-top:16px"><h3>Booking confirmed</h3><p style="margin:0">${$('#bn').value.replace(/</g,'&lt;')}, your ${$('#bs').value} is booked for ${d} at ${$('#bt').value}. This is a demo, so nothing was saved.</p></div>`;
 };
},
shop(){
 const P=[["Cotton Kurta","Clothing",899],["Denim Jacket","Clothing",1799],["Leather Wallet","Accessories",499],["Sports Watch","Accessories",1499],["Running Shoes","Footwear",2299],["Canvas Sneakers","Footwear",1299]],fav=new Set();
 box.innerHTML='<h3>Product catalogue</h3><div class="bar"><input id="sq" placeholder="Search products" aria-label="Search"><select id="sc"><option>All</option><option>Clothing</option><option>Accessories</option><option>Footwear</option></select></div><p class="note" id="sn"></p><div class="pg" id="sg"></div>';
 const draw=()=>{
  const q=$('#sq').value.toLowerCase(),c=$('#sc').value;
  const L=P.map((p,i)=>[p,i]).filter(([p])=>(c==='All'||p[1]===c)&&p[0].toLowerCase().includes(q));
  $('#sn').textContent=fav.size+' saved | '+L.length+' shown';
  $('#sg').innerHTML=L.length?L.map(([p,i])=>`<div class="box"><h3>${p[0]}</h3><p>${p[1]} &middot; &#8377;${p[2]}</p><button class="btn ${fav.has(i)?'on':''}" data-i="${i}">${fav.has(i)?'Saved':'Save'}</button></div>`).join(''):'<p class="lead">No products match. Try another search.</p>';
 };
 $('#sq').oninput=draw;$('#sc').onchange=draw;
 $('#sg').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=Number(b.dataset.i);fav.has(i)?fav.delete(i):fav.add(i);draw()};
 draw();
}};
document.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>{demos[b.dataset.demo]();openM()});

$('#cf').onsubmit=e=>{
 e.preventDefault();
 const body='Name: '+$('#cn').value+'\nEmail: '+$('#ce').value+'\nWebsite type: '+$('#ct').value+'\n\n'+$('#cm').value;
 $('#cnote').textContent='Your email app is opening. Press send there to deliver your message.';
 location.href='mailto:adityayada3110@gmail.com?subject='+encodeURIComponent('Website enquiry from '+$('#cn').value)+'&body='+encodeURIComponent(body);
};
