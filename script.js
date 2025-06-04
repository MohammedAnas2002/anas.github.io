// Dark Mode Toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    currentTheme === "dark" ? "light" : "dark"
  );
};

// Copy BibTeX
function copyBibTeX() {
  const bib = document.getElementById("bibtex").innerText.trim();
  navigator.clipboard.writeText(bib);
  alert("BibTeX copied!");
}
