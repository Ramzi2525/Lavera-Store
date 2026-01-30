
// assets/js/router.js
export function qs(sel, root=document){ return root.querySelector(sel); }
export function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

export function money(n){
  const v = Number(n || 0);
  return v.toLocaleString("en-US", { style:"currency", currency:"USD" });
}

export function getQuery(key){
  const u = new URL(window.location.href);
  return u.searchParams.get(key);
}

/**
 * Smooth transitions between pages
 * - Adds a small fade-out before navigation
 */
export function enhanceLinksForSmoothTransition(){
  qsa("a[data-link]").forEach(a => {
    if (a.__wired) return;
    a.__wired = true;
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      e.preventDefault();
      document.body.style.transition = "opacity .18s ease, transform .18s ease";
      document.body.style.opacity = "0";
      document.body.style.transform = "translateY(6px)";
      setTimeout(()=> window.location.href = href, 170);
    });
  });
}






