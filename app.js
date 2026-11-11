/* WCC Report Studio - logika aplikasi. Data disimpan di localStorage browser (kunci 'wccs3'). */
const MN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],$=i=>document.getElementById(i);
const AC=[['ig','IG wcc.bydinda'],['ck','IG camelakid'],['bh','IG bydinda.house'],['tt','TikTok wcc.bydinda']];
const PAL=['#4285f4','#ea4335','#fbbc04','#34a853','#ff6d01','#46bdc6','#0b45b0','#8e24aa','#795548','#607d8b','#e91e63'];
const LB=['Sangat Buruk','Buruk','Baik','Sangat Baik','Outstanding'],CO=['#d32f2f','#ef6c00','#f4b400','#2e9e5b','#1e88e5'];
const N=x=>Math.round(x).toLocaleString('id-ID'),D=(x,n=2)=>x.toLocaleString('id-ID',{minimumFractionDigits:n,maximumFractionDigits:n});
const ms=s=>Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10)),add=(s,n)=>new Date(ms(s)+n*864e5).toISOString().slice(0,10),fd=s=>+s.slice(8,10)+' '+MN[+s.slice(5,7)-1].slice(0,3);
const sum=(a,k)=>a.reduce((x,r)=>x+(+r[k]||0),0),avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0,byd=(x,y)=>x.d<y.d?-1:x.d>y.d?1:0,nm=x=>parseInt(String(x||'').replace(/[^\d-]/g,''))||0;
function seed(){const P=s=>s.split(';').map(r=>r.split('|')),o='2026-10-';
const k=P("21|FIFI|611938|26000|54|4.44|27;22|YASA|487729|47700|215|11.53|8;23|KIKI|49648|1200|17|2.63|3;24|TO OPAL|32583|1500|4|4.82|3;25|YASA|21691|838|3|4.08|2;25|FINA|55095|1000|7|2.21|5;25|SYABINA|1932308|84300|394|4.95|130;26|TO OPAL|500475|15700|327|3.62|49;27|FIFI|233650|9000|2|4.04|71;27|SYABINA|9153|213|2|2.53|4").map(r=>({d:o+r[0],crew:r[1],views:+r[2],like:+r[3],com:+r[4],share:Math.max(0,Math.round(r[5]/100*r[2]-r[3]-r[4])),fol:+r[6]}));
const s=[[21,8,2,0],[22,7,5,0],[23,6,4,0],[24,8,1,2],[25,12,2,0],[26,10,3,1],[27,8,6,1]].map(r=>({d:o+r[0],lead:r[1],close:r[2],tbc:r[3]}));
const p=P("21|Premium|Siraman – Pengajian|1;21|Premium|Prepare – Mappacci|1;22|Classic|Mappacci|1;22|Classic|Akad|1;22|Classic|MUA|1;22|Premium|Akad – Resepsi|1;22|Classic Event|Aqiqah|1;23|Classic|Akad|1;23|Premium|Prepare – Mappettuada|1;23|Premium|Akad – Resepsi|1;23|Classic Event|Surprise Gift|1;24|Premium|Akad – Resepsi|1;25|Classic Event|Konser Music Anak|1;25|Classic Event|After Wisuda|1;26|Classic|Resepsi|1;26|Premium|Akad – Resepsi|2;27|Premium|Akad – Resepsi|1;27|Premium|Preparation – Mappettuada|1;27|Premium|Preparation – Akad|1;27|Premium|Mapparola – Resepsi|1;27|Royal|Preparation – Akad – Resepsi|1;27|Classic Event|Birthday|1").map(r=>({d:o+r[0],paket:r[1],acara:r[2],jml:+r[3]}));
const b=(l,a)=>({l,r:P(a).map(r=>({n:r[0],f:+r[1],p:+r[2],v:+r[3]}))}),e=()=>({k:[],s:[],p:[],bm:{},pm:{},nt:{}});
return{pg:'in',it:'k',ac:'ig',wid:'w2',mo:'2026-11',weeks:[{id:'w1',n:'Minggu 4',bln:'2026-10',s:'2026-10-14',e:'2026-10-20'},{id:'w2',n:'Minggu 1',bln:'2026-11',s:'2026-10-21',e:'2026-10-27'}],
rules:{er:[2,3,4,6],vw:[5000,10000,25000,50000],wE:60,wV:40,fyp:50000,tg:{fol:1016,m1:1,k100:5,fpk:28}},
data:{ig:{k,s,p,bm:{w1:b('14–26 Okt',"WCC By Dinda|18700|17|8086800;WCC Marsy|21000|17|2849864;WCC Ogut|9224|16|9399554;WCC Fau|1594|2|11568;WCC Lumi|2754|5|86227;WCC Kivow|3850|5|42868;WCC Sana|2617|7|378900"),w2:b('27 Okt–2 Nov',"WCC By Dinda|19200|13|1193531;WCC Marsy|21500|13|1650200;WCC Ogut|9500|5|257100;WCC Fau|1962|3|35439;WCC Lumi|3127|2|9454;WCC Kivow|4170|6|78777;WCC Sana|2685|6|675374")},pm:{},nt:{}},ck:e(),bh:e(),tt:e()}}}
/* Bersihkan & validasi data (dari localStorage / backup) agar aplikasi tidak error */
const clean=v=>typeof v=='string'?v.replace(/[<>]/g,''):Array.isArray(v)?v.map(clean):v&&typeof v=='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,k=='shot'?(typeof x=='string'&&/^data:image\//.test(x)?x:''):clean(x)])):v;
function norm(o){const b=seed();if(!o||typeof o!='object'||!Array.isArray(o.weeks)||!o.data)return b;o=clean(o);
o.weeks=o.weeks.filter(w=>w&&w.id&&/^\d{4}-\d\d-\d\d$/.test(w.s)&&/^\d{4}-\d\d-\d\d$/.test(w.e)&&/^\d{4}-\d\d$/.test(w.bln));
o.rules=Object.assign({},b.rules,o.rules||{});o.rules.tg=Object.assign({},b.rules.tg,o.rules.tg||{});
['er','vw'].forEach(k=>{if(!Array.isArray(o.rules[k])||o.rules[k].length!=4)o.rules[k]=b.rules[k]});
AC.forEach(([k])=>{const d=o.data[k]=o.data[k]||{};['k','s','p'].forEach(f=>{if(!Array.isArray(d[f]))d[f]=[]});['bm','pm','nt'].forEach(f=>{if(!d[f]||typeof d[f]!='object'||Array.isArray(d[f]))d[f]={}})});
if(!AC.some(a=>a[0]==o.ac))o.ac='ig';if(!['wk','in','rw','rm'].includes(o.pg))o.pg='in';if(!['k','s','b','pm'].includes(o.it))o.it='k';return o}
let S;try{S=norm(JSON.parse(localStorage.getItem('wccs3')))}catch(x){S=seed()}
const sv=()=>{try{localStorage.setItem('wccs3',JSON.stringify(S))}catch(x){alert('Penyimpanan browser penuh. Buat backup dan kurangi screenshot.')}};
const A=()=>S.data[S.ac],R=()=>S.rules,W=id=>S.weeks.find(w=>w.id==id),WS=()=>[...S.weeks].sort((a,b)=>a.s<b.s?-1:1),inW=(w,d)=>d>=w.s&&d<=w.e,AN=()=>AC.find(x=>x[0]==S.ac)[1];
const wr=(a,w)=>a.filter(r=>inW(w,r.d)).sort(byd),mW=m=>WS().filter(w=>w.bln==m),mr=(a,m)=>a.filter(r=>mW(m).some(w=>inW(w,r.d))).sort(byd),months=()=>[...new Set(S.weeks.map(w=>w.bln))].sort(),mt=m=>MN[+m.slice(5)-1]+' '+m.slice(0,4);
const er=r=>(r.like+r.com+r.share)/(r.views||1)*100,tier=(v,a)=>v<a[0]?20:v<a[1]?40:v<a[2]?60:v<a[3]?80:100;
const scr=r=>{const e=tier(er(r),R().er),v=tier(r.views,R().vw);return{e,v,t:(e*R().wE+v*R().wV)/100}};
const st=e=>{const i=tier(e,R().er)/20-1;return[LB[i],CO[i]]},tag=(t,c)=>`<span class="tag" style="background:${c}">${t}</span>`,tg=e=>tag(...st(e));
const pst=t=>t>=100?['Terbaik','#1e88e5']:t>=80?['Produktif','#2e9e5b']:t>=60?['Cukup','#f4b400']:['Tidak','#d32f2f'],cst=t=>t>=80?['Produktif','#2e9e5b']:t>=70?['Cukup','#f4b400']:t>=60?['Kurang','#ef6c00']:['Tidak','#d32f2f'];
const kp=(v,l)=>`<div class="card kpi"><b>${v}</b><span class="m">${l}</span></div>`,sec=(l,t)=>`<h2 class="sec"><i>${l}</i>${t}</h2>`;
const tbl=(h,r)=>'<div class="sc"><table><tr>'+h.map(x=>'<th>'+x+'</th>').join('')+'</tr>'+r.map(y=>'<tr>'+y.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</table></div>';
const dl=x=>`<span style="color:${x>0?'#2e9e5b':x<0?'#d32f2f':'inherit'}">${x>0?'+':''}${N(x)}</span>`,noW=()=>'<div class="card">Belum ada data. Buka <b>1 · Periode &amp; Aturan</b> dan tambahkan minggu terlebih dahulu.</div>';
const gv=p=>p.split('.').reduce((o,k)=>o[k],S),sp=(p,v)=>{const q=p.split('.');let o=S;q.slice(0,-1).forEach(k=>o=o[k]);o[q.pop()]=v};
const COLS={k:[['d','Tanggal','d'],['crew','Crew','t'],['views','Views','n'],['like','Like','n'],['com','Komen','n'],['share','Share','n'],['fol','Followers baru','n']],s:[['d','Tanggal','d'],['lead','Lead','n'],['close','Closing','n'],['tbc','TBC','n']],p:[['d','Tanggal','d'],['paket','Paket','t'],['acara','Jenis acara','t'],['jml','Jumlah','n']],bm:[['n','Nama WCC','t'],['f','Followers','n'],['p','Postingan','n'],['v','Total viewers','n']],pm:[['c','Crew','t'],['j','Jumlah job','n'],['o','Over deadline','n'],['n','Catatan','t']]};
const bmo=()=>A().bm[S.wid]||(A().bm[S.wid]={l:'',r:[]}),arr=p=>p=='bm'?bmo().r:p=='pm'?(A().pm[W(S.wid).bln]||(A().pm[W(S.wid).bln]=[])):A()[p];
const TPL=p=>{const d=W(S.wid).s;return({k:{d,crew:'',views:0,like:0,com:0,share:0,fol:0},s:{d,lead:0,close:0,tbc:0},p:{d,paket:'',acara:'',jml:1},bm:{n:'',f:0,p:0,v:0},pm:{c:'',j:0,o:0,n:''}})[p]};
function tb(p){const w=W(S.wid),a=arr(p),ix=a.map((_,i)=>i).filter(i=>!'ksp'.includes(p)||p=='pm'||inW(w,a[i].d));
return `<div class="sc"><table><tr>${COLS[p].map(c=>`<th>${c[1]}</th>`).join('')}${p=='k'?'<th>ER · status</th><th>Screenshot</th>':''}<th></th></tr>`+ix.map(i=>{const r=a[i];return '<tr>'+COLS[p].map(c=>`<td><input data-p="${p}" data-i="${i}" data-k="${c[0]}" data-t="${c[2]}" type="${c[2]=='d'?'date':'text'}" ${c[2]=='d'?`min="${w.s}" max="${w.e}"`:''} ${c[2]=='n'?'inputmode="numeric"':''} ${c[0]=='crew'||(p=='pm'&&c[0]=='c')?'list="dc"':c[0]=='paket'?'list="dp"':''} value="${String(r[c[0]]??'').replace(/"/g,'&quot;')}"></td>`).join('')+(p=='k'?`<td id="e${i}">${D(er(r))}% ${tg(er(r))}</td><td>${r.shot?`<img src="${r.shot}" height="34"> `:''}<label class="btn">📷<input type="file" accept="image/*" hidden data-sh="${i}"></label></td>`:'')+`<td><button data-del="${p}" data-i="${i}">×</button></td></tr>`}).join('')+`</table></div><button class="add" data-add="${p}">+ Tambah baris</button>`}
function pgWk(){const ov=w=>S.weeks.some(o=>o!=w&&o.s<=w.e&&o.e>=w.s),R_=R();
const fld=(l,p,v)=>`<label class="m">${l}<br><input type="number" step="any" data-g="${p}" value="${v}" style="width:100%"></label>`;
return `<div class="card"><h2>Langkah 1 · Atur minggu</h2><p class="m">Anda sendiri yang menentukan tanggal mulai &amp; selesai tiap minggu, dan minggu itu masuk ke laporan bulan apa. Contoh: Minggu 1 November boleh dimulai 21 Oktober. Data otomatis masuk ke minggu sesuai tanggalnya.</p>
<div class="sc"><table><tr><th>Nama minggu</th><th>Masuk laporan bulan</th><th>Mulai</th><th>Selesai</th><th>Hari</th><th>Konten</th><th></th></tr>${WS().map(w=>`<tr><td><input data-w="${w.id}" data-k="n" value="${w.n.replace(/"/g,'&quot;')}"></td><td><input type="month" data-w="${w.id}" data-k="bln" value="${w.bln}"></td><td><input type="date" data-w="${w.id}" data-k="s" value="${w.s}"></td><td><input type="date" data-w="${w.id}" data-k="e" value="${w.e}"></td><td>${(ms(w.e)-ms(w.s))/864e5+1<1?'<span class="warn">⚠ tanggal terbalik</span>':(ms(w.e)-ms(w.s))/864e5+1}${ov(w)?' <span class="warn">⚠ tumpang tindih</span>':''}</td><td>${wr(A().k,w).length}</td><td><button data-dw="${w.id}">×</button></td></tr>`).join('')}</table></div><button class="add" data-addw>+ Tambah minggu</button></div>
<div class="card"><h2>Aturan penilaian</h2><p class="m">ER = (Like + Komen + Share) ÷ Views. Batas di bawah ini membentuk status Sangat Buruk → Outstanding dan skor 20–100.</p>
<h3>Batas ER % (Buruk · Baik · Sangat Baik · Outstanding mulai dari)</h3><div class="g">${[0,1,2,3].map(i=>fld(['Buruk mulai','Baik mulai','Sangat Baik mulai','Outstanding mulai'][i],'rules.er.'+i,R_.er[i])).join('')}</div>
<h3 style="margin-top:12px">Batas views untuk skor 40 · 60 · 80 · 100</h3><div class="g">${[0,1,2,3].map(i=>fld(['Skor 40 mulai dari','Skor 60 mulai dari','Skor 80 mulai dari','Skor 100 mulai dari'][i],'rules.vw.'+i,R_.vw[i])).join('')}</div>
<h3 style="margin-top:12px">Bobot skor &amp; target</h3><div class="g">${fld('Bobot ER %','rules.wE',R_.wE)}${fld('Bobot Views %','rules.wV',R_.wV)}${fld('Batas FYP (views)','rules.fyp',R_.fyp)}${fld('Target followers / bulan','rules.tg.fol',R_.tg.fol)}${fld('Target konten ≥1 jt views','rules.tg.m1',R_.tg.m1)}${fld('Target konten ≥100 rb views','rules.tg.k100',R_.tg.k100)}${fld('Target followers baru / konten','rules.tg.fpk',R_.tg.fpk)}</div></div>
<div class="card"><h2>Backup data</h2><p class="m">Data tersimpan di browser ini. Ambil backup secara berkala dan simpan teksnya.</p><textarea id="bk" rows="3"></textarea><button data-bk="g">Ambil backup</button> <button data-bk="s">Pulihkan dari kotak</button> <button data-bk="r">Reset ke contoh</button></div>`}
function pgIn(){const w=W(S.wid);if(!w)return noW();const T=[['k','👥 Konten crew'],['s','💼 Sales admin'],['b','🏁 Benchmark'],['pm','📋 Project Manager']];let b;
if(S.it=='k')b=`<div class="card"><h3>Konten crew · ${w.n} (${fd(w.s)}–${fd(w.e)})</h3>${tb('k')}<div class="m" style="margin-top:6px">ER dan status terisi otomatis. Isi Followers baru dari konten tersebut.</div></div>`;
else if(S.it=='s')b=`<div class="card"><h3>Lead &amp; closing harian</h3>${tb('s')}</div><div class="card"><h3>Detail closing paket</h3>${tb('p')}</div>`;
else if(S.it=='b')b=`<div class="card"><h3>Benchmark kompetitor · ${w.n}</h3><label class="m">Label periode data (tampil di grafik, mis. 27 Okt–2 Nov)<br><input data-lb value="${bmo().l.replace(/"/g,'&quot;')}"></label><div style="height:8px"></div>${tb('bm')}<button data-cp>Salin daftar dari minggu sebelumnya</button></div>`;
else b=`<div class="card"><h3>Project Manager · laporan ${mt(w.bln)}</h3>${tb('pm')}<div class="m">Diisi per bulan laporan. Catatan contoh: TO (Story Only).</div></div>`;
return `<div class="tabs">${T.map(t=>`<button data-it="${t[0]}" class="${S.it==t[0]?'on':''}">${t[1]}</button>`).join('')}</div>`+b}
let CH=[],Q=[];const ch=(id,type,lab,ds,o={})=>Q.push(()=>{if(typeof Chart=='undefined')return;CH.push(new Chart($(id),{type,data:{labels:lab,datasets:ds},options:{maintainAspectRatio:false,indexAxis:o.h?'y':'x',plugins:{legend:{display:ds.length>1||type=='pie'}}}}))});
const cvs=(id,t,n,h)=>`<div class="card"><h3>${t}</h3><div class="sc"><div class="cv" style="min-width:${(n||0)*30}px;${h?`height:${h}px`:''}"><canvas id="${id}"></canvas></div></div></div>`;
const pie=(id,p)=>{const c={};p.forEach(r=>{const n=(r.paket||'?').trim();c[n]=(c[n]||0)+(+r.jml||0)});ch(id,'pie',Object.keys(c).map(k=>k+' ('+c[k]+')'),[{data:Object.values(c),backgroundColor:PAL}]);return sum(p,'jml')};
const crd=(r,e)=>`<div>${r.shot?`<img class="sh" src="${r.shot}">`:'<div class="sh">Belum ada screenshot</div>'}<div class="m">${fd(r.d)} · <b>${r.crew}</b><br>ER ${D(e)}% · ${N(r.views)} views<br>${N(r.like)} like · ${N(r.com)} komen<br>${tg(e)}</div></div>`;
const lbl=r=>r.crew+' '+fd(r.d),scT=X=>tbl(['No','Crew','Tgl','ER','Views','Skor ER','Skor Views','Skor produktif','Status'],X.map((o,i)=>[i+1,o.r.crew,fd(o.r.d),D(o.e)+'%',N(o.r.views),o.s.e,o.s.v,'<b>'+D(o.s.t,0)+'</b>',tag(...pst(o.s.t))]))+`<div class="m">Skor produktif = ${R().wE}% × Skor ER + ${R().wV}% × Skor Views. Skor ER/Views bertingkat 20–100 sesuai batas di Aturan.</div>`;
function weekly(){const w=W(S.wid),k=wr(A().k,w),ws=WS(),pw=ws[ws.findIndex(x=>x.id==w.id)-1];
let h=`<div class="card hero"><div class="m">Weekly Report · ${AN()}</div><h1>${w.n} · laporan ${mt(w.bln)}</h1><div class="m">${fd(w.s)} – ${fd(w.e)} ${w.e.slice(0,4)} · ${k.length} konten</div></div>`+sec('A','Weekly Report Creative Director');
if(!k.length)h+='<div class="card m">Belum ada konten pada rentang tanggal ini. Isi di langkah 2 · Input Data.</div>';else{
const E=k.map(er),X=k.map((r,i)=>({r,e:E[i],s:scr(r)})),nf=sum(k,'fol'),tv=sum(k,'views');
h+=`<div class="g">${kp(N(tv),'Total views')}${kp(k.length,'Konten')}${kp(D(avg(E))+'%','Rata-rata ER')}${kp('+'+N(nf),'Followers baru')}${kp(k.filter(r=>r.views>=R().fyp).length,'Konten FYP (≥'+N(R().fyp)+')')}</div>`
+cvs('c1','1 · ER konten crew',k.length)+`<div class="card"><h3>2 · Screenshot konten crew</h3><div class="g s">${X.map(o=>crd(o.r,o.e)).join('')}</div></div>`
+cvs('c3',`3 · Growth followers · total ${N(nf)} followers`,k.length)+cvs('c4',`4 · Konten views · total ${N(tv)} viewers`,0,Math.max(240,k.length*34))
+`<div class="card"><h3>5 · Skor konten produktif</h3>${scT([...X].sort((a,b)=>b.s.t-a.s.t))}</div>`;
ch('c1','bar',k.map(lbl),[{label:'ER %',data:E.map(x=>+x.toFixed(2)),backgroundColor:E.map(x=>st(x)[1])}]);
ch('c3','line',k.map(lbl),[{label:'Followers baru',data:k.map(r=>r.fol),borderColor:'#2e9e5b',tension:.2}]);
ch('c4','bar',k.map(lbl),[{label:'Views',data:k.map(r=>r.views),backgroundColor:E.map(x=>st(x)[1])}],{h:1})}
const s=wr(A().s,w),p=wr(A().p,w),C=sum(s,'close'),L=sum(s,'lead');h+=sec('B','Weekly Report Admin');
if(!s.length&&!p.length)h+='<div class="card m">Belum ada data sales pada minggu ini.</div>';else{
h+=(C!==sum(p,'jml')?`<div class="card warn">⚠ Total closing harian (${C}) ≠ total paket pada tabel (${sum(p,'jml')}). Periksa input.</div>`:'')+`<div class="g">${kp(N(L),'Total lead')}${kp(C,'Total closing')}${kp(D(L?C/L*100:0,1)+'%','Konversi lead → closing')}</div>`
+cvs('c5','1 · Sales lead week',s.length)+cvs('c6',`2 · Diagram pizza paket terjual · total ${sum(p,'jml')} paket`)+`<div class="card"><h3>3 · Tabel paket terjual</h3>${tbl(['Tanggal','Paket','Jenis acara','Jumlah'],p.map(r=>[fd(r.d),r.paket,r.acara,r.jml]).concat([['<b>TOTAL</b>','','','<b>'+sum(p,'jml')+'</b>']]))}</div>`;
ch('c5','bar',s.map(r=>fd(r.d)),[{label:'Lead',data:s.map(r=>r.lead),backgroundColor:'#ff0000'},{label:'Closing',data:s.map(r=>r.close),backgroundColor:'#00aeef'},{label:'TBC',data:s.map(r=>r.tbc),backgroundColor:'#ffb300'}]);pie('c6',p)}
const cu=A().bm[w.id],pr=pw&&A().bm[pw.id];h+=sec('C','Benchmark Kompetitor');
if(!cu||!cu.r.length)h+='<div class="card m">Belum ada data benchmark minggu ini. Isi di langkah 2 · Input Data → Benchmark.</div>';else{
const pv=n=>(pr&&pr.r.find(x=>x.n.toLowerCase()==n.toLowerCase()))||{f:0,p:0,v:0},LP=(pr&&pr.l)||'Minggu lalu',LC=cu.l||w.n;
h+=`<div class="m">Perbandingan ${LP} dan ${LC}</div><div class="g g2">${cvs('c7','1 · Perbandingan followers')}${cvs('c8','2 · Perbandingan postingan')}</div>${cvs('c9','3 · Perbandingan viewers')}`
+`<div class="card"><h3>4 · Benchmark dalam bentuk tabel</h3><div class="g g2"><div><b>${LP}</b>${tbl(['Nama WCC','Followers','Postingan','Total viewers'],pr?pr.r.map(x=>[x.n,N(x.f),x.p,N(x.v)]):[])}</div><div><b>${LC}</b>${tbl(['Nama WCC','Followers','Δ','Postingan','Δ','Total viewers','Δ'],cu.r.map(c=>{const o=pv(c.n);return[c.n,N(c.f),dl(c.f-o.f),c.p,dl(c.p-o.p),N(c.v),dl(c.v-o.v)]}))}</div></div></div>`;
[['c7','f'],['c8','p'],['c9','v']].forEach(([id,k])=>ch(id,'bar',cu.r.map(x=>x.n.replace(/^WCC /i,'')),[{label:LP,data:cu.r.map(x=>pv(x.n)[k]),backgroundColor:'#b9b3e6'},{label:LC,data:cu.r.map(x=>x[k]),backgroundColor:'#4b3fa8'}]))}
return h}
function monthly(){const m=S.mo,ws=mW(m),k=mr(A().k,m),s=mr(A().s,m),p=mr(A().p,m),T=R().tg,pm=A().pm[m]||[];
let h=`<div class="card hero"><div class="m">Rekap Report · ${AN()}</div><h1>${mt(m)}</h1><div class="m">${ws.map(w=>w.n+' ('+fd(w.s)+'–'+fd(w.e)+')').join(' · ')}</div></div>`;
if(!k.length&&!s.length)return h+'<div class="card m">Belum ada data pada minggu-minggu yang masuk laporan bulan ini.</div>';
h+=`<div class="card"><h3>Kondisi umum</h3><textarea data-nt rows="3">${A().nt[m]??'Laporan ini disusun sebagai bahan evaluasi kinerja berdasarkan rekapitulasi laporan Creative Director, Project Manager, dan Admin Sales selama periode penilaian.'}</textarea></div>`;
const E=k.map(er),X=k.map((r,i)=>({r,e:E[i],s:scr(r)})),tv=sum(k,'views'),nf=sum(k,'fol'),c1=k.filter(r=>r.views>=1e6).length,c2=k.filter(r=>r.views>=1e5).length;
h+=`<div class="g">${kp(N(tv),'Total viewers')}${kp(k.length,'Total konten')}${kp(D(avg(E))+'%','Rata-rata ER')}${kp('+'+N(nf),'Followers baru')}${kp(sum(s,'close'),'Closing')}</div>`;
const best=X.filter(o=>o.e>=R().er[3]).sort((a,b)=>b.e-a.e).slice(0,8),low=X.filter(o=>o.e<R().er[1]).sort((a,b)=>a.e-b.e).slice(0,10);
h+=sec('1','Rekap Report Konten')+`<div class="card"><h3>⭐ Best perform konten (ER ≥ ${R().er[3]}%)</h3>${best.length?`<div class="g s">${best.map(o=>crd(o.r,o.e)).join('')}</div>`:'<span class="m">Belum ada.</span>'}</div><div class="card"><h3>⚠ Low perform content (ER &lt; ${R().er[1]}%, maks. 10 terendah)</h3>${low.length?`<div class="g s">${low.map(o=>crd(o.r,o.e)).join('')}</div>`:'<span class="m">Tidak ada.</span>'}</div>`
+cvs('m1','ER konten bulan '+MN[+m.slice(5)-1],k.length)+'<div class="g cat">'+[4,3,2,1,0].map(i=>{const a=X.filter(o=>tier(o.e,R().er)/20-1==i).sort((x,y)=>y.e-x.e);return `<div class="card"><h3 style="color:${CO[i]}">Konten crew ${LB[i]} (${a.length})</h3>${a.map(o=>`<div>${o.r.crew} ${D(o.e)}%</div>`).join('')||'<span class="m">—</span>'}</div>`}).join('')+'</div>';
ch('m1','bar',k.map(lbl),[{label:'ER %',data:E.map(x=>+x.toFixed(2)),backgroundColor:E.map(x=>st(x)[1])}]);
const by={};X.forEach(o=>(by[o.r.crew]=by[o.r.crew]||[]).push(o));
const cr=Object.entries(by).map(([n,a])=>({n,c:a.length,e:avg(a.map(o=>o.e)),v:avg(a.map(o=>o.r.views)),t:avg(a.map(o=>o.s.t))})).sort((a,b)=>b.t-a.t||b.e-a.e);
h+=sec('2','Skor Konten Produktif')+`<div class="card">${scT(X)}</div><div class="card"><h3>🏆 Ranking crew ${MN[+m.slice(5)-1]}</h3>${tbl(['Rank','Crew','Konten','Avg ER','Avg views','Avg score','Status'],cr.map((c,i)=>[['🥇','🥈','🥉'][i]||'',c.n,c.c,D(c.e)+'%',N(c.v),D(c.t,1),tag(...cst(c.t))]).map((r,i)=>[(i+1)+' '+r[0],...r.slice(1)]))}</div>`;
const KS=(v,t)=>v>t?'✅ Target terlampaui':v>=t?'✅ Target tercapai':v>=t/2?'🟠 Hampir tercapai':'🔴 Belum tercapai';
h+=sec('3','Konten Views &amp; KPI')+cvs('m2',`Konten views · total ${N(tv)} viewers`,k.length)+`<div class="card"><h3>KPI Creative Director</h3>${tbl(['KPI','Target','Realisasi','Status'],[['Konten mencapai ≥ 1.000.000 views','≥ '+T.m1,c1+' konten',KS(c1,T.m1)],['Konten mencapai ≥ 100.000 views','≥ '+T.k100,c2+' konten',KS(c2,T.k100)],['Followers baru','≥ '+N(T.fol),N(nf),KS(nf,T.fol)],['Followers baru per konten','≥ '+T.fpk,D(k.length?nf/k.length:0,1),KS(k.length?nf/k.length:0,T.fpk)]])}</div>`
+sec('4','Growth Followers')+cvs('m3',`Growth followers · total ${N(nf)} followers`,k.length);
ch('m2','line',k.map(lbl),[{label:'Views',data:k.map(r=>r.views),borderColor:'#ff0000',tension:.2}]);ch('m3','line',k.map(lbl),[{label:'Followers baru',data:k.map(r=>r.fol),borderColor:'#2e9e5b',tension:.2}]);
const dys=[...new Set(s.map(r=>r.d))].sort(),dv=key=>dys.map(d=>sum(s.filter(r=>r.d==d),key)),nmP=[...new Set(p.map(r=>(r.paket||'?').trim()))];
h+=sec('5','Report Admin')+`<div class="g">${kp(N(sum(s,'lead')),'Total lead')}${kp(sum(s,'close'),'Total closing')}${kp(D(sum(s,'lead')?sum(s,'close')/sum(s,'lead')*100:0,1)+'%','Konversi')}</div>`+cvs('m4','Sales perform '+MN[+m.slice(5)-1],dys.length)+cvs('m5',`Sales package · total ${sum(p,'jml')} paket`)+cvs('m6','Package sales per minggu',nmP.length*3);
ch('m4','bar',dys.map(fd),[{label:'Lead',data:dv('lead'),backgroundColor:'#ff0000'},{type:'line',label:'Closing',data:dv('close'),borderColor:'#f4b400',tension:.2}]);pie('m5',p);
ch('m6','bar',nmP,ws.map((w,i)=>({label:w.n,data:nmP.map(n=>sum(p.filter(r=>(r.paket||'?').trim()==n&&inW(w,r.d)),'jml')),backgroundColor:PAL[i]})));
h+=sec('6','Report Project Manager')+(pm.length?cvs('m7','Distribusi job crew',pm.length)+`<div class="card"><h3>Over deadline job crew · ${MN[+m.slice(5)-1]}</h3>${tbl(['No','Crew','Jumlah job','Over deadline'],pm.map((r,i)=>[i+1,r.c,r.j,r.n?r.n:r.o]))}</div>`:'<div class="card m">Belum ada data PM. Isi di langkah 2 · Input → Project Manager.</div>');
ch('m7','bar',pm.map(r=>r.c),[{label:'Jumlah job',data:pm.map(r=>r.j),backgroundColor:'#4b3fa8'},{label:'Over deadline',data:pm.map(r=>r.o),backgroundColor:'#d32f2f'}],{h:1});return h}
function sel(){if(S.pg=='in'||S.pg=='rw')return S.weeks.length?`<label class="m">Minggu:</label><select data-sw>${WS().map(w=>`<option value="${w.id}" ${w.id==S.wid?'selected':''}>${w.n} · ${fd(w.s)}–${fd(w.e)} · laporan ${MN[+w.bln.slice(5)-1]}</option>`).join('')}</select>`:'';
if(S.pg=='rm')return `<label class="m">Bulan laporan:</label><select data-sm>${months().map(m=>`<option value="${m}" ${m==S.mo?'selected':''}>${mt(m)}</option>`).join('')}</select>`;return''}
function pdf(pg){if(pg=='rw'?!W(S.wid):!S.mo)return alert('Belum ada data untuk dicetak. Atur minggu dan isi data terlebih dahulu.');S.pg=pg;window.__pr=1;render();
setTimeout(()=>{document.querySelectorAll('#m canvas').forEach(c=>{const i=new Image();i.src=c.toDataURL('image/png');i.style.cssText='width:100%;height:100%;object-fit:contain';c.style.display='none';c.parentNode.appendChild(i)});
let f=0;const done=()=>{if(f++)return;window.__pr=0;render()};window.addEventListener('afterprint',done,{once:true});setTimeout(done,120000);
try{window.print()}catch(e){alert('Tekan Ctrl+P (Cmd+P di Mac), lalu pilih Simpan sebagai PDF.')}},400)}
function render(){CH.forEach(c=>c.destroy());CH=[];Q=[];if(typeof Chart!='undefined'){Chart.defaults.animation=false;Chart.defaults.color=window.__pr?'#222':getComputedStyle(document.body).color;Chart.defaults.borderColor='rgba(128,128,128,.2)'}
if(!W(S.wid))S.wid=(WS().slice(-1)[0]||{}).id;const ml=months();if(!ml.includes(S.mo))S.mo=ml[ml.length-1]||'';
const cn=[...new Set(Object.values(S.data).flatMap(d=>d.k.map(r=>r.crew)))],pk=['Basic','Classic','Classic Event','Premium','Royal','Royal Plus','Glory','Queen','Signature','Exclusive','Personal'];
$('ac').innerHTML=AC.map(a=>`<button data-ac="${a[0]}" class="${S.ac==a[0]?'on':''}">${a[1]}</button>`).join('');
$('pg').innerHTML=[['wk','1','Periode & Aturan'],['in','2','Input Data'],['rw','3','Laporan Mingguan'],['rm','4','Laporan Bulanan']].map(a=>`<button data-pg="${a[0]}" class="step ${S.pg==a[0]?'on':''}"><i>${a[1]}</i>${a[2]}</button>`).join('');
$('sel').innerHTML=sel();$('m').innerHTML=`<datalist id="dc">${cn.map(x=>`<option>${x}</option>`).join('')}</datalist><datalist id="dp">${pk.map(x=>`<option>${x}</option>`).join('')}</datalist>`+({wk:pgWk,in:pgIn,rw:()=>W(S.wid)?weekly():noW(),rm:()=>S.mo?monthly():noW()})[S.pg]();Q.forEach(f=>f())}
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
if(d.ac)S.ac=d.ac;else if(d.pg)S.pg=d.pg;else if(d.it)S.it=d.it;else if(d.del)arr(d.del).splice(d.i,1);else if(d.add)arr(d.add).push(TPL(d.add));
else if('addw' in d){const l=WS().slice(-1)[0],s=l?add(l.e,1):new Date().toISOString().slice(0,10),en=add(s,6);S.weeks.push({id:'w'+Date.now().toString(36),n:'Minggu '+(S.weeks.filter(w=>w.bln==en.slice(0,7)).length+1),bln:en.slice(0,7),s,e:en})}
else if(d.dw){if(!confirm('Hapus minggu ini? Data konten tetap tersimpan.'))return;S.weeks=S.weeks.filter(w=>w.id!=d.dw)}
else if('cp' in d){const ws=WS(),p=ws[ws.findIndex(w=>w.id==S.wid)-1],b=p&&A().bm[p.id];if(!b)return alert('Tidak ada minggu sebelumnya yang berisi benchmark.');bmo().r=b.r.map(x=>({n:x.n,f:0,p:0,v:0}))}
else if(d.bk=='g'){$('bk').value=JSON.stringify(S);return}else if(d.bk=='s'){try{const p=JSON.parse($('bk').value);if(!p||!Array.isArray(p.weeks)||!p.data)throw 0;S=norm(p)}catch(x){return alert('Backup tidak valid.')}}else if(d.bk=='r'){if(!confirm('Kembalikan ke data contoh? Data sekarang hilang.'))return;S=seed()}
else if(t.id=='pw'||t.id=='pb'){pdf(t.id=='pw'?'rw':'rm');return}else return;sv();render()});
document.addEventListener('input',e=>{const t=e.target,d=t.dataset,v=t.value.replace(/[<>]/g,'');
if(d.p){const r=arr(d.p)[d.i];r[d.k]=d.t=='n'?nm(v):v;if(d.p=='k'&&$('e'+d.i))$('e'+d.i).innerHTML=D(er(r))+'% '+tg(er(r))}
else if(d.w){if(v)W(d.w)[d.k]=v}else if(d.g){sp(d.g,+t.value||0)}else if('lb' in d){bmo().l=v}else if('nt' in d){A().nt[S.mo]=v}else return;sv()});
document.addEventListener('change',e=>{const t=e.target,d=t.dataset;
if('sw' in d)S.wid=t.value;else if('sm' in d)S.mo=t.value;
else if(d.sh!=null&&t.files[0]){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,420/im.height),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);arr('k')[d.sh].shot=c.toDataURL('image/jpeg',.65);sv();render()};im.src=r.result};r.readAsDataURL(t.files[0]);return}
else if(!(d.w||(d.p&&d.t=='d')))return;sv();render()});
render();
