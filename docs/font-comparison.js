/* Isolated review controls; no changes to the real site or browser storage. */
const notes = {
  'Figtree': 'Figtree: the selected font for the website’s body text and headings.',
  'Albert Sans': 'Albert Sans: a clean geometric alternative. Compare its lighter-looking headings and letter shapes with Figtree.',
  'Montserrat': 'Montserrat: a strong geometric alternative. Its wider text is more likely to change line wrapping.'
};
document.querySelectorAll('input[name="candidate"]').forEach(input => {
  input.addEventListener('change', () => {
    document.querySelector('.candidate').style.setProperty('--candidate-font', `'${input.value}'`);
    document.getElementById('candidate-label').textContent = input.value;
    document.getElementById('candidate-note').textContent = notes[input.value];
  });
});
async function verifyFonts() {
  const names = ['Figtree', 'Albert Sans', 'Montserrat', 'Jost'];
  const results = await Promise.all(names.map(async name => {
    try { return {name, loaded: (await document.fonts.load(`400 17px "${name}"`)).length > 0}; }
    catch { return {name, loaded: false}; }
  }));
  const missing = results.filter(result => !result.loaded).map(result => result.name);
  const status = document.getElementById('font-status');
  status.classList.toggle('font-warning', missing.length > 0);
  status.textContent = missing.length
    ? `Not loaded: ${missing.join(', ')}. That sample may show a fallback font. Check that the local files are present.`
    : 'All four open-source fonts are loaded from your local files. No font-service connection is used.';
}
verifyFonts();
