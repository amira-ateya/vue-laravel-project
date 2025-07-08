export const ThemeManager = {
  init() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme); // يضيف dark أو light على body
  },
  toggle() {
    const current = document.body.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    document.body.classList.remove(current);
    document.body.classList.add(next);
    localStorage.setItem('theme', next);
  }
};
