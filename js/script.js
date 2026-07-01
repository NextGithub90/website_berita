document.addEventListener("DOMContentLoaded", () => {
  // Highlight active menu item based on current page
  const currentPagePath =
    window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("header nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && href.includes(currentPagePath)) {
      link.classList.add("bg-[#050714]", "text-white");
      link.classList.remove(
        "hover:text-[#C9A227]",
        "text-[#1B3A7A]",
        "hover:bg-[#050714]",
        "hover:text-white",
      );
    }
  });

  document.querySelectorAll("#mobile-menu-content a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && href.includes(currentPagePath)) {
      link.classList.add("text-foxizRed");
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuContent = document.getElementById("mobile-menu-content");

  function toggleMenu() {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      setTimeout(() => {
        mobileMenu.classList.remove("opacity-0");
        if (mobileMenuContent)
          mobileMenuContent.classList.remove("-translate-x-full");
      }, 10);
      document.body.style.overflow = "hidden";
    } else {
      mobileMenu.classList.add("opacity-0");
      if (mobileMenuContent)
        mobileMenuContent.classList.add("-translate-x-full");
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        document.body.style.overflow = "";
      }, 300);
    }
  }

  if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", toggleMenu);
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) toggleMenu();
    });
  }

  if (typeof articles === "undefined") return;

  // Helper: Create HTML specifically matching Foxiz 3-column Hero and standard cards
  function createCardHTML(article, layout = "grid") {
    if (layout === "hero-main") {
      return `
                <a href="detail.html?id=${article.id}" class="group block w-full relative h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-sm">
                    <img src="${article.image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 card-gradient"></div>
                    <div class="absolute bottom-0 left-0 p-8 w-full z-10">
                        <span class="inline-block bg-foxizRed text-white text-[11px] font-extrabold px-3 py-1 uppercase tracking-wider mb-4 rounded-sm shadow-md">${article.category}</span>
                        <h2 class="text-white text-3xl md:text-5xl font-extrabold font-head leading-tight mb-4 group-hover:text-foxizGold transition-colors drop-shadow-md">${article.title}</h2>
                        <div class="flex items-center text-gray-200 text-sm font-semibold tracking-wide">
                            <span class="text-foxizGold uppercase">${article.author}</span>
                            <span class="mx-3 opacity-50">/</span>
                            <span>${article.date}</span>
                        </div>
                    </div>
                </a>
            `;
    } else if (layout === "hero-side") {
      return `
                <a href="detail.html?id=${article.id}" class="group block mb-6">
                    <div class="w-full aspect-[4/3] rounded-md overflow-hidden mb-4 relative">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="flex flex-col">
                        <div class="flex items-center mb-2">
                            <span class="text-foxizRed text-[11px] font-extrabold uppercase tracking-wider">${article.category}</span>
                            <span class="mx-2 text-gray-300">|</span>
                            <span class="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">${article.date}</span>
                        </div>
                        <h3 class="text-xl font-extrabold font-head leading-snug text-slate-900 group-hover:text-foxizBlue transition-colors mb-2 line-clamp-3 tracking-tight">${article.title}</h3>
                    </div>
                </a>
            `;
    } else if (layout === "most-read") {
      return `
                <a href="detail.html?id=${article.id}" class="flex gap-4 group items-start py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div class="w-8 h-8 rounded-full bg-foxizRed text-white flex-shrink-0 flex items-center justify-center font-extrabold font-head text-lg shadow-sm">
                        ${article._indexCounter}
                    </div>
                    <div class="flex-1">
                        <h4 class="font-extrabold font-head text-slate-800 leading-snug text-[15px] group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-3">${article.title}</h4>
                        <div class="mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">${article.date}</div>
                    </div>
                    <div class="w-[80px] h-[60px] rounded overflow-hidden flex-shrink-0 shadow-sm">
                         <img src="${article.image}" alt="thumb" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                    </div>
                </a>
            `;
    } else if (layout === "grid") {
      return `
                <a href="detail.html?id=${article.id}" class="group block">
                    <div class="w-full aspect-[4/3] rounded-md overflow-hidden mb-4 relative shadow-sm">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="flex flex-col">
                        <span class="text-foxizRed text-[11px] font-extrabold uppercase tracking-wider mb-2 block">${article.category}</span>
                        <h3 class="text-lg font-extrabold font-head leading-snug text-slate-900 group-hover:text-foxizBlue transition-colors mb-2 tracking-tight line-clamp-2">${article.title}</h3>
                        <p class="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">${article.date}</p>
                    </div>
                </a>
            `;
    } else if (layout === "horizontal-list") {
      return `
                <a href="detail.html?id=${article.id}" class="flex gap-5 group items-start pb-5 border-b border-gray-100 last:border-0">
                    <div class="w-32 aspect-square rounded-md overflow-hidden shadow-sm flex-shrink-0">
                         <img src="${article.image}" alt="thumb" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-1">
                        <span class="text-foxizRed text-[10px] font-extrabold uppercase tracking-wider mb-2 block">${article.category}</span>
                        <h4 class="font-extrabold font-head text-slate-800 leading-snug text-lg group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-2 mb-2">${article.title}</h4>
                        <p class="text-[11px] text-gray-500 font-bold uppercase tracking-widest">${article.date}</p>
                    </div>
                </a>
            `;
    } else if (layout === "economy") {
      return `
                <a href="detail.html?id=${article.id}" class="group block w-72 flex-shrink-0 bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div class="w-full h-44 overflow-hidden relative">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-5">
                        <span class="text-foxizRed text-[10px] font-extrabold uppercase tracking-wider mb-2 block">${article.category}</span>
                        <h3 class="font-extrabold font-head leading-snug text-slate-800 group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-3 mb-3">${article.title}</h3>
                        <p class="text-[11px] text-gray-500 font-bold uppercase tracking-widest">${article.date}</p>
                    </div>
                </a>
            `;
    } else if (layout === "dark-grid") {
      return `
                <a href="detail.html?id=${article.id}" class="group flex flex-col md:flex-row gap-5 items-start">
                    <div class="w-full md:w-32 aspect-[4/3] rounded overflow-hidden flex-shrink-0">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-1">
                        <span class="text-foxizGold text-[10px] font-extrabold uppercase tracking-wider mb-2 block">${article.category}</span>
                        <h4 class="font-extrabold font-head text-white leading-snug text-lg group-hover:text-foxizGold transition-colors tracking-tight line-clamp-2 mb-2">${article.title}</h4>
                        <p class="text-[11px] text-gray-400 font-bold uppercase tracking-wider">${article.date}</p>
                    </div>
                </a>
            `;
    } else if (layout === "just-in-overlay") {
      return `
                <a href="detail.html?id=${article.id}" class="group block w-full relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src="${article.image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full z-10 flex flex-col justify-end">
                        <span class="inline-block text-foxizGold text-[11px] font-extrabold uppercase tracking-wider mb-2 drop-shadow">${article.category}</span>
                        <h3 class="text-white text-lg lg:text-xl font-extrabold font-head leading-snug group-hover:text-foxizGold transition-colors drop-shadow-md tracking-tight line-clamp-2">${article.title}</h3>
                    </div>
                </a>
            `;
    } else if (layout === "just-in-full") {
      return `
                <a href="detail.html?id=${article.id}" class="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center group mb-2">
                    <div class="w-full lg:w-[55%] aspect-[16/10] rounded-lg overflow-hidden shadow-sm relative">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="w-full lg:w-[45%] flex flex-col py-2 lg:py-6 lg:pr-8">
                        <div class="flex items-center mb-4">
                            <span class="text-foxizRed text-[12px] font-extrabold uppercase tracking-widest">${article.category}</span>
                            <span class="mx-2.5 text-gray-300">|</span>
                            <span class="text-[12px] text-gray-500 font-bold tracking-widest">${article.date}</span>
                        </div>
                        <h2 class="text-3xl lg:text-[40px] font-extrabold font-head leading-tight text-slate-900 group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-3 mb-5">${article.title}</h2>
                        <p class="text-gray-500 font-medium text-sm lg:text-[15px] leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                            FORES (Forum Strategis Pembangunan Sosial) berkomitmen untuk terus menghadirkan analisis mendalam mengenai dinamika inovasi.
                        </p>
                    </div>
                </a>
            `;
    } else if (layout === "what-to-read-main") {
      return `
                <a href="detail.html?id=${article.id}" class="group block w-full relative h-[450px] lg:h-full lg:min-h-[530px] rounded-lg overflow-hidden shadow-sm">
                    <img src="${article.image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 card-gradient"></div>
                    <div class="absolute bottom-0 left-0 p-8 w-full z-10">
                        <span class="inline-block bg-foxizRed text-white text-[11px] font-extrabold px-3 py-1 uppercase tracking-wider mb-4 rounded-sm shadow-md">${article.category}</span>
                        <h2 class="text-white text-3xl md:text-5xl font-extrabold font-head leading-tight mb-4 group-hover:text-foxizGold transition-colors drop-shadow-md tracking-tight">${article.title}</h2>
                        <div class="flex items-center text-gray-200 text-sm font-semibold tracking-wide">
                            <span class="text-foxizGold uppercase">${article.author}</span>
                            <span class="mx-3 opacity-50">/</span>
                            <span>${article.date}</span>
                        </div>
                    </div>
                </a>
            `;
    } else if (layout === "business-top") {
      return `
                <a href="detail.html?id=${article.id}" class="flex flex-col lg:flex-row gap-5 lg:gap-6 group items-start lg:items-center">
                    <div class="w-full lg:w-[45%] aspect-[16/10] rounded-lg overflow-hidden flex-shrink-0 relative shadow-sm border border-gray-100">
                         <img src="${article.image}" alt="thumb" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="w-full lg:w-[55%] flex flex-col py-1">
                        <div class="flex items-center mb-2 lg:mb-3 justify-between pr-2">
                            <span class="text-foxizRed text-[11px] font-extrabold uppercase tracking-widest">${article.category} <span class="mx-1.5 text-gray-300">|</span> <span class="text-gray-500 font-bold">${article.date}</span></span>
                            <span class="text-gray-400 group-hover:text-foxizBlue transition-colors"><svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg></span>
                        </div>
                        <h4 class="font-extrabold font-head text-slate-900 leading-snug text-[22px] lg:text-[28px] group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-3 mb-2">${article.title}</h4>
                    </div>
                </a>
            `;
    } else if (layout === "business-bottom") {
      return `
                <a href="detail.html?id=${article.id}" class="flex gap-4 lg:gap-5 group items-center">
                    <div class="w-[72px] h-[72px] md:w-[94px] md:h-[94px] rounded-full overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                         <img src="${article.image}" alt="thumb" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="flex-1 min-w-0 pr-2">
                        <h4 class="font-extrabold font-head text-slate-900 leading-snug text-[15px] lg:text-[17px] group-hover:text-foxizBlue transition-colors tracking-tight line-clamp-3 mb-2.5">${article.title}</h4>
                        <div class="flex items-center justify-between">
                           <span class="text-foxizRed text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest block">${article.category}</span>
                           <span class="text-gray-300 group-hover:text-foxizBlue transition-colors flex-shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg></span>
                        </div>
                    </div>
                </a>
            `;
    } else if (layout === "category-list-card") {
      return `
                <a href="detail.html?id=${article.id}" class="flex flex-col lg:flex-row gap-5 lg:gap-8 group items-start lg:items-center relative">
                    <div class="w-full lg:w-[45%] aspect-[16/10] lg:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 relative shadow-sm border border-gray-100">
                         <img src="${article.image}" alt="${article.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="w-full lg:w-[55%] flex flex-col py-2 lg:pr-2 block h-full">
                        <div class="flex items-center mb-3 pr-2 lg:absolute lg:top-2 lg:right-2 z-10 w-full lg:w-auto justify-between lg:justify-end">
                            <span class="text-foxizRed text-[11px] font-extrabold uppercase tracking-widest lg:hidden block">${article.category}</span>
                            <span class="text-gray-300 group-hover:text-foxizRed transition-colors">
                              <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                            </span>
                        </div>
                        <span class="text-foxizRed text-[11px] font-extrabold uppercase tracking-widest hidden lg:block mb-2 pt-1">${article.category}</span>
                        <div class="flex items-center text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-3 gap-2">
                            <span>${article.date}</span>
                        </div>
                        <h4 class="font-extrabold font-head text-slate-900 leading-[1.35] text-[20px] lg:text-[25px] group-hover:text-[#1B3A7A] transition-colors tracking-tight line-clamp-3 mb-3">${article.title}</h4>
                    </div>
                </a>
            `;
    }
  }

  // --- Render Hero Section ---
  const heroLeft = document.getElementById("hero-left");
  const heroCenter = document.getElementById("hero-center");
  const mostReadCont = document.getElementById("most-read-container");

  if (heroLeft && heroCenter && mostReadCont) {
    let htmlLeft = "";
    const a1 = getArticleById(4);
    const a2 = getArticleById(5);

    if (a1) htmlLeft += createCardHTML(a1, "hero-side");
    if (a2) htmlLeft += createCardHTML(a2, "hero-side");

    heroLeft.innerHTML = htmlLeft;

    let htmlCenter = "";
    const aCenter = getArticleById(1);
    const aC1 = getArticleById(13); // Added 1 article underneath main

    if (aCenter) {
      htmlCenter += createCardHTML(aCenter, "hero-main");
    }
    if (aC1) {
      htmlCenter +=
        `<div class="mt-6">` +
        createCardHTML(aC1, "horizontal-list") +
        `</div>`;
    }
    heroCenter.innerHTML = htmlCenter;

    const mostReadIds = [11, 2, 8, 14, 15];
    let htmlMost = "";
    mostReadIds.forEach((id, index) => {
      const article = getArticleById(id);
      if (article) {
        article._indexCounter = index + 1;
        htmlMost += createCardHTML(article, "most-read");
      }
    });
    mostReadCont.innerHTML = htmlMost;
  }

  // --- Render Featured ---
  const featuredCont = document.getElementById("featured-container");
  if (featuredCont) {
    const featuredIds = [3, 6, 12, 13]; // Just 4 for the grid top row
    let html = "";
    featuredIds.forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "grid");
    });
    featuredCont.innerHTML = html;
  }

  // --- Render Just In ---
  const justInHero = document.getElementById("just-in-hero");
  if (justInHero) {
    const article = getArticleById(7);
    if (article) justInHero.innerHTML = createCardHTML(article, "just-in-full");
  }
  const justInGrid = document.getElementById("just-in-grid");
  if (justInGrid) {
    const ids = [8, 9, 16]; // Removed 10
    let html = "";
    ids.forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "just-in-overlay");
    });
    justInGrid.innerHTML = html;
  }

  // --- Render Tech and Biz ---
  const techCont = document.getElementById("tech-container");
  if (techCont) {
    const ids = [5, 9, 10];
    let html = "";
    ids.forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "horizontal-list");
    });
    techCont.innerHTML = html;
  }
  const bizCont = document.getElementById("business-container");
  if (bizCont) {
    const ids = [11, 4, 13];
    let html = "";
    ids.forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "horizontal-list");
    });
    bizCont.innerHTML = html;
  }

  // --- Render What to Read ---
  const readCont = document.getElementById("what-to-read-container");
  if (readCont) {
    let html = "";
    const main = getArticleById(14);
    if (main)
      html += `<div class="lg:w-1/2 flex flex-col">${createCardHTML(main, "what-to-read-main")}</div>`;

    html += `<div class="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">`;
    [15, 1, 2, 3].forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "grid");
    });
    html += `</div>`;
    readCont.innerHTML = html;
  }

  // --- Render Economy ---
  const econCont = document.getElementById("economy-container");
  if (econCont) {
    let html = "";
    const ids = [11, 12, 13, 14, 4, 1, 2]; // Give enough items to scroll horizontally
    ids.forEach((id) => {
      const article = getArticleById(id);
      if (article) html += createCardHTML(article, "economy");
    });
    econCont.innerHTML = html;
  }

  // --- Render Business Focus ---
  const bizFocusTop = document.getElementById("business-focus-top");
  const bizFocusBottom = document.getElementById("business-focus-bottom");
  if (bizFocusTop && bizFocusBottom) {
    const topIds = [15, 6];
    let htmlTop = "";
    topIds.forEach((id) => {
      const article = getArticleById(id);
      if (article) htmlTop += createCardHTML(article, "business-top");
    });
    bizFocusTop.innerHTML = htmlTop;

    const bottomIds = [9, 10, 8];
    let htmlBottom = "";
    bottomIds.forEach((id) => {
      const article = getArticleById(id);
      if (article) htmlBottom += createCardHTML(article, "business-bottom");
    });
    bizFocusBottom.innerHTML = htmlBottom;
  }

  // --- Render More News ---
  const moreCont = document.getElementById("more-news-container");
  if (moreCont) {
    let html = "";
    const latestInfo = articles.slice(0, 9); // dark-grid uses slice
    latestInfo.forEach((article) => {
      html += createCardHTML(article, "dark-grid");
    });
    moreCont.innerHTML = html;
  }

  // --- Render Category Page ---
  const catTitle = document.getElementById("category-title");
  const catList = document.getElementById("category-list-container");
  const catEmpty = document.getElementById("category-empty");

  if (catTitle && catList && catEmpty) {
    const urlParams = new URLSearchParams(window.location.search);
    let categoryQuery = urlParams.get("type");

    if (!categoryQuery) {
      if (window.location.pathname.includes("ekonomi.html"))
        categoryQuery = "Ekonomi";
      else if (window.location.pathname.includes("bisnis.html"))
        categoryQuery = "Bisnis";
      else if (window.location.pathname.includes("teknologi.html"))
        categoryQuery = "Teknologi";
    }

    if (categoryQuery) {
      const displayTitle = decodeURIComponent(categoryQuery).replace(/-/g, " ");
      catTitle.textContent = displayTitle;
      document.title = "FORES - Kategori " + displayTitle;

      const searchTarget = categoryQuery.toLowerCase();

      const filteredArticles = articles.filter(
        (a) =>
          a.category.toLowerCase().includes(searchTarget) ||
          (a.tags &&
            a.tags.some((t) => t.toLowerCase().includes(searchTarget))),
      );

      if (filteredArticles.length > 0) {
        let html = "";
        filteredArticles.forEach((article) => {
          html += createCardHTML(article, "category-list-card");
        });
        catList.innerHTML = html;
      } else {
        catEmpty.classList.remove("hidden");
      }
    } else {
      catTitle.textContent = "Semua Berita";
      let html = "";
      articles.forEach((article) => {
        html += createCardHTML(article, "category-list-card");
      });
      catList.innerHTML = html;
    }
  }
});
