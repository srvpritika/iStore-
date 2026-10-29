import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search, ShoppingBag, Menu, X, Play, ChevronDown, ChevronLeft, ChevronRight} from 'lucide-react';
import './style.css';
import './pine-overrides.css';

const A='https://www.apple.com';
const products=[
 {title:'iPhone 18 Pro',sub:'Pro further.',dark:true,img:`${A}/v/homepage/images/iphone-18-pro/a/promo_iphone_18_pro__9nn5m4mt2bmy_large_2x.jpg`},
 {title:'Apple Watch Series 12',logo:`${A}/v/homepage/images/logos/apple-watch-series-12/a/promo_logo_apple_watch_series_12__eck6698frlqq_large.png`,sub:'The most accurate heart rate sensing in a wearable.*',img:`${A}/sg/homepage/images/apple-watch-series-12/promo_apple_watch_series_12__gnlprtt8526a_large_2x.jpg`},
 {title:'iPad mini',logo:`${A}/v/homepage/images/logos/ipad-mini/a/promo_logo_ipad_mini_a20__dcndmemvplea_large.png`,sub:'More than a little awesome.',note:'Pre-order starting at 1:10am SGT on 29 October\nAvailable starting 6 November',img:`${A}/v/homepage/images/ipad-mini/a/promo_ipad_mini_a20_announce__efc6vmmxg58i_large_2x.jpg`,pricing:true},
 {title:'AirPods Pro 3',sub:'The world’s best in-ear Active Noise Cancellation.',dark:true,img:`${A}/v/homepage/images/airpods-pro-3/a/promo_airpods_pro_3__e4755qofhnyq_large_2x.jpg`},
 {title:'iPad Air',logo:`${A}/v/homepage/images/logos/ipad-air-m4/a/promo_logo_ipad_air__dqdj4ni03quu_large.png`,sub:'Now supercharged by M4.',img:`${A}/v/homepage/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large_2x.jpg`},
 {title:'Apple Watch Ultra 4',logo:`${A}/v/homepage/images/logos/apple-watch-ultra-4/a/promo_logo_apple_watch_ultra_4__bc6ish8cjaeq_large.png`,sub:'A battery you can’t outrun.',img:`${A}/sg/homepage/images/apple-watch-ultra-4/promo_apple_watch_ultra_4__e4r3qertak2u_large_2x.jpg`},
];
const shows=[
 ['https://is1-ssl.mzstatic.com/image/thumb/8rF8s5lmPuF1fmRHAMrzKQ/1250x668sr.jpg','Comedy','Same family. New plan.'],
 ['https://is1-ssl.mzstatic.com/image/thumb/S9dLxU_nCvhomqGnI3-d_g/1250x668sr.jpg','Drama','Happiness is a state of mind.'],
 ['https://is1-ssl.mzstatic.com/image/thumb/1A5UrdlUF6-zEu5cfQvZag/1250x668sr.jpg','Thriller','Curiosity kills.']
];
function Links({pricing=false,buyHref}:{pricing?:boolean,buyHref?:string}){return <div className="links"><a>Learn more</a><a href={buyHref}>{pricing?'View pricing':'Buy'}</a></div>}
function Nav(){const [open,setOpen]=useState(false);return <><nav><a className="apple" aria-label="Apple"></a><div className={'navlinks '+(open?'open':'')}>{['Store','Mac','iPad','iPhone','Watch','Vision','AirPods','Home','Entertainment','Accessories','Support'].map(x=><a key={x}>{x}</a>)}</div><div className="icons"><Search/><ShoppingBag/><button onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></nav></>}
function Hero({kind,title,sub,note,img,dark=false,buyHref}:{kind:string,title:string,sub:string,note?:string,img:string,dark?:boolean,buyHref?:string}){return <section className={`hero ${kind} ${dark?'dark':''}`}><div className="copy"><h1>{title}</h1><h2>{sub}</h2>{note&&<p>{note}</p>}<Links pricing={title==='iMac'} buyHref={buyHref}/></div><picture><source media="(max-width:734px)" srcSet={img.replace('_large_2x','_small_2x')}/><img src={img} alt=""/></picture></section>}
const iStudioCategories=[
 ['Mac','From $999','/assets/istudio/mac.png'],['iPhone','From $1,099','/assets/istudio/iphone.webp'],['iPad','From $649','/assets/istudio/ipad.png'],['WATCH','From $302','/assets/istudio/watch.webp'],['AirPods','From $199.','/assets/istudio/airpods.webp'],['Home','From $199','/assets/istudio/home.png'],['Accessories','From $15','/assets/istudio/accessories.webp'],['AirTag','From $42','/assets/istudio/airtag.png']
];
const iStudioNew=[
 ['NEW','MacBook Pro with PROLED XDR Display','A screen come true.','From $3,999. Trade-in and financing available.','/assets/istudio/new-proled.webp'],
 ['NEW','MacBook Pro M6','Boost mode.','From $2,699. Trade-in and financing available.','/assets/istudio/new-macbook.jpg'],
 ['NEW','iMac M6','Allllll that. And a brand-new chip.','From $2,099. Financing available.','/assets/istudio/new-imac.jpg'],
 ['NEW','iPad mini A20 Pro','More than a little awesome.','From $999. Trade-in and financing available.','/assets/istudio/new-ipad.jpg'],
 ['NEW','iPhone 18 Pro','Pro further.','From $1,899. Trade-in and financing available.','/assets/istudio/new-iphone.jpg']
];
const cdn='https://www.istudiosg.com/cdn/shop/files/';
function App(){const [chatOpen,setChatOpen]=useState(false);return <div className="istudio-home">
 <div className="istudio-announcement"><button>‹</button><span>Learn more about the new MacBook ProLED XDR. <u>Learn more.</u></span><button>›</button></div>
 <header className="istudio-header"><div className="istudio-head-main"><img className="istudio-main-logo" src="/assets/istudio/logo.png" alt="iStudio Singapore"/><div className="premium-partner"> <span>Premium<br/>Partner</span></div><div className="istudio-search"><Search size={22}/><span>Search</span></div><div className="istudio-store">▦ <span>Find a store</span></div><div className="istudio-actions"><span>♙</span><ShoppingBag size={22}/></div></div><nav className="istudio-nav">{['Mac','iPad','iPhone','Watch','AirPods','Home','Accessories','Services','Offers','Stores','Corporate'].map(x=><a key={x}>{x}</a>)}</nav></header>
 <main className="istudio-main"><section className="istudio-hero"><picture><source media="(max-width:700px)" srcSet="/assets/istudio/hero-mobile.jpg"/><img src="/assets/istudio/hero.jpg" alt="MacBook Pro with PROLED XDR Display"/></picture><div className="istudio-slider-dots"><i className="active"></i>{Array.from({length:9}).map((_,i)=><i key={i}></i>)}</div></section>
 <section className="istudio-section category-section"><h2>View all Apple products.</h2><div className="category-row">{iStudioCategories.map(([name,price,img])=><a className="category-card" key={name}><img src={img} alt=""/><b>{name}</b><span>{price}</span></a>)}</div></section>
 <section className="istudio-section new-section"><h2>See what’s new.</h2><div className="new-row">{iStudioNew.map(([tag,title,sub,price,img])=><a className="new-card" key={title}><div><small>{tag}</small><h3>{title}</h3><p>{sub}</p><span>{price}</span></div><img src={img} alt=""/></a>)}</div></section>
 <section className="istudio-section service-section"><h2>Discover services and more.</h2><div className="service-row">{[['NEW','Travel with ease. Stay connected with Bonvoi eSIM.'],['SERVICING','Get an Apple Certified Repair. By Elush Service Provider.'],['PROMOTION','For a limited time only. Shop iStudio deals.'],['FINANCING','Get special financing. Buy now pay later.']].map(([tag,text])=><article key={tag}><small>{tag}</small><h3>{text}</h3><span>Learn more ›</span></article>)}</div></section>
 </main>
 <footer className="istudio-footer"><div><img src="/assets/istudio/logo.png" alt="iStudio"/><p>Apple Premium Partner</p></div>{[['Products','Mac','iPad','iPhone','Watch','AirPods','Accessories'],['Services','AppleCare+','Financing Options','Trade-in','Traveller’s Reservation'],['Support','My Account','Collection & Delivery','Returns & Exchanges','Contact Us'],['About iStudio','About Us','Find an iStudio near you','Why Shop at iStudio']].map(group=><div key={group[0]}><b>{group[0]}</b>{group.slice(1).map(x=><a key={x}>{x}</a>)}</div>)}</footer>
 <button className="home-price-cta" onClick={()=>setChatOpen(true)}><span>Buy at my price</span><i><img src="/assets/coins.svg" alt=""/></i></button>{chatOpen&&<AppleChat onDone={()=>setChatOpen(false)}/>}</div>}
