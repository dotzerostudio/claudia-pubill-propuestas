/* Barra para saltar entre propuestas mientras se comparan. No forma parte de la web final. */
(() => {
  if (/[?&]bare\b/.test(location.search)) return; // ?bare oculta la barra (capturas limpias)
  const items = [
    ['index.html', 'Todas'],
    ['a-respira.html', 'A · Respira'],
    ['b-calidez.html', 'B · Calidez'],
    ['c-amanecer.html', 'C · Amanecer'],
    ['d-ventana.html', 'D · Ventana'],
    ['e-sobremesa.html', 'E · Sobremesa'],
    ['f-alba.html', 'F · Alba'],
  ];
  const here = location.pathname.split('/').pop() || 'index.html';
  const css = document.createElement('style');
  css.textContent = `
    .dsw{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:40;display:flex;gap:2px;padding:5px;border-radius:999px;background:rgba(18,18,22,.86);backdrop-filter:blur(8px);font:500 13px/1 system-ui,sans-serif;max-width:calc(100vw - 16px);overflow-x:auto;box-shadow:0 10px 30px rgba(0,0,0,.25)}
    .dsw a{color:#e8e8ee;text-decoration:none;padding:9px 12px;border-radius:999px;white-space:nowrap}
    .dsw a:hover{background:rgba(255,255,255,.12)}
    .dsw a[aria-current="page"]{background:#fff;color:#111}
    .dsw a:focus-visible{outline:2px solid #fff;outline-offset:1px}
    @media (max-width:520px){.dsw a{padding:9px 9px;font-size:12px}}`;
  document.head.appendChild(css);
  const nav = document.createElement('nav');
  nav.className = 'dsw';
  nav.setAttribute('aria-label', 'Propuestas de diseño');
  nav.innerHTML = items.map(([h, l]) => `<a href="${h}"${h === here ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  document.body.appendChild(nav);
})();
