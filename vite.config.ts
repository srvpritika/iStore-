import {defineConfig, type Plugin} from 'vite';
import type {IncomingMessage, ServerResponse} from 'node:http';

type Stage='target'|'confirm'|'card'|'complete';
type Session={stage:Stage;product:string;target?:string;messages:Array<{role:'user'|'assistant';text:string}>};
const sessions=new Map<string,Session>();

function priceChatApi():Plugin{return{name:'price-chat-api',configureServer(server){
 server.middlewares.use((_req,res,next)=>{res.setHeader('Cache-Control','no-store, no-cache, must-revalidate');res.setHeader('Pragma','no-cache');res.setHeader('Expires','0');next()});
 server.middlewares.use('/api/price-chat',async(req:IncomingMessage,res:ServerResponse)=>{
 if(req.method!=='POST'){res.statusCode=405;res.end();return}
 let raw='';for await(const chunk of req)raw+=chunk;
 try{
  const body=JSON.parse(raw) as {sessionId?:string;product?:string;action?:string;message?:string};
  if(!body.sessionId){res.statusCode=400;res.end(JSON.stringify({error:'Missing session'}));return}
  res.setHeader('Content-Type','application/json');
  if(body.action==='start'){
   const product=body.product||'this product';
   const intro=`Set a price for ${product}. If it reaches your target within 30 days, I’ll buy it using the card you authorize. If it doesn’t, the request will be dropped.`;
   const question='What price would you like to pay in S$?';
   sessions.set(body.sessionId,{stage:'target',product,messages:[{role:'assistant',text:intro},{role:'assistant',text:question}]});
   res.end(JSON.stringify({reply:intro,replies:[intro,question],stage:'target'}));return;
  }
  const session=sessions.get(body.sessionId);if(!session){res.statusCode=409;res.end(JSON.stringify({error:'Session expired'}));return}
  const message=(body.message||'').trim();if(!message){res.statusCode=400;res.end(JSON.stringify({error:'Empty message'}));return}
  if(/(?:\d[ -]?){13,19}/.test(message)||/\bcvv\b|\bcvc\b|security code/i.test(message)){
   const reply='Please don’t share full card numbers, CVVs or other payment details here. Enter only a target price, a saved-card label such as “Visa ending 4242”, or “add a card”.';
   session.messages.push({role:'assistant',text:reply});res.end(JSON.stringify({reply,stage:session.stage,target:session.target}));return;
  }
  session.messages.push({role:'user',text:message});
  let reply='';let replies:string[]|undefined;
  if(session.stage==='target'){
   const match=message.replace(/,/g,'').match(/(?:S\$\s*)?(\d+(?:\.\d{1,2})?)/i);
   if(!match||Number(match[1])<=0){reply='What target price would you like to set? Please enter an amount in S$, for example S$2,400.'}
   else{session.target=Number(match[1]).toLocaleString('en-SG',{maximumFractionDigits:2});session.stage='confirm';reply=`Your target is **S$${session.target}** for the **${session.product}**. To activate your request, add and verify a card on the Pine Labs secure payment page. A temporary hold of **S$${session.target}** will be placed on your card. If the listed price reaches S$${session.target} or less within 30 days, I’ll use your authorized card to buy it. Otherwise, the request expires and the hold is released; your bank may take time to process the release. Enter your card details only on the Pine Labs page.`;replies=[reply,'Confirm to continue.']}
  }else if(session.stage==='confirm'){
   if(/^(confirm|confirmed|yes|yes,? continue|continue|ok|okay)$/i.test(message)){session.stage='complete';reply=`**S$${session.target} has been temporarily blocked on your Visa ending in 4242.** Your purchase request is active for 30 days. If the product reaches your target price, I’ll complete the purchase and send the order confirmation and bill to your registered email and phone number. You won’t be charged unless the purchase is completed.`}
   else reply='Please type “confirm” to continue.';
  }else if(session.stage==='card'){
   const looksLikeChoice=/ending\s*\d{4}|saved\s+card|visa|mastercard|amex|add\s+(a\s+)?(new\s+)?card/i.test(message);
   if(!looksLikeChoice){reply='Please type the label of a saved card, such as “Visa ending 4242”, or say “add a card”. Don’t enter a full card number or CVV.'}
   else{session.stage='complete';reply=`Thanks. Pine Labs will open next so you can securely select or add a card and authorize the purchase. A temporary hold of up to S$${session.target} may appear; it is not a charge. Your card will be charged only if ${session.product} reaches S$${session.target} or less within 30 days and the purchase is made. If the price does not reach your target within 30 days, the request will be dropped.`}
  }else reply='This chat step is complete. Pine Labs would open next to continue securely.';
  session.messages.push({role:'assistant',text:reply});
  res.end(JSON.stringify({reply,replies,stage:session.stage,target:session.target}));
 }catch{res.statusCode=400;res.end(JSON.stringify({error:'Invalid request'}))}
})}}}

export default defineConfig({plugins:[priceChatApi()]});
