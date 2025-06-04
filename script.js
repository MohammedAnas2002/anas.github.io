// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
} else if (prefersDarkScheme.matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Load research projects
document.addEventListener('DOMContentLoaded', () => {
  fetch('research.json')
    .then(response => response.json())
    .then(data => {
      const researchGrid = document.getElementById('research-grid');
      researchGrid.innerHTML = '';
      
      data.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'research-card';
        projectElement.innerHTML = `
          <div class="research-image">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="research-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="research-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="btn">Learn More</a>
          </div>
        `;
        researchGrid.appendChild(projectElement);
      });
    })
    .catch(error => console.error('Error loading research data:', error));

  // Load publications
  fetch('publications.json')
    .then(response => response.json())
    .then(data => {
      const pubContainer = document.getElementById('pub-container');
      pubContainer.innerHTML = '';
      
      // Group publications by year
      const publicationsByYear = {};
      data.forEach(pub => {
        if (!publicationsByYear[pub.year]) {
          publicationsByYear[pub.year] = [];
        }
        publicationsByYear[pub.year].push(pub);
      });
      
      // Sort years in descending order
      const years = Object.keys(publicationsByYear).sort((a, b) => b - a);
      
      years.forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'pub-year-section';
        yearSection.innerHTML = `<div class="pub-year">${year}</div>`;
        
        publicationsByYear[year].forEach(pub => {
          const pubElement = document.createElement('div');
          pubElement.className = `pub-item ${pub.type}`;
          pubElement.innerHTML = `
            <h3>${pub.title}</h3>
            <p>${pub.authors}</p>
            <p>${pub.journal}</p>
            <div class="pub-links">
              <a href="${pub.link}" class="pub-link"><i class="fas fa-external-link-alt"></i> Read Paper</a>
              <a href="#" class="pub-link"><i class="fas fa-quote-right"></i> BibTeX</a>
            </div>
          `;
          yearSection.appendChild(pubElement);
        });
        
        pubContainer.appendChild(yearSection);
      });
      
      // Set up filtering
      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          const filter = button.getAttribute('data-filter');
          const pubItems = document.querySelectorAll('.pub-item');
          
          pubItems.forEach(item => {
            if (filter === 'all') {
              item.style.display = 'block';
            } else {
              if (item.classList.contains(filter)) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            }
          });
        });
      });
    })
    .catch(error => console.error('Error loading publications:', error));

  // Form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
