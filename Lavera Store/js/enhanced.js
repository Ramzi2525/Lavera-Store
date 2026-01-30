// نظام التحسينات المتقدمة
import { PRODUCTS, REVIEWS, FILTER_OPTIONS, FAQ, RECOMMENDATIONS } from './data.js';

// ============ نظام التقييمات ============
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star">★</span>';
    } else if (i - 0.5 <= rating) {
      stars += '<span class="star">★</span>';
    } else {
      stars += '<span class="star empty">☆</span>';
    }
  }
  return `<div class="rating-stars">${stars}</div>`;
}

function getAverageRating(productId) {
  const reviews = REVIEWS.filter(r => r.productId === productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
}

function renderReviews(productId) {
  const reviews = REVIEWS.filter(r => r.productId === productId);
  if (reviews.length === 0) {
    return '<div class="muted" style="margin: 20px 0;">No reviews yet. Be the first to review!</div>';
  }
  
  const average = getAverageRating(productId);
  return `
    <div class="reviews-section" style="margin: 30px 0;">
      <div class="rating-badge">
        ${renderStars(average)}
        <span>${average.toFixed(1)} (${reviews.length} reviews)</span>
      </div>
      <div class="reviews-list">
        ${reviews.slice(0, 3).map(review => `
          <div class="review">
            <div class="review-header">
              <div>
                <strong>${review.userName}</strong>
                ${review.verified ? '<span class="verified">✓ Verified</span>' : ''}
              </div>
              <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${renderStars(review.rating)}</div>
            <p class="review-comment">${review.comment}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============ Quick View System ============
let quickViewModal = null;

function initQuickView() {
  // إنشاء مودال Quick View
  const modalHTML = `
    <div class="quick-view-modal" id="quickViewModal">
      <div class="quick-view-content">
        <div class="quick-view-header" style="padding: 15px; border-bottom: 1px solid var(--line); display: flex; justify-content: flex-end;">
          <button class="close-btn" style="background: none; border: none; color: var(--muted); font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <div class="quick-view-body" id="quickViewBody"></div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  quickViewModal = document.getElementById('quickViewModal');
  
  // إضافة زر Quick View لكل بطاقة منتج
  document.addEventListener('click', (e) => {
    const productCard = e.target.closest('.cardP');
    if (productCard && !e.target.closest('button') && !e.target.closest('a')) {
      const productId = productCard.querySelector('[data-add]')?.getAttribute('data-add');
      if (productId) {
        openQuickView(productId);
      }
    }
  });
  
  // إضافة أحداث الإغلاق
  document.querySelector('#quickViewModal .close-btn').addEventListener('click', closeQuickView);
  document.querySelector('#quickViewModal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('#quickViewModal')) closeQuickView();
  });
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const avgRating = getAverageRating(productId);
  const reviews = REVIEWS.filter(r => r.productId === productId);
  
  const modalBody = document.querySelector('#quickViewBody');
  modalBody.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-images">
        <div class="gallery-zoom">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          <div class="zoom-hint">Click to zoom</div>
        </div>
        <div class="thumbnails">
          ${product.images.map((img, i) => `
            <img src="${img}" alt="Thumbnail ${i + 1}">
          `).join('')}
        </div>
      </div>
      <div class="quick-view-details">
        <h2 style="margin: 0 0 10px 0;">${product.name}</h2>
        <div style="color: var(--muted); margin-bottom: 15px;">${product.category} · ${product.subcategory}</div>
        
        <div class="price-row" style="margin: 20px 0;">
          <span class="price" style="font-size: 24px; font-weight: 700;">$${product.price}</span>
          ${product.compareAt ? `<span class="compare" style="color: var(--muted); text-decoration: line-through; margin-left: 10px;">$${product.compareAt}</span>` : ''}
        </div>
        
        <div class="rating-section" style="margin: 15px 0;">
          ${renderStars(avgRating)}
          <span style="color: var(--muted); font-size: 14px; margin-left: 10px;">(${reviews.length} reviews)</span>
        </div>
        
        <p class="description" style="color: var(--muted); line-height: 1.6; margin: 20px 0;">${product.description}</p>
        
        <div class="quick-actions" style="margin: 25px 0;">
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
            <div class="qty-selector" style="display: flex; border: 1px solid var(--line); border-radius: 14px; overflow: hidden;">
              <button class="qty-btn minus" style="width: 40px; height: 40px; background: rgba(255,255,255,0.03); border: none; color: var(--text); cursor: pointer;">-</button>
              <input type="number" value="1" min="1" max="99" style="width: 60px; text-align: center; background: rgba(255,255,255,0.02); border: none; color: var(--text); outline: none;">
              <button class="qty-btn plus" style="width: 40px; height: 40px; background: rgba(255,255,255,0.03); border: none; color: var(--text); cursor: pointer;">+</button>
            </div>
            <button class="btn primary add-to-cart" data-id="${product.id}" style="flex: 1;">Add to Cart</button>
          </div>
          <button class="btn add-to-wishlist" data-id="${product.id}" style="width: 100%;">♡ Add to Wishlist</button>
        </div>
        
        <div class="features" style="margin-top: 25px;">
          <h4 style="margin: 0 0 10px 0;">Features:</h4>
          <ul style="color: var(--muted); padding-left: 20px; margin: 0;">
            ${product.features.map(f => `<li style="margin-bottom: 5px;">${f}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  // إضافة تفاعل Zoom
  const zoomContainer = modalBody.querySelector('.gallery-zoom');
  zoomContainer.addEventListener('click', () => {
    zoomContainer.classList.toggle('zoomed');
  });
  
  // إضافة أحداث الأزرار
  const plusBtn = modalBody.querySelector('.qty-btn.plus');
  const minusBtn = modalBody.querySelector('.qty-btn.minus');
  const qtyInput = modalBody.querySelector('input[type="number"]');
  
  plusBtn.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
  
  minusBtn.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
    }
  });
  
  quickViewModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  if (quickViewModal) {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// ============ Chat Widget System ============
function initChatWidget() {
  const chatHTML = `
    <div class="chat-widget">
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <h4 style="margin: 0;">Studio Living Support</h4>
          <button class="close-chat">&times;</button>
        </div>
        <div class="chat-body">
          <div class="chat-messages" id="chatMessages">
            <div class="message bot">
              <p>Hello! 👋 How can I help you today?</p>
            </div>
          </div>
          <div class="chat-input">
            <input type="text" placeholder="Type your message..." id="chatInput">
            <button id="sendMessage" style="padding: 10px 15px; background: var(--accent); color: var(--bg); border: none; border-radius: var(--radius); cursor: pointer;">Send</button>
          </div>
        </div>
      </div>
      <div class="chat-button" id="chatButton">
        💬
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', chatHTML);
  
  const chatButton = document.getElementById('chatButton');
  const chatWindow = document.getElementById('chatWindow');
  
  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
  });
  
  document.querySelector('.close-chat').addEventListener('click', () => {
    chatWindow.classList.remove('active');
  });
  
  // محاكاة ردود الدعم
  const responses = [
    "Our shipping takes 3-7 business days.",
    "Yes, we offer 30-day returns.",
    "The product is made of premium materials.",
    "You can track your order from your account.",
    "We offer gift wrapping for $5."
  ];
  
  document.getElementById('sendMessage').addEventListener('click', () => {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    // إضافة رسالة المستخدم
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<p>${message}</p>`;
    document.getElementById('chatMessages').appendChild(userMsg);
    
    input.value = '';
    
    // رد البوت بعد ثانية
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';
      botMsg.innerHTML = `<p>${randomResponse}</p>`;
      document.getElementById('chatMessages').appendChild(botMsg);
      document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }, 1000);
  });
  
  // إدخال بالإرسال
  document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('sendMessage').click();
    }
  });
}

