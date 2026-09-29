// Future Edge Tech - app.js - Final Version for Publisher Center
// Works with data.js (3 very long articles)

let currentCat = 'all';

function renderArticles(filter = 'all') {
  const container = document.getElementById('articles-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filtered = filter === 'all' ? articles : articles.filter(a => a.cat === filter);
  
  // Sort newest first
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  filtered.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="card-image">
        <img src="${article.image}" alt="${article.title}" loading="lazy" style="width:90px;height:90px;object-fit:contain;background:#fff;padding:8px;border-radius:12px;border:1px solid #eee">
      </div>
      <div class="card-content">
        <span class="tag">${article.tag} • ${article.cat.toUpperCase()}</span>
        <h2>${article.title}</h2>
        <p class="excerpt">${article.excerpt}</p>
        <small>${article.date} • Based in Abuja</small>
        <button onclick="openArticle(${article.id})" class="read-btn">Read Full Article</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;
  
  const modal = document.getElementById('article-modal');
  const modalContent = document.getElementById('modal-content');
  
  if (modal && modalContent) {
    modalContent.innerHTML = `
      <div class="modal-header">
        <span class="tag">${article.tag}</span>
        <h1>${article.title}</h1>
        <p><small>${article.date} | ${article.cat} | Based in Abuja</small></p>
        <img src="${article.image}" alt="logo" style="width:110px;background:#fff;padding:8px;border-radius:12px;border:1px solid #ddd;margin:15px 0">
      </div>
      <div class="modal-body">
        ${article.content}
      </div>
      <button onclick="closeModal()" class="close-btn">Close</button>
    `;
    modal.style.display = 'block';
    window.scrollTo(0,0);
    
    // Trigger AdSense if you have ad units inside article
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
  }
}

function closeModal() {
  const modal = document.getElementById('article-modal');
  if (modal) modal.style.display = 'none';
}

function filterByCategory(cat) {
  currentCat = cat;
  renderArticles(cat);
  
  // Update active button
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
    if(btn.dataset.cat === cat) btn.classList.add('active');
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  renderArticles('all');
  
  // Category buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterByCategory(btn.dataset.cat);
    });
  });
});

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById('article-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
