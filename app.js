// Future Edge Tech - app.js - Final Version for Publisher Center
let currentCat = 'all';

function renderArticles(filter = 'all') {
  const container = document.getElementById('articles-container');
  if (!container) return;
  container.innerHTML = '';
  const filtered = filter === 'all' ? articles : articles.filter(a => a.cat === filter);
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  filtered.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div style="display:flex;gap:15px;padding:18px;border:1px solid #eee;border-radius:16px;margin-bottom:18px;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,0.04)">
        <img src="${article.image}" alt="${article.title}" loading="lazy" style="width:80px;height:80px;object-fit:contain;background:#fff;padding:6px;border-radius:12px;border:1px solid #eee;flex-shrink:0">
        <div style="flex:1">
          <span style="font-size:11px;font-weight:700;color:#fff;background:#111;padding:4px 8px;border-radius:20px;text-transform:uppercase">${article.tag}</span>
          <h2 style="margin:10px 0 6px 0;font-size:18px;line-height:1.3">${article.title}</h2>
          <p style="font-size:13px;color:#555;margin:0 0 8px 0">${article.excerpt}</p>
          <small style="color:#888">${article.date} • Based in Abuja</small><br/>
          <button onclick="openArticle(${article.id})" style="margin-top:10px;background:#111;color:#fff;border:none;padding:8px 14px;border-radius:20px;font-size:13px;cursor:pointer">Read Full Article</button>
        </div>
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
      <div style="padding:20px">
        <span style="font-size:11px;font-weight:700;color:#fff;background:#111;padding:4px 8px;border-radius:20px;text-transform:uppercase">${article.tag}</span>
        <h1 style="margin:15px 0;font-size:26px;line-height:1.2">${article.title}</h1>
        <p><small style="color:#888">${article.date} | ${article.cat.toUpperCase()} | Based in Abuja, Nigeria</small></p>
        <img src="${article.image}" alt="logo" style="width:110px;background:#fff;padding:8px;border-radius:12px;border:1px solid #ddd;margin:15px 0">
        <div style="margin-top:20px;line-height:1.7;font-size:16px;color:#222">${article.content}</div>
        <button onclick="closeModal()" style="margin-top:25px;background:#111;color:#fff;border:none;padding:10px 18px;border-radius:20px;cursor:pointer">Close Article</button>
      </div>
    `;
    modal.style.display = 'block';
    window.scrollTo(0,0);
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
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
    if(btn.dataset.cat === cat) btn.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderArticles('all');
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => filterByCategory(btn.dataset.cat));
  });
});

window.onclick = function(event) {
  const modal = document.getElementById('article-modal');
  if (event.target == modal) modal.style.display = 'none';
}