// ============ نظام المقارنة ============
let compareItems = [];

function initCompareSystem() {
  // إضافة زر المقارنة لكل منتج
  document.addEventListener('click', (e) => {
    const compareBtn = e.target.closest('[data-compare]');
    if (compareBtn) {
      const productId = compareBtn.dataset.compare;
      toggleCompare(productId);
    }
  });
  
  // تحديث شريط المقارنة
  updateCompareBar();
}

function toggleCompare(productId) {
  const index = compareItems.indexOf(productId);
  if (index > -1) {
    compareItems.splice(index, 1);
  } else {
    if (compareItems.length >= 3) {
      showToast('Maximum 3 items for comparison');
      return;
    }
    compareItems.push(productId);
  }
  
  updateCompareBar();
  showToast(compareItems.includes(productId) ? 'Added to compare' : 'Removed from compare');
}

function updateCompareBar() {
  let compareBar = document.getElementById('compareBar');
  if (!compareBar) {
    compareBar = document.createElement('div');
    compareBar.id = 'compareBar';
    compareBar.className = 'compare-bar';
    document.body.appendChild(compareBar);
  }
  
  if (compareItems.length === 0) {
    compareBar.classList.remove('active');
    return;
  }
  
  const products = compareItems.map(id => 
    PRODUCTS.find(p => p.id === id)
  ).filter(Boolean);
  
  compareBar.innerHTML = `
    <div class="compare-header">
      <h4 style="margin: 0;">Compare Products (${products.length}/3)</h4>
      <button class="btn small" id="clearCompare" style="padding: 5px 10px; font-size: 12px;">Clear All</button>
    </div>
    <div class="compare-items">
      ${products.map(product => `
        <div class="compare-item">
          <img src="${product.images[0]}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius);">
          <div class="small" style="margin-top: 5px;">${product.name}</div>
          <button class="remove-compare" data-id="${product.id}">&times;</button>
        </div>
      `).join('')}
    </div>
    <div class="compare-actions" style="text-align: center; margin-top: 10px;">
      <button class="btn primary" id="doCompare" style="padding: 8px 20px;">Compare Now</button>
    </div>
  `;
  
  compareBar.classList.add('active');
  
  // إضافة الأحداث
  document.getElementById('clearCompare')?.addEventListener('click', () => {
    compareItems = [];
    updateCompareBar();
  });
  
  document.querySelectorAll('.remove-compare').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.dataset.id;
      toggleCompare(productId);
    });
  });
  
  document.getElementById('doCompare')?.addEventListener('click', openCompareView);
}

