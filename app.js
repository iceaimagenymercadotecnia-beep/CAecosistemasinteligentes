const d=window.PORTAL_DATA;
const $=s=>document.querySelector(s);
const personHTML=x=>`<article class="person"><div><span class="person-role">${x.role}</span><h3>${x.name}</h3><p class="institution">${x.institution}</p></div><div class="person-links"><a href="https://orcid.org/${x.orcid}" target="_blank" rel="noopener">ORCID ${x.orcid} ↗</a><a href="mailto:${x.email}">${x.email}</a></div></article>`;
function render(){
 $('#project-list').innerHTML=d.projects.map(x=>`<article class="row"><div class="status">${x.status}<br>${x.period}</div><div><h3>${x.title}</h3><p>${x.summary}</p></div><a href="#proyectos">Ver ficha →</a></article>`).join('');
 $('#product-list').innerHTML=d.products.length?d.products.map(x=>`<div class="simple-item"><b>${x.title}</b><small>${x.year} · ${x.type}</small></div>`).join(''):`<div class="simple-item"><b>Información pendiente de incorporar</b><small>Los registros podrán filtrarse por año, tipo, integrante y proyecto.</small></div>`;
 $('#member-list').innerHTML=d.members.map(personHTML).join('');
 $('#collaborator-list').innerHTML=d.collaborators.map(personHTML).join('');
 $('#blog-list').innerHTML=d.blog.map(x=>`<article class="feature"><div class="eyebrow">${x.category}</div><h3>${x.title}</h3><small>${x.date}</small><p>${x.summary}</p></article>`).join('');
 const ev=$('#evidence-list'); if(ev) ev.innerHTML=d.evidence.length?d.evidence.map(x=>`<div class="simple-item"><b>${x.title}</b><small>${x.date}</small></div>`).join(''):'';
}
render();
$('.menu').onclick=()=>{const n=$('#nav');n.classList.toggle('open');$('.menu').setAttribute('aria-expanded',n.classList.contains('open'))};
const dialog=$('#searchDialog');$('#openSearch').onclick=()=>dialog.showModal();
$('#search').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();const people=[...d.members,...d.collaborators].map(x=>({title:x.name,summary:`${x.role} · ${x.institution} · ORCID ${x.orcid}`,kind:x.role}));const all=[...d.projects.map(x=>({...x,kind:'Proyecto'})),...d.products.map(x=>({...x,kind:'Producción'})),...people,...d.blog.map(x=>({...x,kind:'Blog'})),...d.evidence.map(x=>({...x,kind:'Evidencia'}))];const r=q?all.filter(x=>JSON.stringify(x).toLowerCase().includes(q)):[];$('#searchResults').innerHTML=r.length?r.map(x=>`<div class="search-result"><small>${x.kind}</small><b>${x.title}</b><div>${x.summary||''}</div></div>`).join(''):(q?'<p>No se encontraron coincidencias.</p>':'')});