function Footer(){return <footer><div className="footnotes"><p>* Based on data from an Apple-conducted study of heart rate accuracy, during July and August 2026, utilising commercially available best-selling wearables available as of June 2026.</p><p>A subscription is required for Apple TV+.</p><p>Features are subject to change. Some features, applications and services may not be available in all regions or all languages.</p></div><div className="directory">{['Shop and Learn','Apple Wallet','Account','Entertainment','Apple Store','For Business','For Education','For Healthcare','For Government','Apple Values','About Apple'].map((x,i)=><div key={x}><b>{x}</b>{i<5&&<><a>Store</a><a>Mac</a><a>iPad</a><a>iPhone</a></>}</div>)}</div><p className="more">More ways to shop: <a>Find an Apple Store</a> or <a>a retailer</a> near you. Or call 1800-692-7753.</p><div className="legal"><span>Copyright © 2026 Apple Inc. All rights reserved.</span><span>Privacy Policy &nbsp; | &nbsp; Terms of Use &nbsp; | &nbsp; Sales and Refunds &nbsp; | &nbsp; Legal &nbsp; | &nbsp; Site Map</span><b>Singapore</b></div></footer>}

const gallery=[
 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-macbook-pro-size-unselect-202610-gallery-1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=aXlkdGF0T0RUUVdDckNLaUc0OEE0d2huNHI2YVc1MjYxWkRLa3k4U1gzZkZqYlFGRSt2MU1KVVdqeHpVbCs4WHJUNGJWZ1llU1plZmhBekVhZm5NQnNqbWRhTGpRM2xxVWJRWUhSaDlCQ3JBdVNkcGlMWEhjcWdXQU95WUdsMWwvdW5uSjR2YkZNVkdPa3lzQzROY3h3&traceId=1',
 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-macbook-pro-size-unselect-202610-gallery-2?wid=5120&hei=3280&fmt=webp&qlt=90&.v=aXlkdGF0T0RUUVdDckNLaUc0OEE0d2huNHI2YVc1MjYxWkRLa3k4U1gzZFNva2E3UzNyY3MwTWxVRk5FUkhkYXJUNGJWZ1llU1plZmhBekVhZm5NQnNqbWRhTGpRM2xxVWJRWUhSaDlCQ3FiNXZrMXBVZno1ejh3NmRJeU5zcDB1YmZQMXFXa2w0U3RUanhYSTV4Z29R&traceId=1'
];
const optionGroups=[
 {title:'Model.',hint:'Choose your size.',items:[['14-inch¹','Available with M6, M5 Pro or M5 Max chip.','From S$2,699'],['16-inch¹','Available with M5 Pro or M5 Max chip.','From S$3,999']]},
 {title:'Colour.',hint:'Pick your favourite.',items:[['Space Black','',''],['Silver','','']]},
 {title:'Display.',hint:'Choose the best screen type for your workflow.',items:[['Standard display','Engineered for low reflectivity to reduce glare in your environment.',''],['Nano-texture display','Further reduces reflections and glare in bright lighting conditions.','']]},
 {title:'Chip.',hint:'Choose from these powerful options.',items:[['New M6 chip','Blazing fast, with next-level performance, for the personal, professional and creative tasks you do every day.',''],['M5 Pro chip','Provides more performance and higher memory options for more demanding workflows.',''],['M5 Max chip','Our most powerful chip ever built for a pro laptop. Made for extreme workflows.','']]},
];
function Choice({item,selected,onClick}:{item:string[],selected:boolean,onClick:()=>void}){return <button className={'choice '+(selected?'selected':'')} onClick={onClick}><span><b>{item[0]}</b><small>{item[1]}</small></span>{item[2]&&<em>{item[2]}</em>}</button>}
type ChatLine={role:'assistant'|'user',text:string};
function ChatText({text}:{text:string}){return <>{text.split(/(\*\*.*?\*\*)/g).map((part,i)=>part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part)}</>}
function PineLabsScreen({target,onBack}:{target:string,onBack:()=>void}){const amount=target||'1,999';return <div className="pine-screen"><div className="safari-bar"><div className="traffic"><i></i><i></i><i></i></div><div className="safari-nav">‹ &nbsp; ›</div><div className="safari-address">▣ &nbsp; gateway.plural.com</div><div className="safari-tools">↻ &nbsp;&nbsp; ⇧ &nbsp;&nbsp; ＋ &nbsp;&nbsp; ▢</div></div><div className="pine-stage"><div className="pine-checkout"><section className="pine-order"><div className="merchant"><i>T</i><span>TechNova</span></div><div className="pine-amount">S$ {amount}<small>.00</small></div><div className="order-card"><h3>ORDER SUMMARY <span>⌄</span></h3><p>1 product in your cart</p><hr/><h3>CONTACT DETAILS</h3><div className="contact-row"><span>+65 8619 2056</span><b>♢ Verified User</b></div><hr/><h3>DELIVERY ADDRESS</h3><div className="delivery-tags"><span>Home</span><span><img src="/assets/pine/delivery.svg"/> Free Delivery</span></div><p className="address">14-inch MacBook Pro with M6 · Singapore</p></div><div className="trust"><div><img src="/assets/pine/secure.svg"/><span><b>Safe & Secure</b><small>Payments</small></span></div><img className="pci" src="/assets/pine/pci.svg"/><img className="pine-logo" src="/assets/pine/pinelabs.svg"/></div></section><section className="pine-form"><header><button onClick={onBack}><img src="/assets/pine/back.svg"/> Go Back</button><div>文 &nbsp; English⌄</div><button className="close-pay" onClick={onBack}>×</button></header><main><div className="form-title"><span>▰</span><b>Add a New Card <em>(Credit/Debit)</em></b></div><label>Card details</label><div className="card-number"><span>1234&nbsp; 1234&nbsp; 1234&nbsp; 1234</span><img src="/assets/pine/cards.svg"/></div><div className="split-fields"><span>MM/YY</span><span>CVV</span></div><label>Card holder’s name</label><div className="name-field">Full name on card</div><div className="save-card"><i></i><div><b>Securely save your card for future payments</b><span>Pay faster on TechNova for your next purchase</span></div></div><button className="pay-button">Pay S$ {amount}.00</button><p className="simulation-note">Prototype only — do not enter real card information.</p></main></section></div></div></div>}
function PineOtpScreen({target,onBack,onClose,onReturn}:{target:string,onBack:()=>void,onClose:()=>void,onReturn:()=>void}){
 const [otp,setOtp]=useState('');
 const [verified,setVerified]=useState(false);
 const amount=target||'1,999';
 const valid=/^\d{6}$/.test(otp);
 if(verified)return <div className="pine-screen otp-screen"><div className="safari-bar"><div className="traffic"><i></i><i></i><i></i></div><div className="safari-nav">‹ &nbsp; ›</div><div className="safari-address">▣ &nbsp; gateway.plural.com</div><div className="safari-tools">↻ &nbsp;&nbsp; ⇧ &nbsp;&nbsp; ＋ &nbsp;&nbsp; ▢</div></div><div className="otp-success"><div>✓</div><h2>Payment authorized</h2><p>Your simulated card has been authorized for a temporary hold of up to <b>S$ {amount}.00</b>.</p><button onClick={onReturn}>Return to Chat</button><small>Prototype only — no payment was processed.</small></div></div>;
 return <div className="pine-screen otp-screen"><div className="safari-bar"><div className="traffic"><i></i><i></i><i></i></div><div className="safari-nav">‹ &nbsp; ›</div><div className="safari-address">▣ &nbsp; gateway.plural.com</div><div className="safari-tools">↻ &nbsp;&nbsp; ⇧ &nbsp;&nbsp; ＋ &nbsp;&nbsp; ▢</div></div><div className="pine-stage"><div className="pine-checkout otp-checkout"><section className="pine-order"><div className="merchant"><i></i><span>Apple</span></div><div className="pine-amount">S$ {amount}<small>.00</small></div><div className="order-card"><h3>ORDER SUMMARY <span>⌄</span></h3><p>1 product in your cart</p><hr/><h3>CONTACT DETAILS</h3><div className="contact-row"><span>+65 8619 2056</span><b>♢ Verified User</b></div><hr/><h3>DELIVERY ADDRESS</h3><div className="delivery-tags"><span>Home</span><span><img src="/assets/pine/delivery.svg"/> Free Delivery</span></div><p className="address">14-inch MacBook Pro with M6 · Singapore</p></div><div className="trust"><div><img src="/assets/pine/secure.svg"/><span><b>Safe &amp; Secure</b><small>Payments</small></span></div><img className="pci" src="/assets/pine/pci.svg"/><img className="pine-logo" src="/assets/pine/pinelabs.svg"/></div></section><section className="otp-panel"><header><button onClick={onBack}><img src="/assets/pine/back.svg"/> Go Back</button><div>文 &nbsp; English⌄</div><button className="otp-close" onClick={onClose}>×</button></header><main><img className="otp-illustration" src="/assets/pine/otp.svg" alt="OTP verification"/><h2>Enter OTP to complete payment</h2><p>OTP sent to the mobile number linked to your demo card ending with <b>****4242</b></p><div className={'otp-input '+(otp.length>0&&!valid?'invalid':'')}><input autoFocus inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} onKeyDown={e=>e.key==='Enter'&&valid&&setVerified(true)} placeholder="Enter OTP" aria-label="Enter six digit OTP"/><span>Resend OTP in <b>1:40 min</b></span></div>{otp.length>0&&!valid&&<small className="otp-error">Enter any 6-digit demo OTP</small>}<button className="verify-pay" disabled={!valid} onClick={()=>setVerified(true)}>Authorise Mandate</button><p className="bank-copy">Or, complete payment on your <u>bank’s website</u></p><p className="simulation-note">Prototype only — use any six digits. No real OTP is sent.</p></main></section></div></div></div>;
}
function LegacyAppleChat({onDone}:{onDone:()=>void}){
 const product='14-inch MacBook Pro with M6';
 const [message,setMessage]=useState('');
 const [lines,setLines]=useState<ChatLine[]>([]);
 const [stage,setStage]=useState<'starting'|'target'|'confirm'|'card'|'complete'>('starting');
 const [target,setTarget]=useState('');
 const [typing,setTyping]=useState(false);
 const [paymentOpen,setPaymentOpen]=useState(false);
 const sessionId=useState(()=>crypto.randomUUID())[0];
 const request=async(body:Record<string,string>)=>{const response=await fetch('/api/price-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId,product,stage,target,...body})});if(!response.ok)throw new Error('Chat request failed');return response.json() as Promise<{reply:string;replies?:string[];stage:'target'|'confirm'|'card'|'complete';target?:string}>};
 useEffect(()=>{let active=true;setTyping(true);request({action:'start'}).then(data=>{if(active){setLines((data.replies||[data.reply]).map(text=>({role:'assistant',text})));setStage(data.stage);setTyping(false)}}).catch(()=>{if(active){setLines([{role:'assistant',text:'I’m having trouble connecting. Please close the chat and try again.'}]);setTyping(false)}});return()=>{active=false}},[]);
 useEffect(()=>{const viewport=document.querySelector<HTMLElement>('.apple-chat main');if(viewport)requestAnimationFrame(()=>viewport.scrollTo({top:viewport.scrollHeight,behavior:'smooth'}))},[lines,typing,stage]);
 useEffect(()=>{
  if(!paymentOpen)return;
  let cleanup=()=>{};
  const frame=requestAnimationFrame(()=>{
   const screen=document.querySelector<HTMLElement>('.pine-screen');
   if(!screen)return;
   const merchantMark=screen.querySelector<HTMLElement>('.merchant i');
   const merchantName=screen.querySelector<HTMLElement>('.merchant span');
   const authorization=screen.querySelector<HTMLElement>('.save-card');
   const authorizationTitle=screen.querySelector<HTMLElement>('.save-card b');
   const saveCopy=screen.querySelector<HTMLElement>('.save-card span');
   if(merchantMark)merchantMark.textContent='';
   if(merchantName)merchantName.textContent='Apple';
   if(authorizationTitle)authorizationTitle.textContent='Authorize a future purchase';
   if(saveCopy)saveCopy.textContent='A temporary hold will be placed on your card. You’ll be charged only if your target price is reached within 30 days; otherwise, the hold is released.';
   const toggleAuthorization=()=>{if(!authorization)return;const checked=authorization.classList.toggle('checked');authorization.setAttribute('aria-checked',String(checked))};
   const handleAuthorizationKey=(event:KeyboardEvent)=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();toggleAuthorization()}};
   if(authorization){authorization.setAttribute('role','checkbox');authorization.setAttribute('aria-checked','false');authorization.tabIndex=0;authorization.addEventListener('click',toggleAuthorization);authorization.addEventListener('keydown',handleAuthorizationKey)}
   const fillDemoCard=()=>{
    const number=screen.querySelector<HTMLElement>('.card-number span');
    const expiry=screen.querySelector<HTMLElement>('.split-fields span:first-child');
    const cvv=screen.querySelector<HTMLElement>('.split-fields span:last-child');
    const name=screen.querySelector<HTMLElement>('.name-field');
    if(number)number.textContent='4242  4242  4242  4242';
    if(expiry)expiry.textContent='12/30';
    if(cvv)cvv.textContent='123';
    if(name)name.textContent='APPLE DEMO USER';
    screen.classList.add('demo-card-filled');
   };
   const fields=Array.from(screen.querySelectorAll<HTMLElement>('.card-number, .split-fields, .name-field'));
   fields.forEach(field=>{field.title='Click to autofill simulated card details';field.addEventListener('click',fillDemoCard)});
   const payButton=screen.querySelector<HTMLButtonElement>('.pay-button');
   if(payButton)payButton.textContent='Authorise Mandate';
   let otpHost:HTMLDivElement|null=null;
   let otpRoot:ReturnType<typeof createRoot>|null=null;
   const closeOtp=()=>{if(otpRoot){otpRoot.unmount();otpRoot=null}otpHost?.remove();otpHost=null};
   const returnToChat=()=>{closeOtp();setPaymentOpen(false)};
   const openOtp=()=>{if(otpRoot)return;otpHost=document.createElement('div');otpHost.className='otp-portal';document.querySelector('.apple-chat')?.appendChild(otpHost);otpRoot=createRoot(otpHost);otpRoot.render(<PineOtpScreen target={target} onBack={closeOtp} onClose={closeOtp} onReturn={returnToChat}/>)};
   payButton?.addEventListener('click',openOtp);
   cleanup=()=>{fields.forEach(field=>field.removeEventListener('click',fillDemoCard));authorization?.removeEventListener('click',toggleAuthorization);authorization?.removeEventListener('keydown',handleAuthorizationKey);payButton?.removeEventListener('click',openOtp);closeOtp()};
  });
  return()=>{cancelAnimationFrame(frame);cleanup()};
 },[paymentOpen]);
 const send=async()=>{const value=message.trim();if(!value||typing||stage==='starting'||stage==='complete')return;setLines(v=>[...v,{role:'user',text:value}]);setMessage('');setTyping(true);try{const data=await request({action:'message',message:value});window.setTimeout(()=>{setLines(v=>[...v,...(data.replies||[data.reply]).map(text=>({role:'assistant' as const,text}))]);setStage(data.stage);if(data.target)setTarget(data.target);setTyping(false);if(data.stage==='complete')setPaymentOpen(true)},650)}catch{setLines(v=>[...v,{role:'assistant',text:'I couldn’t send that message. Please try again.'}]);setTyping(false)}};
 return <div className="apple-chat"><div className="chat-blackbar"></div><header><div className="chat-status"><img className="istudio-chat-logo" src="/assets/istudio-logo.png" alt="iStudio"/><span><i></i>Your chat is connected</span></div><button onClick={onDone}>Done</button></header><main><div className="chat-thread"><time>28/10/2026 8:06 PM</time><p className="connected-copy">You are connected with iStudio.</p><div className="chat-summary"><span>{product}</span><b>{target?`Target S$${target}`:'Price S$2,699'}</b></div>{lines.map((line,i)=><div key={i} className={line.role==='assistant'?'bot-message':'user-message'}><ChatText text={line.text}/></div>)}{typing&&<div className="typing"><i></i><i></i><i></i></div>}</div></main><footer className="chat-composer"><p>Never enter a full card number, CVV or other payment details in this chat.</p><div><input aria-label="Send Message" placeholder={stage==='target'?'Enter your target price in S$':stage==='confirm'?'Type “confirm” to continue':stage==='card'?'Type a saved card label or “add a card”':'Conversation complete'} value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} disabled={stage==='starting'||stage==='complete'||typing}/><button onClick={send} aria-label="Send message" disabled={!message.trim()||stage==='starting'||stage==='complete'||typing}>↑</button></div></footer>{paymentOpen&&<PineLabsScreen target={target} onBack={()=>setPaymentOpen(false)}/>}</div>
}
const scriptedConversation:ChatLine[]=[
 {role:'assistant',text:'How can we help you?'},
 {role:'user',text:"Hi, I'm looking to buy an iPhone."},
 {role:'assistant',text:"Sure! Which model are you interested in, and what's your budget?"},
 {role:'user',text:"iPhone 17 Pro, 256 GB. What's the current price?"},
 {role:'assistant',text:"It’s currently listed at S$1,749. Are you looking to buy now, or would you wait for a better deal?"},
 {role:'user',text:"I'd wait for a price drop. I'd buy it at S$1,299 or less."},
 {role:'assistant',text:'Sounds good! I can monitor the price and either alert you when it drops or buy it automatically at your target price. Which would you prefer?'},
 {role:'user',text:'Buy it automatically when the price reaches S$1,299 or less.'},
 {role:'assistant',text:"Absolutely! I'll set up an automatic purchase with a maximum spend of S$1,299, including delivery. Let's securely register your card and authorize future purchases within that limit."},
 {role:'assistant',text:'Please confirm and continue.'}
];
function AppleChat({onDone}:{onDone:()=>void}){
 const target='1,299';
 const [lines,setLines]=useState<ChatLine[]>([]);
 const [message,setMessage]=useState('');
 const [typing,setTyping]=useState(true);
 const [ready,setReady]=useState(false);
 const [paymentOpen,setPaymentOpen]=useState(false);
 const [followUpStage,setFollowUpStage]=useState(0);
 useEffect(()=>{
  let cancelled=false;
  let index=0;
  let timer=0;
  const reveal=()=>{timer=window.setTimeout(()=>{if(cancelled)return;const nextLine=scriptedConversation[index];setLines(current=>[...current,nextLine]);index+=1;if(index<scriptedConversation.length){setTyping(true);reveal()}else{setTyping(false);setReady(true)}},2000)};
  reveal();
  return()=>{cancelled=true;window.clearTimeout(timer)};
 },[]);
 useEffect(()=>{const viewport=document.querySelector<HTMLElement>('.apple-chat main');if(viewport)requestAnimationFrame(()=>viewport.scrollTo({top:viewport.scrollHeight,behavior:'smooth'}))},[lines,typing,followUpStage]);
 useEffect(()=>{
  if(!paymentOpen)return;
  let cleanup=()=>{};
  const frame=requestAnimationFrame(()=>{
   const screen=document.querySelector<HTMLElement>('.pine-screen');
   if(!screen)return;
   const merchantMark=screen.querySelector<HTMLElement>('.merchant i');
   const merchantName=screen.querySelector<HTMLElement>('.merchant span');
   const productCopy=screen.querySelector<HTMLElement>('.address');
   const authorization=screen.querySelector<HTMLElement>('.save-card');
   const authorizationTitle=screen.querySelector<HTMLElement>('.save-card b');
   const authorizationCopy=screen.querySelector<HTMLElement>('.save-card span');
   const payButton=screen.querySelector<HTMLButtonElement>('.pay-button');
   if(merchantMark)merchantMark.textContent='';
   if(merchantName)merchantName.textContent='Apple';
   if(productCopy)productCopy.textContent='iPhone 17 Pro, 256 GB · Singapore';
   if(authorizationTitle)authorizationTitle.textContent='Authorize a future purchase';
   if(authorizationCopy)authorizationCopy.textContent='A temporary hold will be placed on your card. You’ll be charged only if your target price is reached within 30 days; otherwise, the hold is released.';
   let cardComplete=false;
   let authorized=false;
   const updateMandateButton=()=>{if(payButton)payButton.disabled=!(cardComplete&&authorized)};
   if(payButton){payButton.textContent='Authorise Mandate';updateMandateButton()}
   const toggleAuthorization=()=>{if(!authorization)return;authorized=authorization.classList.toggle('checked');authorization.setAttribute('aria-checked',String(authorized));updateMandateButton()};
   const handleAuthorizationKey=(event:KeyboardEvent)=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();toggleAuthorization()}};
   if(authorization){authorization.setAttribute('role','checkbox');authorization.setAttribute('aria-checked','false');authorization.tabIndex=0;authorization.addEventListener('click',toggleAuthorization);authorization.addEventListener('keydown',handleAuthorizationKey)}
   const fillDemoCard=()=>{const number=screen.querySelector<HTMLElement>('.card-number span');const expiry=screen.querySelector<HTMLElement>('.split-fields span:first-child');const cvv=screen.querySelector<HTMLElement>('.split-fields span:last-child');const name=screen.querySelector<HTMLElement>('.name-field');if(number)number.textContent='4242  4242  4242  4242';if(expiry)expiry.textContent='12/30';if(cvv)cvv.textContent='123';if(name)name.textContent='APPLE DEMO USER';screen.classList.add('demo-card-filled');cardComplete=true;updateMandateButton()};
   const fields=Array.from(screen.querySelectorAll<HTMLElement>('.card-number, .split-fields, .name-field'));
   fields.forEach(field=>field.addEventListener('click',fillDemoCard));
   let otpHost:HTMLDivElement|null=null;
   let otpRoot:ReturnType<typeof createRoot>|null=null;
   const closeOtp=()=>{if(otpRoot){otpRoot.unmount();otpRoot=null}otpHost?.remove();otpHost=null};
   const returnToChat=()=>{closeOtp();setPaymentOpen(false);setFollowUpStage(1);window.setTimeout(()=>setFollowUpStage(2),2000);window.setTimeout(()=>setFollowUpStage(3),4000)};
   const openOtp=()=>{if(otpRoot)return;otpHost=document.createElement('div');otpHost.className='otp-portal';document.querySelector('.apple-chat')?.appendChild(otpHost);otpRoot=createRoot(otpHost);otpRoot.render(<PineOtpScreen target={target} onBack={closeOtp} onClose={closeOtp} onReturn={returnToChat}/>)};
   payButton?.addEventListener('click',openOtp);
   cleanup=()=>{fields.forEach(field=>field.removeEventListener('click',fillDemoCard));authorization?.removeEventListener('click',toggleAuthorization);authorization?.removeEventListener('keydown',handleAuthorizationKey);payButton?.removeEventListener('click',openOtp);closeOtp()};
  });
  return()=>{cancelAnimationFrame(frame);cleanup()};
 },[paymentOpen]);
 const send=()=>{const value=message.trim();if(!value||!ready)return;setLines(current=>[...current,{role:'user',text:value}]);setMessage('');if(/\b(confirm|confirmed|yes|continue|ok|okay)\b/i.test(value)){setReady(false);window.setTimeout(()=>setPaymentOpen(true),600)}else{setReady(false);setTyping(true);window.setTimeout(()=>{setLines(current=>[...current,{role:'assistant',text:'Please type “confirm” to continue.'}]);setTyping(false);setReady(true)},2000)}};
 return <div className="apple-chat"><div className="chat-blackbar"></div><header><div className="chat-status"><img className="istudio-chat-logo" src="/assets/istudio-logo.png" alt="iStudio"/><span><i></i>Your chat is connected</span></div><button onClick={onDone}>Done</button></header><main><div className="chat-thread"><time>29/10/2026</time><p className="connected-copy">You are connected with iStudio.</p>{lines.map((line,index)=><div key={index} className={line.role==='assistant'?'bot-message':'user-message'}><ChatText text={line.text}/></div>)}{typing&&<div className="typing"><i></i><i></i><i></i></div>}{followUpStage>0&&<div className="bot-message purchase-message"><ChatText text={"You're all set! Your payment method is registered and your price watch is active. I'll check the price and availability, then attempt to complete the purchase automatically when your conditions are met. I'll notify you of the outcome."}/></div>}{followUpStage>1&&<><div className="chat-date-separator"><span>3 November 2026</span></div><div className="bot-message purchase-message"><ChatText text={'Good news! The price of your iPhone 17 Pro, 256 GB has dropped to S$1,299, and the product is available.\nYour purchase meets the conditions you approved. I’m processing the order using your authorized payment method.'}/></div></>}{followUpStage>2&&<div className="bot-message purchase-message"><ChatText text={'Your purchase is complete!\n**Product:** iPhone 17 Pro, 256 GB\n**Purchase price:** S$1,299\n**Payment:** Successfully processed\n**Order:** APL-SG-031126-1724\nI’ll share your order confirmation and delivery details here. Enjoy your new iPhone!'}/></div>}</div></main><footer className="chat-composer"><p>Never enter a full card number, CVV or other payment details in this chat.</p><div><input aria-label="Send Message" placeholder={followUpStage>2?'Purchase completed':followUpStage>0?'Price watch active':ready?'Type “confirm” to continue':'Please wait for the conversation'} value={message} onChange={event=>setMessage(event.target.value)} onKeyDown={event=>event.key==='Enter'&&send()} disabled={!ready||followUpStage>0}/><button onClick={send} aria-label="Send message" disabled={!ready||!message.trim()||followUpStage>0}>↑</button></div></footer>{paymentOpen&&<PineLabsScreen target={target} onBack={()=>setPaymentOpen(false)}/>}</div>;
}
function BuyPage(){const [galleryIndex,setGalleryIndex]=useState(0);const [choices,setChoices]=useState([0,-1,-1,-1]);const [openFaq,setOpenFaq]=useState<number|null>(null);const [chatOpen,setChatOpen]=useState(false);return <div className="buy-page"><Nav/><div className="shop-head"><div><span>New</span><h1>Shop MacBook Pro</h1><p>Pre-order MacBook Pro 14-inch with M6 starting at 1:10am SGT on 29 October.<br/>Available starting 6 November.<br/>Limit of six MacBook Pro 14-inch with M6 per customer.<br/>From S$2,699</p></div><aside><button>Get free setup help from a Specialist. ⊕</button><button>0% instalments available ↗</button><button className="price-pill" data-node-id="706:4492" onClick={()=>setChatOpen(true)}><span>Buy at my price</span><i><img src="/assets/coins.svg" alt=""/></i></button></aside></div>
 <div className="configurator"><div className="product-gallery"><img src={gallery[galleryIndex]} alt="MacBook Pro models"/><button className="prev" onClick={()=>setGalleryIndex(0)}><ChevronLeft/></button><button className="next" onClick={()=>setGalleryIndex(1)}><ChevronRight/></button><div className="gallery-dots"><i className={galleryIndex===0?'on':''}></i><i className={galleryIndex===1?'on':''}></i><i></i></div></div><div className="options">{optionGroups.map((g,gi)=><section className="option-group" key={g.title}><h2>{g.title} <span>{g.hint}</span></h2>{g.title==='Colour.'&&<p className="colour-label">Colour</p>}<div className={g.title==='Colour.'?'swatches':''}>{g.items.map((item,ii)=><Choice key={item[0]} item={item} selected={choices[gi]===ii} onClick={()=>setChoices(c=>c.map((v,i)=>i===gi?ii:v))}/>)}</div>{(g.title==='Display.'||g.title==='Chip.')&&<button className="help-card"><b>Need help choosing {g.title==='Display.'?'your display':'a chip'}?</b><span>{g.title==='Display.'?'Learn about the differences and which one is right for you.':'Compare the options and discover which one is best for you.'}</span><ChevronDown/></button>}</section>)}</div></div>
 <section className="custom"><h2>Customisations. <span>Stay with the standard model or make edits.</span></h2><div className="custom-grid">{[['Unified Memory','Add memory to run more apps simultaneously for faster, more fluid multitasking.','Choose from options up to 128GB'],['Storage','Get ample space and fast access to your apps, photos, movies, music and other files.','Choose from 1TB to 8TB with your current chip selection'],['Power Adapter','','Choose from 3 options'],['Keyboard','','Choose from 6 languages']].map(x=><article><h3>{x[0]}</h3><p>{x[1]}</p><b>{x[2]}</b><ChevronDown/></article>)}</div></section>
 <section className="pro-apps"><h2>Pro apps. <span>Do even more with your Mac.</span></h2><p>Your new Mac comes with a free three-month trial of Apple Creator Studio, an all-in-one subscription that includes powerful apps like Final Cut Pro, Logic Pro, Pixelmator Pro — and much more.</p><p>If you prefer, you can purchase standalone, preinstalled versions of Final Cut Pro and Logic Pro.</p><div className="app-grid">{['Final Cut Pro','Logic Pro'].map(x=><article><h3>{x}</h3><Choice item={['No, thanks','','']} selected={false} onClick={()=>{}}/><Choice item={['Yes, pre-install on my Mac','','']} selected={false} onClick={()=>{}}/><a>View Licence Agreement ↗</a></article>)}</div></section>
 <section className="setup"><h2>Set up your device with one-to-one sessions with a Specialist.</h2><p>When you buy directly from Apple, you can get help transferring your data and making the most of your new device with our free online Personal Setup sessions.</p><a>Learn more</a></section>
 <section className="creator"><div><img className="creator-logo" src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/creator-studio-inpage-logo-202601?wid=342&hei=40&fmt=png-alpha"/><h2>Get 3 months free when you buy a Mac.◊</h2><p>Apple Creator Studio includes Final Cut Pro, Logic Pro, Pixelmator Pro, supercharged productivity apps and more.</p><a>Learn more</a></div><img src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/creator-studio-inpage-icons-202601?wid=840&hei=318&fmt=png-alpha"/></section>
 <section className="education"><div><h2>Students and educators — save on a new Mac.</h2><p>Get special pricing in the Education Store.</p><a>Shop now</a></div></section>
 <section className="faq"><h2>Frequently Asked Questions</h2>{['I’m switching from a PC to a Mac. Is it easy to set up my new Mac and transfer my files?','Does Apple offer any special discounts or promotions to higher-education students, parents and teachers?','What are my delivery options, and when will I get my items?','Can I connect my Mac to additional displays?','What protection does AppleCare offer?','Can I return or exchange my Mac?'].map((q,i)=><div><button onClick={()=>setOpenFaq(openFaq===i?null:i)}>{q}<span>{openFaq===i?'−':'+'}</span></button>{openFaq===i&&<p>Yes. Apple provides straightforward setup, support and flexible options to help you get the most from your new Mac.</p>}</div>)}</section><Footer/>{chatOpen&&<AppleChat onDone={()=>setChatOpen(false)}/>}</div>}
createRoot(document.getElementById('root')!).render(location.pathname.includes('/shop/buy-mac/macbook-pro')?<BuyPage/>:<App/>);