function openCompareView() {
  const products = compareItems.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  
  const compareHTML = `
    <div class="quick-view-modal" id="compareModal">
      <div class="quick-view-content">
        <div class="quick-view-header" style="padding: 15px; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">Compare Products</h3>
          <button class="close-btn" style="background: none; border: none; color: var(--muted); font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        <div style="padding: 20px;">
          <div style="display: grid; grid-template-columns: 200px repeat(${products.length}, 1fr); gap: 20px; overflow-x: auto;">
            <div style="font-weight: 700; padding: 10px;">Features</div>
            ${products.map(p => `<div style="font-weight: 700; padding: 10px;">${p.name}</div>`).join('')}
            
            <div style="padding: 10px; border-top: 1px solid var(--line);">Price</div>
            ${products.map(p => `<div style="padding: 10px; border-top: 1px solid var(--line);">$${p.price}</div>`).join('')}
            
            <div style="padding: 10px; border-top: 1px solid var(--line);">Material</div>
            ${products.map(p => `<div style="padding: 10px; border-top: 1px solid var(--line);">${p.material}</div>`).join('')}
            
            <div style="padding: 10px; border-top: 1px solid var(--line);">Color</div>
            ${products.map(p => `<div style="padding: 10px; border-top: 1px solid var(--line);">${p.color}</div>`).join('')}
            
            <div style="padding: 10px; border-top: 1px solid var(--line);">Features</div>
            ${products.map(p => `<div style="padding: 10px; border-top: 1px solid var(--line);">${p.features.slice(0, 3).join(', ')}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', compareHTML);
  
  const modal = document.getElementById('compareModal');
  modal.classList.add('active');
  
  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// ============ نظام التوصيات ============
function renderRecommendations(productId) {
  const recommendations = RECOMMENDATIONS[productId] || [];
  const recommendedProducts = PRODUCTS.filter(p => 
    recommendations.includes(p.id) && p.id !== productId
  ).slice(0, 4);
  
  if (recommendedProducts.length === 0) return '';
  
  return `
    <section class="section">
      <div class="container">
        <div class="sectionHead">
          <h2 style="margin: 0;">You May Also Like</h2>
          <a href="products.html" class="linkMuted" data-link>View all →</a>
        </div>
        <div class="productsGrid">
          ${recommendedProducts.map(product => `
            <div class="cardP">
              <a class="thumb" href="product.html?id=${encodeURIComponent(product.id)}" data-link>
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
              </a>
              <div class="pBody">
                <div class="pTop">
                  <div>
                    <p class="pName">${product.name}</p>
                    <div class="pMeta">${product.category} · ${product.subcategory}</div>
                  </div>
                  <button class="iconbtn" type="button" data-wish="${product.id}" aria-label="Add to wishlist">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.8 4.6c-1.6-1.8-4.1-1.9-5.8-.4L12 6.8 9 4.2c-1.7-1.5-4.2-1.4-5.8.4-1.8 2.1-1.6 5.2.4 7.1l8 7.3 8-7.3c2-1.9 2.2-5 .4-7.1z"/>
                    </svg>
                  </button>
                </div>
                <div class="priceRow">
                  <span class="price">$${product.price}</span>
                  ${product.compareAt ? `<span class="compare">$${product.compareAt}</span>` : ''}
                </div>
                <div class="pActions">
                  <a class="btn" href="product.html?id=${encodeURIComponent(product.id)}" data-link>View</a>
                  <button class="btn primary" type="button" data-add="${product.id}">Add to cart</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// ============ نظام FAQ ============
function initFAQSystem() {
  const faqContainer = document.getElementById('faqSection');
  if (!faqContainer) return;
  
  faqContainer.innerHTML = `
    <div class="faq-container">
      <h2 style="margin-bottom: 20px;">Frequently Asked Questions</h2>
      <div class="faq-list">
        ${FAQ.map((item, index) => `
          <div class="faq-item" data-index="${index}">
            <div class="faq-question">
              <h3 style="margin: 0; font-size: 16px;">${item.question}</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p style="margin: 0; color: var(--muted); line-height: 1.6;">${item.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // إضافة تفاعل التوسيع
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      faqItem.classList.toggle('active');
      const toggle = question.querySelector('.faq-toggle');
      toggle.textContent = faqItem.classList.contains('active') ? '−' : '+';
    });
  });
}

