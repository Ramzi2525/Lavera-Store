
// assets/js/app.js
import { PRODUCTS, NAV, COLLECTIONS } from "./data.js";
import { STORIES } from "./stories.js";
import { enhanceLinksForSmoothTransition, getQuery, money, qs, qsa } from "./router.js";


const LS_KEYS = {
  cart: "sl_cart_v1",
  wish: "sl_wish_v1",
};

function readLS(key){
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}
function writeLS(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCart(){ return readLS(LS_KEYS.cart); }
export function setCart(v){ writeLS(LS_KEYS.cart, v); updateBadges(); }
export function getWish(){ return readLS(LS_KEYS.wish); }
export function setWish(v){ writeLS(LS_KEYS.wish, v); updateBadges(); }

function updateBadges(){
  const cart = getCart();
  const wish = getWish();
  const cartCount = cart.reduce((a, it) => a + (it.qty || 1), 0);
  const wishCount = wish.length;

  const cartBadge = qs("[data-cart-badge]");
  const wishBadge = qs("[data-wish-badge]");
  if (cartBadge) cartBadge.textContent = cartCount;
  if (wishBadge) wishBadge.textContent = wishCount;
}

function icon(svgPathD){
  return `
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="${svgPathD}" />
    </svg>
  `;
}

export function renderShell(){
  // Notice + Header with mega menu + Search modal + Footer
  const shell = qs("#shell");
  if (!shell) return;

  const navCols = Object.entries(NAV).map(([cat, subs]) => {
    const links = subs.map(s => `
      <a href="products.html?category=${encodeURIComponent(cat)}&sub=${encodeURIComponent(s)}" data-link>
        <div>${s}</div><span>Explore</span>
      </a>
    `).join("");

    return `
      <div class="megacol">
        <div class="megatitle">${cat}</div>
        <div class="megalinks">${links}</div>
      </div>
    `;
  }).join("");

  shell.innerHTML = `
    <div class="notice">
      <div class="container">
        <div class="row">
          <div class="badge"><span class="dot"></span> Free Shipping <b>over $180</b> · Gift wrapping available</div>
          <div class="small">EN · USD · Store finder</div>
        </div>
      </div>
    </div>

    <header class="header">
      <div class="container">
        <div class="row">
          <a class="brand" href="index.html" data-link>
            <div class="logo"></div>
            <div class="name">Studio Living</div>
          </a>

          <nav class="nav">
  <a href="sale.html" data-link>SALE</a>
  <a href="faq.html" data-link>FAQ</a>


  <div class="megawrap">
    <a href="collections.html" data-link>Collections ▾</a>
    <div class="mega">
      <div class="megapanel">
        <div class="megagrid">${navCols}</div>
      </div>
    </div>
  </div>

  <a href="products.html" data-link>Shop</a>
  <a href="gifts.html" data-link>Gift Ideas</a>
  <a href="stories.html" data-link>Stories</a>
  <a href="world.html" data-link>World</a>
  <a href="contact.html" data-link>Contact</a>
</nav>


          <div class="actions">
            <button class="iconbtn" type="button" id="openSearch" aria-label="Search">
              ${icon("M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z")}
            </button>

            <a class="iconbtn" href="wishlist.html" data-link aria-label="Wishlist">
              ${icon("M20.8 4.6c-1.6-1.8-4.1-1.9-5.8-.4L12 6.8 9 4.2c-1.7-1.5-4.2-1.4-5.8.4-1.8 2.1-1.6 5.2.4 7.1l8 7.3 8-7.3c2-1.9 2.2-5 .4-7.1z")}
            </a>

            <a class="iconbtn" href="cart.html" data-link aria-label="Cart">
              ${icon("M6 7h15l-1.5 9h-12L6 7zM6 7 5 4H2")}
            </a>

            <div class="badge small" style="padding:8px 10px">
              ♥ <b data-wish-badge>0</b> · 🛒 <b data-cart-badge>0</b>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="modal" id="searchModal" aria-hidden="true">
      <div class="modalPanel">
        <div class="modalHead">
          <input id="searchInput" placeholder="Search products, categories, tags…" />
          <button class="iconbtn" id="closeSearch" type="button" aria-label="Close">
            ${icon("M6 6l12 12M18 6 6 18")}
          </button>
        </div>
        <div class="modalBody" id="searchResults"></div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="footerGrid">
          <div class="footCard">
            <div style="display:flex;align-items:center;gap:10px">
              <div class="logo"></div>
              <div>
                <div style="font-weight:700">Studio Living</div>
                <div class="small">Modern home design store template · HTML/CSS/JS</div>
              </div>
            </div>
            <div class="hr"></div>
            <div class="small">Crafted for smooth UX: transitions, mega menu, product JSON, cart & wishlist.</div>
          </div>

          <div class="footCard">
            <div style="font-weight:700;margin-bottom:8px">Shop</div>
            <div class="small"><a class="linkMuted" href="products.html" data-link>All products</a></div>
            <div class="small"><a class="linkMuted" href="sale.html" data-link>Sale</a></div>
            <div class="small"><a class="linkMuted" href="gifts.html" data-link>Gift ideas</a></div>
          </div>

          <div class="footCard">
            <div style="font-weight:700;margin-bottom:8px">Company</div>
            <div class="small"><a class="linkMuted" href="world.html" data-link>About & Stories</a></div>
            <div class="small"><a class="linkMuted" href="contact.html" data-link>Contact</a></div>
          </div>
        </div>
        <div class="small" style="padding-top:14px">© ${new Date().getFullYear()} Studio Living · Demo template</div>
      </div>
    </footer>
  `;

  wireSearch();
  updateBadges();
window.addEventListener("storage", () => updateBadges());
enhanceLinksForSmoothTransition();

}

function wireSearch(){
  const modal = qs("#searchModal");
  const openBtn = qs("#openSearch");
  const closeBtn = qs("#closeSearch");
  const input = qs("#searchInput");
  const results = qs("#searchResults");

  const open = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    input.value = "";
    results.innerHTML = "";
    setTimeout(() => input.focus(), 10);
  };
  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
  });

  input?.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = q.length < 2 ? [] : PRODUCTS.filter(p => {
      const hay = `${p.name} ${p.category} ${p.subcategory} ${p.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 12);

    results.innerHTML = filtered.length ? filtered.map(p => `
      <a class="result" href="product.html?id=${encodeURIComponent(p.id)}" data-link>
        <div class="rThumb"><img src="${p.images[0]}" alt=""></div>
        <div style="flex:1">
          <div style="font-weight:700">${p.name}</div>
          <div class="small">${p.category} · ${p.subcategory}</div>
        </div>
        <div style="font-weight:700">${money(p.price)}</div>
      </a>
    `).join("") : `<div class="small" style="padding:10px;color:rgba(255,255,255,.55)">Type at least 2 characters to search…</div>`;

    enhanceLinksForSmoothTransition();
  });
}

/* ------- Page renderers ------- */

export function renderHome(){
  qs("#page").innerHTML = `
    <main class="page">
      <section class="hero">
        <div class="container">
          <div class="card">
            <div class="inner">
              <div class="content">
                <div class="kicker">✦ Curated design · Smooth UX · Modern palette</div>
                <div class="h1">Design objects<br/>made to live with.</div>
                <p class="sub">
                  A premium storefront template inspired by modern design brands—clean grids, subtle motion,
                  and a refined copper accent.
                </p>
                <div class="ctaRow">
                  <a class="btn primary" href="collections.html" data-link>
  Browse collections →
</a>
                  <a class="btn" href="world.html" data-link>Explore the world</a>
                  <button class="btn" type="button" id="heroQuickAdd">Quick add bestseller</button>
                </div>

                <div class="heroStats">
                  <div class="stat"><b>Fast</b><span>LocalStorage cart & wishlist</span></div>
                  <div class="stat"><b>Smooth</b><span>Transitions + hover motion</span></div>
                  <div class="stat"><b>Clean</b><span>Modern mega menu taxonomy</span></div>
                </div>
              </div>

              <div class="media"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="sectionHead">
            <div>
              <h2>Shop by mood</h2>
              <p>Structured like a premium design store.</p>
            </div>
            <a class="linkMuted" href="products.html" data-link>View all →</a>
          </div>

          <div class="grid">
            ${tile("Tea & Coffee", "Kettles", "Sculptural kettles and coffee tools.", "products.html?category=Tea%20%26%20Coffee")}
            ${tile("Tableware", "Serving Trays", "Minimal forms with warm presence.", "products.html?category=Tableware")}
            ${tile("Homeware", "Diffusers", "Atmosphere, materials, quiet luxury.", "products.html?category=Homeware")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="sectionHead">
            <div>
              <h2>Featured products</h2>
              <p>Data-driven cards from a JSON catalog.</p>
            </div>
            <a class="linkMuted" href="products.html" data-link>Browse catalog →</a>
          </div>

          <div class="productsGrid" id="featuredGrid"></div>
        </div>
      </section>
    </main>
  `;

  // featured
  const featured = PRODUCTS.slice(0, 4);
  qs("#featuredGrid").innerHTML = featured.map(p => productCard(p)).join("");
  enhanceLinksForSmoothTransition();

  // quick add
  qs("#heroQuickAdd")?.addEventListener("click", () => {
    addToCart(PRODUCTS[0].id, 1);
    toast("Added bestseller to cart.");
  });
}

function tile(title, subtitle, desc, href){
  return `
    <a class="tile" href="${href}" data-link>
      <div class="bg"></div>
      <div class="t">
        <div class="kicker" style="display:inline-flex">${subtitle}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    </a>
  `;
}

function productCard(p){
  const compare = p.compareAt && p.compareAt > p.price ? `<span class="compare">${money(p.compareAt)}</span>` : "";
  const tags = p.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <div class="cardP">
      <a class="thumb" href="product.html?id=${encodeURIComponent(p.id)}" data-link>
        <img src="${p.images[0]}" alt="${p.name}">
      </a>
      <div class="pBody">
        <div class="pTop">
          <div>
            <p class="pName">${p.name}</p>
            <div class="pMeta">${p.category} · ${p.subcategory}</div>
          </div>
          <button class="iconbtn" type="button" data-wish="${p.id}" aria-label="Add to wishlist">
            ${icon("M20.8 4.6c-1.6-1.8-4.1-1.9-5.8-.4L12 6.8 9 4.2c-1.7-1.5-4.2-1.4-5.8.4-1.8 2.1-1.6 5.2.4 7.1l8 7.3 8-7.3c2-1.9 2.2-5 .4-7.1z")}
          </button>
        </div>
        <div class="priceRow">
          <span class="price">${money(p.price)}</span>
          ${compare}
        </div>
        <div class="pTags">${tags}</div>

        <div class="pActions">
          <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}" data-link>View</a>
          <button class="btn primary" type="button" data-add="${p.id}">Add to cart</button>
        </div>
      </div>
    </div>
  `;
}

export function renderProducts(){
  const page = qs("#page");
  const category = getQuery("category") || "All";
  const sub = getQuery("sub") || "All";

  page.innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>Products</h2>
            <p>Refined grid · filtering · smooth motion.</p>
          </div>
          <a class="linkMuted" href="sale.html" data-link>Go to sale →</a>
        </div>

        <div class="toolbar">
          <div class="filters">
            <select class="select" id="catSelect"></select>
            <select class="select" id="subSelect"></select>
            <select class="select" id="sortSelect">
              <option value="featured">Sort: Featured</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
              <option value="nameAsc">Name: A → Z</option>
            </select>
          </div>

          <input class="search" id="filterSearch" placeholder="Filter within catalog…" />
        </div>

        <div style="text-align: center; margin: 20px 0;">
  <a href="products-advanced.html" class="btn" data-link>
    🎯 Advanced Filters
  </a>
</div>


        <div class="productsGrid" id="grid"></div>
      </div>
    </main>
  `;

  const cats = ["All", ...Object.keys(NAV)];
  const catSelect = qs("#catSelect");
  const subSelect = qs("#subSelect");
  const sortSelect = qs("#sortSelect");
  const filterSearch = qs("#filterSearch");
  const grid = qs("#grid");

  catSelect.innerHTML = cats.map(c => `<option ${c===category ? "selected":""} value="${c}">${c}</option>`).join("");

  function fillSubs(cat){
    const subs = cat === "All" ? ["All"] : ["All", ...(NAV[cat] || [])];
    subSelect.innerHTML = subs.map(s => `<option ${s===sub ? "selected":""} value="${s}">${s}</option>`).join("");
  }
  fillSubs(category);

  function apply(){
    const cat = catSelect.value;
    const subc = subSelect.value;
    const q = (filterSearch.value || "").trim().toLowerCase();
    const sort = sortSelect.value;

    let items = PRODUCTS.slice();

    if (cat !== "All") items = items.filter(p => p.category === cat);
    if (subc !== "All") items = items.filter(p => p.subcategory === subc);
    if (q) items = items.filter(p => (`${p.name} ${p.tags.join(" ")} ${p.category} ${p.subcategory}`.toLowerCase()).includes(q));

    items = sortItems(items, sort);

    grid.innerHTML = items.map(p => productCard(p)).join("") || `
      <div class="panel" style="grid-column:1/-1">
        <div style="font-weight:700;margin-bottom:6px">No matches</div>
        <div class="muted">Try clearing filters or searching a different term.</div>
      </div>
    `;

    wireProductCardActions();
    enhanceLinksForSmoothTransition();
  }

  catSelect.addEventListener("change", () => {
    fillSubs(catSelect.value);
    apply();
  });
  subSelect.addEventListener("change", apply);
  sortSelect.addEventListener("change", apply);
  filterSearch.addEventListener("input", apply);

  apply();
  wireProductCardActions();
}

function sortItems(items, sort){
  const arr = items.slice();
  if (sort === "priceAsc") arr.sort((a,b)=>a.price-b.price);
  if (sort === "priceDesc") arr.sort((a,b)=>b.price-a.price);
  if (sort === "nameAsc") arr.sort((a,b)=>a.name.localeCompare(b.name));
  return arr;
}

function wireProductCardActions(){
  qsa("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.getAttribute("data-add"), 1);
      toast("Added to cart.");
    });
  });
  qsa("[data-wish]").forEach(btn => {
    btn.addEventListener("click", () => {
      toggleWish(btn.getAttribute("data-wish"));
    });
  });
}

export function renderProduct(){
  const id = getQuery("id");
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2><a class="linkMuted" href="products.html" data-link>Products</a> / ${p.name}</h2>
            <p>${p.category} · ${p.subcategory}</p>
          </div>
          <a class="linkMuted" href="cart.html" data-link>Open cart →</a>
        </div>

        <div class="pWrap">
          <div class="gallery">
            <div class="galleryMain">
              <img id="mainImg" src="${p.images[0]}" alt="${p.name}">
            </div>
            <div class="thumbs">
              ${p.images.map((src, i) => `<button type="button" data-img="${src}" aria-label="Image ${i+1}"><img src="${src}" alt=""></button>`).join("")}
            </div>
          </div>

          <div class="panel">
            <h1>${p.name}</h1>
            <div class="muted">${p.material} · ${p.color}</div>

            <div class="hr"></div>

            <div class="priceRow">
              <span class="price" style="font-size:20px">${money(p.price)}</span>
              ${p.compareAt && p.compareAt > p.price ? `<span class="compare">${money(p.compareAt)}</span>` : ""}
              ${p.tags?.length ? `<span class="tag" style="margin-left:auto">${p.tags[0]}</span>` : ""}
            </div>

            <p class="muted" style="margin-top:10px">${p.description}</p>

            <div class="qtyRow">
              <div class="qty">
                <button type="button" id="dec">-</button>
                <input id="qty" value="1" inputmode="numeric" />
                <button type="button" id="inc">+</button>
              </div>

              <button class="btn primary" type="button" id="addToCart">Add to cart</button>
              <button class="btn" type="button" id="wishBtn">Wishlist</button>
            </div>

            <div class="hr"></div>
            <div style="font-weight:700;margin-bottom:6px">Features</div>
            <ul class="list">${p.features.map(f=>`<li>${f}</li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </main>
  `;

  // gallery switch
  qsa("[data-img]").forEach(b => {
    b.addEventListener("click", () => {
      qs("#mainImg").src = b.getAttribute("data-img");
    });
  });

  // qty controls
  const qtyInput = qs("#qty");
  const clampQty = () => {
    let v = parseInt(qtyInput.value || "1", 10);
    if (Number.isNaN(v) || v < 1) v = 1;
    if (v > 99) v = 99;
    qtyInput.value = String(v);
    return v;
  };
  qs("#dec").addEventListener("click", () => { qtyInput.value = String(clampQty()-1); clampQty(); });
  qs("#inc").addEventListener("click", () => { qtyInput.value = String(clampQty()+1); clampQty(); });
  qtyInput.addEventListener("input", clampQty);

  qs("#addToCart").addEventListener("click", () => {
    addToCart(p.id, clampQty());
    toast("Added to cart.");
  });

  qs("#wishBtn").addEventListener("click", () => toggleWish(p.id));
  enhanceLinksForSmoothTransition();
}

export function renderCart(){
  const cart = getCart();

  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>Cart</h2>
            <p>Your selections saved locally.</p>
          </div>
          <a class="linkMuted" href="products.html" data-link>Continue shopping →</a>
        </div>

        <div class="rowCard">
          <div style="padding:14px;display:flex;justify-content:space-between;align-items:center;gap:10px">
            <div style="font-weight:700">Items</div>
            <button class="btn" type="button" id="clearCart">Clear</button>
          </div>
          <div class="hr"></div>
          <div style="padding:12px" id="cartBody"></div>
        </div>

        <div class="totalBox">
          <div class="totalPanel">
            <div class="totalLine"><span>Subtotal</span><b id="subTotal">$0</b></div>
            <div class="totalLine"><span>Shipping</span><b class="muted">Calculated at checkout</b></div>
            <div class="hr"></div>
            <div class="totalLine"><span>Total</span><b id="total">$0</b></div>
            <div style="margin-top:10px">
              <button class="btn primary" type="button" style="width:100%" id="checkout">Checkout (demo)</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;

  const body = qs("#cartBody");

  if (!cart.length){
    body.innerHTML = `
      <div class="panel">
        <div style="font-weight:700;margin-bottom:6px">Your cart is empty</div>
        <div class="muted">Add items to see them here.</div>
      </div>
    `;
    qs("#subTotal").textContent = money(0);
    qs("#total").textContent = money(0);
    enhanceLinksForSmoothTransition();
    return;
  }

  body.innerHTML = cart.map(it => {
    const p = PRODUCTS.find(x=>x.id===it.id);
    if (!p) return "";
    return `
      <div class="panel" style="margin-bottom:10px">
        <div style="display:flex;gap:12px;align-items:center">
          <div class="rThumb" style="width:96px;height:72px"><img src="${p.images[0]}" alt=""></div>
          <div style="flex:1">
            <div style="font-weight:700">${p.name}</div>
            <div class="small">${p.category} · ${p.subcategory}</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700">${money(p.price)}</div>
            <div class="small">each</div>
          </div>
        </div>

        <div class="hr"></div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between">
          <div class="qty">
            <button type="button" data-dec="${p.id}">-</button>
            <input value="${it.qty}" data-qty="${p.id}" inputmode="numeric" />
            <button type="button" data-inc="${p.id}">+</button>
          </div>

          <div style="display:flex;gap:10px;align-items:center">
            <div class="small">Line total: <b style="color:var(--text)">${money(p.price * it.qty)}</b></div>
            <button class="btn" type="button" data-remove="${p.id}">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const recalc = () => {
    const c = getCart();
    const subtotal = c.reduce((sum, it) => {
      const p = PRODUCTS.find(x=>x.id===it.id);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
    qs("#subTotal").textContent = money(subtotal);
    qs("#total").textContent = money(subtotal);
  };

  const setQty = (id, qty) => {
    const c = getCart();
    const idx = c.findIndex(x=>x.id===id);
    if (idx === -1) return;
    c[idx].qty = Math.max(1, Math.min(99, qty));
    setCart(c);
    renderCart(); // simple refresh for demo
  };

  qsa("[data-dec]").forEach(b => b.addEventListener("click", () => {
    const id = b.getAttribute("data-dec");
    const c = getCart().find(x=>x.id===id);
    if (!c) return;
    setQty(id, c.qty - 1);
  }));
  qsa("[data-inc]").forEach(b => b.addEventListener("click", () => {
    const id = b.getAttribute("data-inc");
    const c = getCart().find(x=>x.id===id);
    if (!c) return;
    setQty(id, c.qty + 1);
  }));
  qsa("[data-remove]").forEach(b => b.addEventListener("click", () => {
    const id = b.getAttribute("data-remove");
    setCart(getCart().filter(x=>x.id!==id));
    toast("Removed.");
    renderCart();
  }));

  qs("#clearCart").addEventListener("click", () => {
    setCart([]);
    toast("Cart cleared.");
    renderCart();
  });

  qs("#checkout").addEventListener("click", () => {
    toast("Checkout is demo only. Integrate Stripe/PayPal next.");
  });

  recalc();
}

export function renderWishlist(){
  const wish = getWish();

  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>Wishlist</h2>
            <p>Save items for later.</p>
          </div>
          <a class="linkMuted" href="products.html" data-link>Browse products →</a>
        </div>

        <div class="productsGrid" id="wishGrid"></div>
      </div>
    </main>
  `;

  const grid = qs("#wishGrid");
  if (!wish.length){
    grid.innerHTML = `
      <div class="panel" style="grid-column:1/-1">
        <div style="font-weight:700;margin-bottom:6px">Nothing here yet</div>
        <div class="muted">Click the heart icon on any product.</div>
      </div>
    `;
    return;
  }
  const items = wish.map(id => PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  grid.innerHTML = items.map(p => productCard(p)).join("");
  wireProductCardActions();
  enhanceLinksForSmoothTransition();
}

export function renderStatic(title, subtitle, blocks){
  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>${title}</h2>
            <p>${subtitle}</p>
          </div>
        </div>

        <div class="grid">
          ${blocks.map(b => `
            <div class="tile" style="grid-column: span 6; min-height:auto">
              <div class="bg"></div>
              <div class="t">
                <h3>${b.h}</h3>
                <p>${b.p}</p>
                ${b.a ? `<a class="btn" href="${b.a.href}" data-link>${b.a.text}</a>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </main>
  `;
  enhanceLinksForSmoothTransition();
}

/* ------- Cart & Wish helpers ------- */

function addToCart(id, qty){
  const cart = getCart();
  const idx = cart.findIndex(x=>x.id===id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id, qty });
  setCart(cart);
}

function toggleWish(id){
  const wish = getWish();
  const has = wish.includes(id);
  const next = has ? wish.filter(x=>x!==id) : [...wish, id];
  setWish(next);
  toast(has ? "Removed from wishlist." : "Added to wishlist.");
}

function toast(msg){
  let el = qs("#toast");
  if (!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "20px";
    el.style.transform = "translateX(-50%)";
    el.style.padding = "12px 14px";
    el.style.borderRadius = "16px";
    el.style.border = "1px solid rgba(255,255,255,0.12)";
    el.style.background = "rgba(12,15,20,0.72)";
    el.style.backdropFilter = "blur(12px)";
    el.style.boxShadow = "0 18px 60px rgba(0,0,0,.55)";
    el.style.color = "rgba(255,255,255,0.92)";
    el.style.zIndex = "80";
    el.style.opacity = "0";
    el.style.transition = "opacity .18s ease, transform .18s ease";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  el.style.transform = "translateX(-50%) translateY(-2px)";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(6px)";
  }, 1400);
}



export function renderCollections(){
  const page = qs("#page");
  page.innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>Collections</h2>
            <p>Browse by category — clean, fast, and refined.</p>
          </div>
          <a class="linkMuted" href="products.html" data-link>View all products →</a>
        </div>

        <div class="grid">
          ${COLLECTIONS.map(c => `
            <a class="tile" href="collection.html?category=${encodeURIComponent(c.category)}" data-link style="grid-column: span 6; min-height: 190px;">
              <div class="bg" style="background:
                radial-gradient(360px 220px at 30% 20%, rgba(192,138,75,.22), transparent 60%),
                radial-gradient(360px 220px at 85% 65%, rgba(227,177,113,.12), transparent 60%),
                url('${c.image}') center/cover no-repeat; opacity:.30;"></div>
              <div class="t">
                <div class="kicker" style="display:inline-flex">${c.subtitle}</div>
                <h3 style="margin-top:10px">${c.category}</h3>
                <p>Explore curated subcategories and featured items.</p>
                <div style="margin-top:12px" class="btn primary">Open collection →</div>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </main>
  `;
  enhanceLinksForSmoothTransition();
}

export function renderCollection(){
  const category = getQuery("category") || "Tea & Coffee";
  const subs = NAV[category] || [];

  const items = PRODUCTS.filter(p => p.category === category);

  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2><a class="linkMuted" href="collections.html" data-link>Collections</a> / ${category}</h2>
            <p>${subs.length ? `${subs.length} subcategories · ` : ""}${items.length} items</p>
          </div>
          <a class="linkMuted" href="products.html?category=${encodeURIComponent(category)}" data-link>Shop this category →</a>
        </div>

        <div class="toolbar">
          <div class="filters">
            <select class="select" id="subPick">
              <option value="All">All subcategories</option>
              ${subs.map(s => `<option value="${s}">${s}</option>`).join("")}
            </select>
            <select class="select" id="sortPick">
              <option value="featured">Sort: Featured</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
              <option value="nameAsc">Name: A → Z</option>
            </select>
          </div>
          <input class="search" id="q" placeholder="Search within collection…" />
        </div>

        <div class="productsGrid" id="grid"></div>
      </div>
    </main>
  `;

  const subPick = qs("#subPick");
  const sortPick = qs("#sortPick");
  const q = qs("#q");
  const grid = qs("#grid");

  function sortItems(arr, sort){
    const a = arr.slice();
    if (sort === "priceAsc") a.sort((x,y)=>x.price-y.price);
    if (sort === "priceDesc") a.sort((x,y)=>y.price-x.price);
    if (sort === "nameAsc") a.sort((x,y)=>x.name.localeCompare(y.name));
    return a;
  }

  function productCard(p){
    const compare = p.compareAt && p.compareAt > p.price ? `<span class="compare">${money(p.compareAt)}</span>` : "";
    const tags = p.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join("");
    return `
      <div class="cardP">
        <a class="thumb" href="product.html?id=${encodeURIComponent(p.id)}" data-link>
          <img src="${p.images[0]}" alt="${p.name}">
        </a>
        <div class="pBody">
          <div class="pTop">
            <div>
              <p class="pName">${p.name}</p>
              <div class="pMeta">${p.category} · ${p.subcategory}</div>
            </div>
            <button class="iconbtn" type="button" data-wish="${p.id}" aria-label="Add to wishlist">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.8 4.6c-1.6-1.8-4.1-1.9-5.8-.4L12 6.8 9 4.2c-1.7-1.5-4.2-1.4-5.8.4-1.8 2.1-1.6 5.2.4 7.1l8 7.3 8-7.3c2-1.9 2.2-5 .4-7.1z"/>
              </svg>
            </button>
          </div>
          <div class="priceRow">
            <span class="price">${money(p.price)}</span>
            ${compare}
          </div>
          <div class="pTags">${tags}</div>

          <div class="pActions">
            <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}" data-link>View</a>
            <button class="btn primary" type="button" data-add="${p.id}">Add to cart</button>
          </div>
        </div>
      </div>
    `;
  }

  function wireProductCardActions(){
    qsa("[data-add]").forEach(btn => {
      btn.addEventListener("click", () => {
        // reuse existing cart logic by dispatching custom event; simplest:
        const ev = new CustomEvent("sl:addToCart", { detail: { id: btn.getAttribute("data-add"), qty: 1 }});
        window.dispatchEvent(ev);
      });
    });
    qsa("[data-wish]").forEach(btn => {
      btn.addEventListener("click", () => {
        const ev = new CustomEvent("sl:toggleWish", { detail: { id: btn.getAttribute("data-wish") }});
        window.dispatchEvent(ev);
      });
    });
  }

  // Hook into existing cart/wish helpers from the original file
  // (we listen and call the internal helpers already defined in app.js)
  window.addEventListener("sl:addToCart", (e) => {
    // call existing internal function via click simulation: easiest is to navigate to product page? no.
    // We'll re-use the global functions by importing not possible here; instead, we rely on the original renderProducts helpers.
  }, { once: true });

  function apply(){
    const sub = subPick.value;
    const term = (q.value || "").trim().toLowerCase();
    const sort = sortPick.value;

    let filtered = items.slice();
    if (sub !== "All") filtered = filtered.filter(p => p.subcategory === sub);
    if (term) filtered = filtered.filter(p => (`${p.name} ${p.tags.join(" ")} ${p.subcategory}`.toLowerCase()).includes(term));
    filtered = sortItems(filtered, sort);

    grid.innerHTML = filtered.map(productCard).join("") || `
      <div class="panel" style="grid-column:1/-1">
        <div style="font-weight:700;margin-bottom:6px">No matches</div>
        <div class="muted">Try another subcategory or search term.</div>
      </div>
    `;
    wireProductCardActions();
    enhanceLinksForSmoothTransition();

    // Wire wishlist/cart using localStorage directly (clean + independent)
    qsa("[data-add]").forEach(btn => btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-add");
      const cart = JSON.parse(localStorage.getItem("sl_cart_v1") || "[]");
      const idx = cart.findIndex(x => x.id === id);
      if (idx >= 0) cart[idx].qty += 1; else cart.push({ id, qty: 1 });
      localStorage.setItem("sl_cart_v1", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage")); // update badges
    }));
    qsa("[data-wish]").forEach(btn => btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-wish");
      const wish = JSON.parse(localStorage.getItem("sl_wish_v1") || "[]");
      const has = wish.includes(id);
      const next = has ? wish.filter(x => x !== id) : [...wish, id];
      localStorage.setItem("sl_wish_v1", JSON.stringify(next));
      window.dispatchEvent(new Event("storage"));
    }));
  }

  subPick.addEventListener("change", apply);
  sortPick.addEventListener("change", apply);
  q.addEventListener("input", apply);

  apply();
}

export function renderStories(){
  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2>Stories</h2>
            <p>Editorial content with a premium grid.</p>
          </div>
          <a class="linkMuted" href="world.html" data-link>About the studio →</a>
        </div>

        <div class="cardsGrid">
          ${STORIES.map(s => `
            <a class="storyCard" href="story.html?id=${encodeURIComponent(s.id)}" data-link>
              <div class="storyCover"><img src="${s.cover}" alt=""></div>
              <div class="storyBody">
                <div class="storyMeta">
                  <span class="pill">${s.tag}</span>
                  <span>${s.date}</span>
                  <span>·</span>
                  <span>${s.readTime}</span>
                </div>
                <div class="storyTitle">${s.title}</div>
                <p class="storyExcerpt">${s.excerpt}</p>
                <div style="margin-top:12px" class="btn primary">Read story →</div>
              </div>
            </a>
          `).join("")}
        </div>
      </div>
    </main>
  `;
  enhanceLinksForSmoothTransition();
}

export function renderStory(){
  const id = getQuery("id") || STORIES[0].id;
  const s = STORIES.find(x => x.id === id) || STORIES[0];

  qs("#page").innerHTML = `
    <main class="page section">
      <div class="container">
        <div class="sectionHead">
          <div>
            <h2><a class="linkMuted" href="stories.html" data-link>Stories</a> / ${s.tag}</h2>
            <p>${s.date} · ${s.readTime}</p>
          </div>
          <a class="linkMuted" href="products.html" data-link>Shop products →</a>
        </div>

        <article class="article">
          <div class="articleHero"><img src="${s.cover}" alt=""></div>
          <div class="articleBody">
            <h1>${s.title}</h1>
            <div class="metaRow">
              <span class="pill">${s.tag}</span>
              <span>${s.date}</span>
              <span>·</span>
              <span>${s.readTime}</span>
            </div>
            <div class="content">
              ${s.content.map(p => `<p>${p}</p>`).join("")}
            </div>
            <div class="hr"></div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <a class="btn" href="stories.html" data-link>Back to Stories</a>
              <a class="btn primary" href="collections.html" data-link>Browse Collections →</a>
            </div>
          </div>
        </article>
      </div>
    </main>
  `;
  enhanceLinksForSmoothTransition();
}
























// ============ استيراد وتحسين نظام التقييمات ============
import { 
  renderStars, 
  renderReviews, 
  renderRecommendations,
  initEnhancedFeatures,
  initFAQSystem 
} from './enhanced.js';

// تحديث دالة renderProduct لإضافة التقييمات
const originalRenderProduct = renderProduct;
renderProduct = function() {
  originalRenderProduct();
  
  // إضافة التقييمات إلى صفحة المنتج
  const productId = getQuery("id");
  const reviewsHTML = renderReviews(productId);
  const recommendationsHTML = renderRecommendations(productId);
  
  // إضافة التقييمات بعد الوصف
  const panel = document.querySelector('.panel');
  if (panel) {
    const description = panel.querySelector('p.muted');
    if (description) {
      description.insertAdjacentHTML('afterend', reviewsHTML);
    }
  }
  
  // إضافة التوصيات بعد صفحة المنتج
  const page = document.querySelector('#page');
  if (page && recommendationsHTML) {
    page.insertAdjacentHTML('beforeend', recommendationsHTML);
  }
  
  // إضافة زر المقارنة وAR
  const qtyRow = document.querySelector('.qtyRow');
  if (qtyRow) {
    qtyRow.insertAdjacentHTML('beforeend', `
      <button class="btn" data-compare="${productId}" style="margin-left: auto;">🔄 Compare</button>
      <button class="btn" data-ar-view="${productId}">🕶️ AR View</button>
    `);
  }
};

// تحديث دالة renderProducts لإضافة التقييمات
const originalRenderProducts = renderProducts;
renderProducts = function() {
  originalRenderProducts();
  
  // إضافة التقييمات إلى بطاقات المنتج
  setTimeout(() => {
    document.querySelectorAll('.cardP').forEach(card => {
      const addButton = card.querySelector('[data-add]');
      if (addButton) {
        const productId = addButton.getAttribute('data-add');
        const avgRating = getAverageRating(productId);
        const reviews = getProductReviews(productId);
        
        if (avgRating > 0) {
          const ratingHTML = `
            <div style="margin: 8px 0; display: flex; align-items: center;">
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
  }, 100);
};

// تشغيل الميزات المحسنة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initEnhancedFeatures, 500);
});

// تحديث تابع toast الموجود ليستخدم النظام الجديد
const originalToast = toast;
window.showEnhancedToast = toast;
 // جعله متاحاً عالمياً

