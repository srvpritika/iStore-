type Stage='target'|'confirm'|'card'|'complete';
type ChatMessage={role:'user'|'assistant';text:string};
type Session={stage:Stage;product:string;target?:string;messages:ChatMessage[]};

const sessions=new Map<string,Session>();

export default function handler(req:any,res:any){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const body=req.body||{};
 if(!body.sessionId)return res.status(400).json({error:'Missing session'});
 if(body.action==='start'){
  const product=body.product||'this product';
  const intro=`Set a price for ${product}. If it reaches your target within 30 days, I’ll buy it using the card you authorize. If it doesn’t, the request will be dropped.`;
  const question='What price would you like to pay in S$?';
  sessions.set(body.sessionId,{stage:'target',product,messages:[{role:'assistant',text:intro},{role:'assistant',text:question}]});
  return res.json({reply:intro,replies:[intro,question],stage:'target'});
 }

 const fallbackStage:Stage=['target','confirm','card','complete'].includes(body.stage)?body.stage:'target';
 const session=sessions.get(body.sessionId)||{stage:fallbackStage,product:body.product||'this product',target:body.target||undefined,messages:[]};
 sessions.set(body.sessionId,session);
 const message=String(body.message||'').trim();
 if(!message)return res.status(400).json({error:'Empty message'});
 if(/(?:\d[ -]?){13,19}/.test(message)||/\bcvv\b|\bcvc\b|security code/i.test(message)){
  const reply='Please don’t share full card numbers, CVVs or other payment details here. Enter only a target price or type “confirm”.';
  session.messages.push({role:'assistant',text:reply});
  return res.json({reply,stage:session.stage,target:session.target});
 }

 session.messages.push({role:'user',text:message});
 let reply='';
 let replies:string[]|undefined;
 if(session.stage==='target'){
  const match=message.replace(/,/g,'').match(/(?:S\$\s*)?(\d+(?:\.\d{1,2})?)/i);
  if(!match||Number(match[1])<=0)reply='What target price would you like to set? Please enter an amount in S$, for example S$2,400.';
  else{
   session.target=Number(match[1]).toLocaleString('en-SG',{maximumFractionDigits:2});
   session.stage='confirm';
   reply=`Your target is **S$${session.target}** for the **${session.product}**. To activate your request, add and verify a card on the Pine Labs secure payment page. A temporary hold of **S$${session.target}** will be placed on your card. If the listed price reaches S$${session.target} or less within 30 days, I’ll use your authorized card to buy it. Otherwise, the request expires and the hold is released; your bank may take time to process the release. Enter your card details only on the Pine Labs page.`;
   replies=[reply,'Confirm to continue.'];
  }
 }else if(session.stage==='confirm'){
  if(/^(confirm|confirmed|yes|yes,? continue|continue|ok|okay)$/i.test(message)){
   session.stage='complete';
   reply=`**S$${session.target} has been temporarily blocked on your Visa ending in 4242.** Your purchase request is active for 30 days. If the product reaches your target price, I’ll complete the purchase and send the order confirmation and bill to your registered email and phone number. You won’t be charged unless the purchase is completed.`;
  }else reply='Please type “confirm” to continue.';
 }else reply='This chat step is complete. Pine Labs would open next to continue securely.';

 session.messages.push({role:'assistant',text:reply});
 return res.json({reply,replies,stage:session.stage,target:session.target});
}
