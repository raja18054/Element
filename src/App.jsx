import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--black:#111;--white:#fff;--pink:#e8506a;--purple:#7c4dff;--mint:#d4ede1;--soft:#f7f5f2;--muted:#6b6b6b;--border:#e8e4df}
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;color:var(--black);background:var(--white);overflow-x:hidden}

  /* NAV */
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 5%;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:box-shadow .3s}
  .nav.sc{box-shadow:0 2px 20px rgba(0,0,0,.08)}
  .logo{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--black);text-decoration:none}
  .nav-ul{display:flex;gap:2rem;list-style:none}
  .nav-ul a{font-size:.875rem;font-weight:500;color:var(--muted);text-decoration:none;transition:color .2s}
  .nav-ul a:hover{color:var(--black)}
  .cta{background:var(--black);color:#fff;padding:.55rem 1.4rem;border-radius:50px;font-size:.875rem;font-weight:500;text-decoration:none;transition:background .2s}
  .cta:hover{background:#333}
  .hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
  .hbg span{display:block;width:24px;height:2px;background:var(--black);border-radius:2px}

  /* HERO */
  .hero{min-height:100vh;padding:120px 5% 80px;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;overflow:hidden;background:var(--white)}
  .hero::before{content:'';position:absolute;top:10%;left:-5%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(232,80,106,.12) 0%,transparent 70%);pointer-events:none}
  .hero::after{content:'';position:absolute;bottom:10%;right:-5%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(124,77,255,.1) 0%,transparent 70%);pointer-events:none}
  .tag{display:inline-flex;align-items:center;gap:.4rem;background:#fef0f2;color:var(--pink);padding:.4rem 1rem;border-radius:50px;font-size:.78rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:1.8rem;animation:fup .6s ease both}
  .h1{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,6vw,4.2rem);font-weight:700;line-height:1.15;max-width:760px;margin-bottom:1.4rem;animation:fup .7s .1s ease both}
  .pk{color:var(--pink);font-style:italic}
  .pu{color:var(--purple)}
  .ud{text-decoration:underline;text-decoration-color:var(--pink);text-underline-offset:6px}
  .sub{font-size:.95rem;color:var(--muted);max-width:500px;line-height:1.75;margin-bottom:2.5rem;animation:fup .7s .2s ease both}
  .avs{display:flex;align-items:center;justify-content:center;margin-bottom:3rem;animation:fup .7s .3s ease both}
  .av{width:50px;height:50px;border-radius:50%;border:3px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.72rem;margin-left:-12px;transition:transform .2s;flex-shrink:0;cursor:pointer}
  .av:first-child{margin-left:0}
  .av:hover{transform:translateY(-5px) scale(1.1);z-index:2}
  .av-st{font-size:.78rem;color:var(--muted);margin-left:1rem;text-align:left}
  .av-st strong{display:block;font-size:.9rem;color:var(--black)}
  .sp{position:absolute;top:17%;right:11%;width:42px;height:50px;background:var(--purple);clip-path:polygon(50% 0%,100% 35%,80% 100%,20% 100%,0% 35%);opacity:.85}
  .sc2{position:absolute;top:33%;left:7%;width:56px;height:56px;border:2px solid rgba(232,80,106,.35);border-radius:50%}

  /* SECTIONS */
  section{padding:90px 5%}
  .sl{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--pink);margin-bottom:.75rem}
  .rv{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
  .rv.vs{opacity:1;transform:translateY(0)}

  /* ABOUT */
  .about{background:var(--soft);display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
  .ah2{font-family:'Playfair Display',serif;font-size:clamp(1.7rem,3.5vw,2.6rem);line-height:1.25;margin-bottom:1.3rem}
  .ap{color:var(--muted);line-height:1.75;margin-bottom:1.1rem;font-size:.93rem}
  .rm{display:inline-flex;align-items:center;gap:.5rem;color:var(--black);font-weight:600;font-size:.875rem;text-decoration:none;border-bottom:2px solid var(--black);padding-bottom:2px;transition:gap .2s,color .2s,border-color .2s}
  .rm:hover{gap:.8rem;color:var(--pink);border-color:var(--pink)}
  .iw{position:relative}
  .ic{width:100%;max-width:360px;aspect-ratio:1;border-radius:50%;overflow:hidden;margin:0 auto;border:6px solid #fff;box-shadow:0 20px 60px rgba(0,0,0,.12)}
  .pb{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.8rem}
  .pb1{background:linear-gradient(135deg,#667eea,#764ba2)}
  .pb2{background:linear-gradient(135deg,#f093fb,#f5576c 50%,#4facfe)}
  .bdg{position:absolute;bottom:14%;right:4%;background:#fff;padding:.75rem 1.1rem;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.12);font-size:.78rem;font-weight:600}
  .bdg span{display:block;color:var(--pink);font-size:1.3rem;font-weight:700}
  .td{position:absolute;bottom:4%;left:4%;width:0;height:0;border-left:38px solid transparent;border-right:38px solid transparent;border-bottom:66px solid rgba(232,80,106,.18)}

  /* PROGRESS */
  .prog{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
  .piw{position:relative}
  .ir{width:100%;border-radius:20px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 16px 50px rgba(0,0,0,.12)}
  .tt{position:absolute;top:-18px;right:-18px;width:0;height:0;border-left:52px solid transparent;border-right:52px solid transparent;border-bottom:90px solid rgba(232,80,106,.85)}
  .ph2{font-family:'Playfair Display',serif;font-size:clamp(1.7rem,3.5vw,2.6rem);line-height:1.25;margin-bottom:1.3rem}
  .pp{color:var(--muted);line-height:1.75;font-size:.93rem;margin-bottom:1.4rem}

  /* SERVICES */
  .sh{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:end;margin-bottom:3.5rem}
  .sh2{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);line-height:1.2}
  .si{color:var(--muted);font-size:.93rem;line-height:1.7}
  .sg{display:grid;grid-template-columns:1fr 1fr;gap:0}
  .sl2{padding-right:3.5rem;border-right:1px solid var(--border)}
  .sr2{padding-left:3.5rem}
  .sc3{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:1.4rem}
  .sit{display:flex;align-items:center;justify-content:space-between;padding:1.1rem 0;border-bottom:1px solid var(--border);cursor:pointer}
  .sit:last-child{border-bottom:none}
  .sn{font-size:.95rem;font-weight:500}
  .sa{width:30px;height:30px;border-radius:50%;border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;transition:transform .2s,background .2s,border-color .2s;flex-shrink:0}
  .sit:hover .sa{background:var(--black);border-color:var(--black);transform:translateX(4px)}
  .sit:hover .asvg{stroke:#fff}

  /* TESTIMONIALS */
  .ts{background:var(--soft);text-align:center}
  .th2{font-family:'Playfair Display',serif;font-size:clamp(1.7rem,3.5vw,2.4rem);margin-bottom:.5rem}
  .tsub{color:var(--muted);margin-bottom:3rem;font-size:.93rem}
  .tl{display:grid;grid-template-columns:140px 1fr 140px;gap:1.5rem;align-items:center;max-width:860px;margin:0 auto}
  .sas{display:flex;flex-direction:column;gap:1rem;align-items:center}
  .sav{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.78rem;cursor:pointer;transition:transform .2s;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .sav:hover{transform:scale(1.1)}
  .tc{background:#fff;border-radius:20px;padding:2.2rem 1.8rem;box-shadow:0 8px 40px rgba(0,0,0,.08)}
  .qt{font-size:2.8rem;color:var(--mint);font-family:Georgia,serif;line-height:1;margin-bottom:.4rem}
  .tt2{font-size:.93rem;color:var(--muted);line-height:1.75;margin-bottom:1.4rem}
  .ta{display:flex;align-items:center;gap:.7rem}
  .aav{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.78rem}
  .an{font-weight:600;font-size:.88rem}
  .ar{font-size:.76rem;color:var(--muted)}
  .dts{display:flex;gap:.5rem;justify-content:center;margin-top:1.8rem}
  .dt{width:8px;height:8px;border-radius:50%;background:var(--border);cursor:pointer;transition:background .2s,width .2s;border:none;padding:0}
  .dt.act{background:var(--pink);width:22px;border-radius:4px}

  /* NEWSLETTER */
  .nl{background:var(--mint);text-align:center;padding:80px 5%;position:relative;overflow:hidden}
  .nl::after{content:'';position:absolute;top:50%;right:5%;transform:translateY(-50%);width:56px;height:68px;background:var(--purple);clip-path:polygon(50% 0%,100% 35%,80% 100%,20% 100%,0% 35%);opacity:.7}
  .nh2{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);margin-bottom:.75rem}
  .np{color:#5a7a6b;margin-bottom:2.2rem;font-size:.93rem}
  .nf{display:flex;max-width:460px;margin:0 auto;border-radius:50px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)}
  .ni{flex:1;padding:.95rem 1.4rem;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:.88rem}
  .nb{background:var(--black);color:#fff;border:none;padding:.95rem 1.6rem;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;transition:background .2s;white-space:nowrap}
  .nb:hover{background:#333}
  .nb.ok{background:#2a9d5c}

  /* FOOTER */
  footer{background:var(--black);color:#fff;padding:60px 5% 28px}
  .fg{display:grid;grid-template-columns:repeat(4,1fr);gap:3rem;margin-bottom:3rem}
  .fc h4{font-size:.76rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:1.1rem}
  .fc .br{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:.7rem}
  .fc .bs{font-size:.82rem;color:#888;line-height:1.6}
  .fc ul{list-style:none;display:flex;flex-direction:column;gap:.65rem}
  .fc ul a{color:#aaa;text-decoration:none;font-size:.85rem;transition:color .2s}
  .fc ul a:hover{color:#fff}
  .fct p{font-size:.85rem;color:#888;line-height:1.8}
  .fct strong{color:#fff}
  .fb{border-top:1px solid #2a2a2a;padding-top:1.4rem;display:flex;align-items:center;justify-content:space-between;font-size:.78rem;color:#666}
  .fb a{color:#888;text-decoration:none}
  .fb a:hover{color:#fff}

  @keyframes fup{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

  @media(max-width:900px){
    .about,.prog{grid-template-columns:1fr;gap:2.5rem}
    .piw{order:-1}
    .sh,.sg{grid-template-columns:1fr}
    .sl2{padding-right:0;border-right:none;border-bottom:1px solid var(--border);padding-bottom:2rem;margin-bottom:2rem}
    .sr2{padding-left:0}
    .tl{grid-template-columns:1fr}
    .sas{flex-direction:row;justify-content:center}
    .fg{grid-template-columns:1fr 1fr;gap:2rem}
  }
  @media(max-width:600px){
    .nav-ul{display:none}
    .hbg{display:flex}
    .nav-ul.op{display:flex;flex-direction:column;position:fixed;top:62px;left:0;right:0;background:#fff;padding:1.4rem 5%;border-bottom:1px solid var(--border);box-shadow:0 8px 20px rgba(0,0,0,.08);z-index:99;gap:1.1rem}
    .hero{padding:100px 5% 60px}
    section{padding:60px 5%}
    .fg{grid-template-columns:1fr}
    .nf{flex-direction:column;border-radius:12px}
    .nb{border-radius:0 0 12px 12px}
  }
`;

const AC = ["linear-gradient(135deg,#f093fb,#f5576c)","linear-gradient(135deg,#4facfe,#00f2fe)","linear-gradient(135deg,#43e97b,#38f9d7)","linear-gradient(135deg,#fa709a,#fee140)","linear-gradient(135deg,#a18cd1,#fbc2eb)","linear-gradient(135deg,#ffecd2,#fcb69f)","linear-gradient(135deg,#a1c4fd,#c2e9fb)","linear-gradient(135deg,#fd7043,#ff8a65)"];
const AL = ["AK","SR","MJ","PL","NK","TR","AS","WM"];

function Arrow(){
  return(
    <svg className="asvg" width="13" height="13" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

function useRv(){
  const r=useRef(null);
  useEffect(()=>{
    const el=r.current; if(!el) return;
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("vs");ob.unobserve(el);}},{threshold:.13});
    ob.observe(el);
    return()=>ob.disconnect();
  },[]);
  return r;
}

function Navbar({sc}){
  const [op,setOp]=useState(false);
  return(
    <nav className={`nav${sc?" sc":""}`}>
      <a href="#hero" className="logo">elementum</a>
      <ul className={`nav-ul${op?" op":""}`}>
        {["About","Work","Services","Testimonials","Contact"].map((l,i)=>(
          <li key={l}><a href={`#${["about","prog","services","ts","nl"][i]}`} onClick={()=>setOp(false)}>{l}</a></li>
        ))}
      </ul>
      <a href="#nl" className="cta">Get Started</a>
      <button className="hbg" onClick={()=>setOp(o=>!o)} aria-label="menu">
        <span/><span/><span/>
      </button>
    </nav>
  );
}

function Hero(){
  return(
    <section className="hero" id="hero">
      <div className="sp"/><div className="sc2"/>
      <div className="tag">✦ We are a team of thinkers</div>
      <h1 className="h1">
        The thinkers and<br/>
        doers were <span className="pk">changing</span><br/>
        the <span className="ud">status</span> Quo with <span className="pu">✦</span>
      </h1>
      <p className="sub">We are a team of strategic, plugged-in communicators and researchers. Together, we make progress happen when you know things right.</p>
      <div className="avs">
        {AL.map((l,i)=>(<div key={l} className="av" style={{background:AC[i]}}>{l}</div>))}
        <div className="av-st"><strong>500+</strong>Happy clients</div>
      </div>
    </section>
  );
}

function About(){
  const r1=useRv(),r2=useRv();
  return(
    <section className="about" id="about">
      <div ref={r1} className="rv">
        <div className="sl">About Us</div>
        <h2 className="ah2">Tomorrow should<br/>be <span className="pk">better</span> than today</h2>
        <p className="ap">We are a team of strategic communicators and researchers. Together, we make progress happen when you know things right.</p>
        <p className="ap">Our approach combines deep industry knowledge with creative thinking to deliver solutions that move the needle.</p>
        <a href="#prog" className="rm">Read more →</a>
      </div>
      <div ref={r2} className="rv iw">
        <div className="ic"><div className="pb pb1">🤝</div></div>
        <div className="bdg"><span>12+</span>Years Experience</div>
        <div className="td"/>
      </div>
    </section>
  );
}

function Progress(){
  const r1=useRv(),r2=useRv();
  return(
    <section className="prog" id="prog">
      <div ref={r1} className="rv piw">
        <div className="ir"><div className="pb pb2" style={{height:"100%",fontSize:"3.5rem"}}>💼</div></div>
        <div className="tt"/>
      </div>
      <div ref={r2} className="rv">
        <div className="sl">Our Process</div>
        <h2 className="ph2">See how we can<br/>help you <span className="pk">progress</span></h2>
        <p className="pp">We add fearless insights and action that drives change. Elementum is committed that progress comes first as we love to design strategy and build for tomorrow.</p>
        <a href="#services" className="rm">Read more →</a>
      </div>
    </section>
  );
}

const SRVS=[
  {col:"l",cat:"Office of multiple strategic content",items:["Collaborative & partnership","We talk about our weight","Piloting digital confidence"]},
  {col:"r",cat:"Data-based digital social",items:["Strategic brand positioning","Research & insights driven growth","Content strategy & execution"]},
];

function Services(){
  const rh=useRv(),rg=useRv();
  return(
    <section id="services">
      <div ref={rh} className="rv sh">
        <h2 className="sh2">What we can<br/><span className="pk">offer</span> you!</h2>
        <p className="si">From strategic consulting to digital transformation, we bring the full spectrum of expertise to help you grow.</p>
      </div>
      <div ref={rg} className="rv sg">
        {SRVS.map(({col,cat,items})=>(
          <div key={col} className={col==="l"?"sl2":"sr2"}>
            <div className="sc3">{cat}</div>
            {items.map(n=>(
              <div key={n} className="sit">
                <span className="sn">{n}</span>
                <div className="sa"><Arrow/></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials(){
  const [act,setAct]=useState(0);
  const r=useRv();
  return(
    <section className="ts" id="ts">
      <div className="sl">Testimonials</div>
      <h2 className="th2">What our customer<br/>says <span className="pk">About Us</span></h2>
      <p className="tsub">Hear from those who worked with us</p>
      <div ref={r} className="rv tl">
        <div className="sas">
          {[0,2,4].map(i=>(<div key={i} className="sav" style={{background:AC[i]}}>{AL[i]}</div>))}
        </div>
        <div className="tc">
          <div className="qt">"</div>
          <p className="tt2">Elementum delivered the site with little fanfare. The client found a 50% increase in online visibility within 6 months. They had an impressive ability to use technologies that proved to be easy to use and reliable.</p>
          <div className="ta">
            <div className="aav" style={{background:AC[1]}}>SR</div>
            <div><div className="an">Sarah Richardson</div><div className="ar">CEO, TechVentures</div></div>
          </div>
        </div>
        <div className="sas">
          {[3,5,7].map(i=>(<div key={i} className="sav" style={{background:AC[i]}}>{AL[i]}</div>))}
        </div>
      </div>
      <div className="dts">
        {[0,1,2].map(i=>(<button key={i} className={`dt${act===i?" act":""}`} onClick={()=>setAct(i)}/>))}
      </div>
    </section>
  );
}

function Newsletter(){
  const [em,setEm]=useState("");
  const [ok,setOk]=useState(false);
  const sub=()=>{
    if(em.includes("@")){setOk(true);setTimeout(()=>{setOk(false);setEm("");},3000);}
    else alert("Please enter a valid email.");
  };
  return(
    <section className="nl" id="nl">
      <div className="sl">Stay Connected</div>
      <h2 className="nh2">Subscribe to<br/>our newsletter</h2>
      <p className="np">Stay up to date with the latest news</p>
      <div className="nf">
        <input className="ni" type="email" placeholder="Enter your email address" value={em} onChange={e=>setEm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sub()}/>
        <button className={`nb${ok?" ok":""}`} onClick={sub}>{ok?"✓ Subscribed!":"Subscribe Now"}</button>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer>
      <div className="fg">
        <div className="fc">
          <div className="br">elementum</div>
          <p className="bs">Building tomorrow's<br/>solutions today.<br/><br/>Where thinkers meet doers.</p>
        </div>
        <div className="fc">
          <h4>Company</h4>
          <ul>{["Home","About Us","Services","Career","Blog","Awards"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
        </div>
        <div className="fc">
          <h4>Terms &amp; Policies</h4>
          <ul>{["Privacy Policy","Cookie Policy","Terms of Use","Accessibility"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
          <br/>
          <h4>Follow Us</h4>
          <ul>{["Instagram","LinkedIn","Twitter / X","YouTube"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
        </div>
        <div className="fc fct">
          <h4>Contact</h4>
          <p><strong>Office Address</strong><br/>45 Design St