// ============ Toast System ============
function showToast(message) {
  let toast = document.getElementById('enhanced-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'enhanced-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--accent);
      color: var(--bg);
      padding: 12px 20px;
      border-radius: var(--radius2);
      font-weight: 600;
      z-index: 10000;
      transition: transform 0.3s ease;
      box-shadow: var(--shadow);
    `;
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 3000);
}

// ============ Advanced Filters ============
function initAdvancedFilters() {
  const filterContainer = document.getElementById('advancedFilters');
  if (!filterContainer) return;
  
  filterContainer.innerHTML = `
    <div class="advanced-filters">
      <div class="filter-group">
        <h4>Price Range</h4>
        <div class="price-slider">
          <input type="range" min="0" max="200" value="200" class="price-range">
          <div class="price-values">
            <span>$0</span>
            <span>$100</span>
            <span>$200+</span>
          </div>
        </div>
      </div>
      
      <div class="filter-group">
        <h4>Colors</h4>
        <div class="filter-tags" id="colorFilters">
          ${FILTER_OPTIONS.colors.map(color => `
            <button class="filter-tag" data-filter="color" data-value="${color}">${color}</button>
          `).join('')}
        </div>
      </div>
      
      <div class="filter-group">
        <h4>Materials</h4>
        <div class="filter-tags" id="materialFilters">
          ${FILTER_OPTIONS.materials.map(material => `
            <button class="filter-tag" data-filter="material" data-value="${material}">${material}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // إضافة أحداث الفلاتر
  document.querySelectorAll('.filter-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      applyFilters();
    });
  });
  
  document.querySelector('.price-range').addEventListener('input', applyFilters);
}

function applyFilters() {
  const maxPrice = parseInt(document.querySelector('.price-range')?.value || 200);
  const activeColors = Array.from(document.querySelectorAll('#colorFilters .filter-tag.active'))
    .map(btn => btn.dataset.value);
  const activeMaterials = Array.from(document.querySelectorAll('#materialFilters .filter-tag.active'))
    .map(btn => btn.dataset.value);
  
  let filtered = PRODUCTS.filter(product => {
    // فلتر السعر
    if (product.price > maxPrice) return false;
    
    // فلتر الألوان
    if (activeColors.length > 0 && !activeColors.includes(product.color)) return false;
    
    // فلتر المواد
    if (activeMaterials.length > 0 && !activeMaterials.includes(product.material)) return false;
    
    return true;
  });
  
  // إذا كان هناك شبكة منتجات، قم بتحديثها
  const productsGrid = document.querySelector('.productsGrid');
  if (productsGrid) {
    // هنا يمكنك استدعاء دالة عرض المنتجات الموجودة في app.js
    console.log('Filtered products:', filtered);
    // ستقوم بتحديث هذا الجزء ليتكامل مع النظام الحالي
  }
}

// ============ Lazy Loading ============
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============ Initialize All Systems ============
function initEnhancedFeatures() {
  // تهيئة جميع الأنظمة بعد تحميل DOM
  setTimeout(() => {
    initQuickView();
    initChatWidget();
    initCompareSystem();
    initAdvancedFilters();
    initLazyLoading();
    
    // إضافة التقييمات إلى المنتجات الموجودة
    addRatingsToProducts();
  }, 100);
}

// إضافة التقييمات إلى بطاقات المنتج
function addRatingsToProducts() {
  document.querySelectorAll('.cardP').forEach(card => {
    const addButton = card.querySelector('[data-add]');
    if (addButton) {
      const productId = addButton.getAttribute('data-add');
      const avgRating = getAverageRating(productId);
      const reviews = REVIEWS.filter(r => r.productId === productId);
      
      if (avgRating > 0) {
        const ratingHTML = `
          <div class="rating-section" style="margin: 8px 0; display: flex; align-items: center;">
            ${renderStars(avgRating)}
            <span style="color: var(--muted); font-size: 12px; margin-left: 5px;">(${reviews.length})</span>
          </div>
        `;
        
        const priceRow = card.querySelector('.priceRow');
        if (priceRow) {
          priceRow.insertAdjacentHTML('afterend', ratingHTML);
        }
      }
    }
  });
}

// ============ Export Functions ============
export {
  renderStars,
  renderReviews,
  renderRecommendations,
  initEnhancedFeatures,
  initFAQSystem,
  showToast
};
