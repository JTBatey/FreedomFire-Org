/* Navigation, accessible gallery lightbox and explicit email draft fallback. */
// Old Squarespace archive bookmarks can reach blog/index.html directly, so
// handle their query-string pagination here as well as in the 404 fallback.
if (/\/blog\/(?:index\.html)?$/.test(location.pathname)) {
  const params = new URLSearchParams(location.search);
  const oldArchives = [
    ['1447769631000', 'Blog', 'category-blog-page-2.html'],
    ['1326825049000', 'Uncategorized', 'category-uncategorized-page-2.html'],
    ['1447769631000', null, 'page-2.html'],
    ['1332794033000', null, 'page-3.html']
  ];
  const archive = oldArchives.find(([offset, category]) =>
    params.get('offset') === offset && params.get('category') === category);
  if (archive) {
    const destination = new URL(archive[2], location.href);
    destination.search = location.search;
    destination.hash = location.hash;
    location.replace(destination.href);
  }
}
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const folders = [...document.querySelectorAll('.nav-folder')];
function closeFolders() { folders.forEach(folder => { folder.classList.remove('open'); folder.querySelector('button').setAttribute('aria-expanded', 'false'); }); }
toggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
  document.querySelector('main').inert = open;
  document.querySelector('footer').inert = open;
});
folders.forEach(folder => folder.querySelector('button').addEventListener('click', event => {
  const desktopClick = event.detail > 0 && matchMedia('(min-width:768px)').matches;
  const open = desktopClick || !folder.classList.contains('open'); closeFolders();
  folder.classList.toggle('open', open); folder.querySelector('button').setAttribute('aria-expanded', String(open));
}));
folders.forEach(folder => {
  folder.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && matchMedia('(min-width:768px)').matches) {
      closeFolders(); folder.classList.add('open'); folder.querySelector('button').setAttribute('aria-expanded', 'true');
    }
  });
  folder.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && matchMedia('(min-width:768px)').matches) closeFolders();
  });
  folder.addEventListener('focusout', event => {
    if (!folder.contains(event.relatedTarget)) { folder.classList.remove('open'); folder.querySelector('button').setAttribute('aria-expanded', 'false'); }
  });
});
matchMedia('(min-width:768px)').addEventListener('change', event => {
  if (event.matches && header.classList.contains('menu-open')) toggle.click();
});
document.addEventListener('click', event => { if (!header.contains(event.target)) closeFolders(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeFolders(); if (header.classList.contains('menu-open')) { toggle.click(); toggle.focus(); } } });
const pagePath = path => path.replace(/\/index\.html$/, '/').replace(/\/$/, '');
document.querySelectorAll('.primary-nav a').forEach(link => { if (pagePath(new URL(link.href).pathname) === pagePath(location.pathname)) link.setAttribute('aria-current', 'page'); });
document.querySelectorAll('[data-email-list-signup]').forEach(checkbox => {
  const value = checkbox.form?.querySelector('input[type="hidden"][name="email_list_signup"]');
  if (!value) return;
  const syncValue = () => { value.value = checkbox.checked ? 'Yes' : 'No'; };
  syncValue();
  checkbox.addEventListener('change', syncValue);
  checkbox.form.addEventListener('submit', syncValue);
});
document.querySelectorAll('.gallery a').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const dialog = document.createElement('dialog'); dialog.className = 'image-viewer';
  const image = document.createElement('img'); image.src = link.href; image.alt = link.querySelector('img').alt;
  const close = document.createElement('button'); close.type = 'button'; close.setAttribute('aria-label', 'Close image'); close.textContent = '×';
  close.addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }); dialog.addEventListener('close', () => { dialog.remove(); link.focus(); });
  dialog.append(close,image); document.body.append(dialog); dialog.showModal();
}));
