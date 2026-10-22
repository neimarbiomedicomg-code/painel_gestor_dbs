// Abre o Painel Gestor DBS (index.html), entra com a senha e gera o e-mail de alertas de estoque.
// Uso: node alerta_estoque.js <index.html> <senha> <saida_dir> [semanal]
// alerta.json traz também "destinatarios": os e-mails cadastrados no painel (Atualizar dados > E-mails do relatório semanal).
const {chromium}=require('playwright'); const fs=require('fs'), path=require('path');
const [,,arq,senha,out,modo]=process.argv; const SEM=modo==='semanal';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort());
await p.goto('file://'+path.resolve(arq));
await p.fill('input[type=password]:visible',senha);await p.keyboard.press('Enter');await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const P=M.P,C=M.C,W=Array.from({length:C},(_,i)=>i);
  const rows=withF({ref:'',cli:'',mes:0},()=>prodDiag(P,W));
  const m=x=>({ref:x.ref,prod:short(x.prod),al:x.al,est:x.estAt,mesEst:x.mesEst||MESES[C-1],cob:cobTxt(x.cob),cobN:x.cob,media:x.media,
    falta:x.rupMes!=null?MESES[x.rupMes]:'',kVenc:x.kVenc||0,semFat:x.semFat||0,acao:(x.acao||'').split(' · ')[0],top:(clientsOfProd(x.ref)[0]||{}).nome||''});
  return {corte:MESES[C-1]+'/'+P.ano,venc:P.venc,destinatarios:((src.param&&src.param.emails)||[]).filter(e=>/^[^\s@;,]+@[^\s@;,]+\.[^\s@;,]+$/.test(e)).slice(0,5),
    baixo:rows.filter(x=>['rup0','rup','att'].includes(x.al)).map(m).sort((a,b)=>(a.cobN??0)-(b.cobN??0)),
    acima:rows.filter(x=>['venc','exc'].includes(x.al)).map(m).sort((a,b)=>(b.cobN??0)-(a.cobN??0))};});
const fmt=n=>n==null?'–':Math.round(n).toLocaleString('pt-BR');
const ALB={rup0:['Estoque zerado','#b42318'],rup:['Risco de falta','#d92d20'],att:['Atenção','#b54708'],venc:['Risco de vencimento','#6941c6'],exc:['Excesso','#175cd3']};
const td='';
const th='';
const tab=(l,low)=>l.length?`<table class="t" cellspacing="0"><tr><th>Situação</th><th>Produto</th><th class="r">Estoque</th><th class="r">Venda/mês</th><th>Cobertura</th><th>O que fazer</th></tr>${l.map(x=>`<tr><td><b style="color:${ALB[x.al][1]}">${ALB[x.al][0]}</b>${low&&x.falta?`<br><i>falta em ${x.falta}</i>`:''}</td><td><b>${x.ref}</b><br><i>${x.prod}</i></td><td class="r">${fmt(x.est)}<br><i>${x.mesEst}</i></td><td class="r">${fmt(x.media)}</td><td>${x.cob}</td><td>${low?x.acao:`Suspender novos lotes; escoar${x.top?' (maior cliente: '+x.top+')':''}${x.kVenc?`; ~${fmt(x.kVenc)} kits acima de ${r.venc} meses`:''}`}</td></tr>`).join('')}</table>`:`<p style="color:#067647;font-size:13px">Nenhum produto nesta situação. ✔</p>`;
const URL='https://neimarbiomedicomg-code.github.io/painel_gestor_dbs/';
const nb=r.baixo.length, na=r.acima.length;
const assunto=`[Painel Gestor DBS] ${SEM?'Relatório semanal · ':''}Estoque: ${nb} baixo · ${na} acima (dados até ${r.corte})`;
const html=`<style>table.t{border-collapse:collapse;width:100%;margin:6px 0 20px}.t td{padding:8px 10px;border-bottom:1px solid #e4e7ec;font-size:13px;vertical-align:top}.t th{padding:8px 10px;background:#f2f4f7;text-align:left;font-size:12px;color:#475467}.t .r{text-align:right}.t i{color:#667085;font-style:normal}</style><div style="font-family:Arial,Helvetica,sans-serif;color:#101828;max-width:820px">
<div style="border-left:6px solid #0f6e6e;padding:4px 14px;margin-bottom:16px"><div style="font-size:20px;font-weight:bold">Painel Gestor DBS · ${SEM?'Relatório semanal de estoque':'Alerta de estoque'}</div><div style="color:#475467;font-size:13px">Linha BIOLISA · dados até ${r.corte}${SEM?' · semana de '+new Date().toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo'}):''}</div></div>
<p style="font-size:14px">Resumo: <b style="color:#d92d20">${nb} produto(s) com estoque baixo</b> e <b style="color:#6941c6">${na} com estoque acima</b> do necessário.</p>
<h3 style="font-size:16px;margin:18px 0 4px;color:#b42318">🔻 Estoque baixo (risco de faltar)</h3>${tab(r.baixo,true)}
<h3 style="font-size:16px;margin:18px 0 4px;color:#6941c6">🔺 Estoque acima (excesso / risco de vencimento)</h3>${tab(r.acima,false)}
<p style="font-size:12px;color:#667085">Cobertura = estoque + produção programada ÷ venda média dos últimos 6 meses. Detalhes, gráficos e FCA no painel: <a href="${URL}">${URL}</a></p>
<p style="font-size:12px;color:#98a2b3">E-mail automático gerado a partir do Painel Gestor DBS.</p></div>`;
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'alerta.json'),JSON.stringify({assunto,...r},null,1));
fs.writeFileSync(path.join(out,'alerta.html'),html);
console.log(assunto,'| erros:',errs.length?errs:'nenhum');await b.close();})();
