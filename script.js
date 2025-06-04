// Set initial theme based on system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');

// Set initial theme
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme);
} else {
  document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
}

// Dark Mode Toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};

// Copy BibTeX (unchanged)
function copyBibTeX() {
  const bib = document.getElementById("bibtex").innerText.trim();
  navigator.clipboard.writeText(bib);
  alert("BibTeX copied!");
}
