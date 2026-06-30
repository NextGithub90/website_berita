const fs = require("fs");

try {
  // 1. Create category.html
  const indexHtml = fs.readFileSync(
    "c:/Users/Lenovo/Desktop/produk/website_berita/index.html",
    "utf8",
  );
  const headerPart = indexHtml.split("<!-- ===== MAIN LAYOUT ===== -->")[0];
  const footerPart = indexHtml.split("<!-- Advanced Footer Design -->")[1];

  const categoryCore = `<!-- ===== MAIN LAYOUT ===== -->
    <main class="max-w-[1240px] mx-auto px-4 lg:px-6 py-8 lg:py-16 min-h-[60vh]">
      <!-- Title Section -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-gray-200 pb-5">
        <h1 id="category-title" class="text-[34px] md:text-[50px] font-extrabold font-head text-[#1B3A7A] capitalize tracking-tight leading-none text-left">
            Kategori
        </h1>
        <button class="border border-gray-200 text-gray-600 px-4 py-1.5 text-[13px] font-bold rounded-full hover:bg-gray-50 flex items-center gap-1.5 transition-colors shadow-sm self-start md:self-auto">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg> Follow
        </button>
      </div>

      <!-- Card Grid -->
      <div id="category-list-container" class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 gap-y-12">
        <!-- Injections here -->
      </div>
      
      <div id="category-empty" class="hidden text-center py-24 text-gray-500 font-medium">
        <div class="text-6xl mb-4">📭</div>
        <h2 class="text-2xl font-extrabold text-slate-800 mb-2">Belum ada berita</h2>
        <p>Berita untuk kategori ini sedang disiapkan atau tidak ditemukan.</p>
      </div>
    </main>
    <!-- Advanced Footer Design -->
    ${footerPart}`;

  fs.writeFileSync(
    "c:/Users/Lenovo/Desktop/produk/website_berita/category.html",
    headerPart + categoryCore,
  );

  // 2. Update Navbars in all HTML files
  const targets = [
    "c:/Users/Lenovo/Desktop/produk/website_berita/index.html",
    "c:/Users/Lenovo/Desktop/produk/website_berita/detail.html",
    "c:/Users/Lenovo/Desktop/produk/website_berita/category.html",
  ];

  function replaceHref(html, keyword) {
    // Megamenu Link
    let regex1 = new RegExp(
      `(<!-- ${keyword.toUpperCase()} Megamenu -->[\\s\\S]*?<a\\s+)href="#"`,
      "gi",
    );
    html = html.replace(regex1, `$1href="category.html?type=${keyword}"`);

    // Show More Text inside Megamenu (handles both Economy and Ekonomi matching)
    if (keyword === "Ekonomi") {
      html = html.replace(
        /(Economy\s*<\/h3>\s*<a\s+)href="#"/g,
        `$1href="category.html?type=Ekonomi"`,
      );
    } else {
      let regex2 = new RegExp(
        `(${keyword}\\s*<\\/h3>\\s*<a\\s+)href="#"`,
        "gi",
      );
      html = html.replace(regex2, `$1href="category.html?type=${keyword}"`);
    }

    // Quick Links Pill
    let regex3 = new RegExp(
      `<a href="#" class="quick-links-pill">${keyword}<\\/a>`,
      "g",
    );
    html = html.replace(
      regex3,
      `<a href="category.html?type=${keyword}" class="quick-links-pill">${keyword}</a>`,
    );

    // Mobile Sidebar items
    let regex4 = new RegExp(
      `(<a\\s+)href="#"([\\s\\S]*?${keyword}\\s*<svg)`,
      "g",
    );
    html = html.replace(regex4, `$1href="category.html?type=${keyword}"$2`);

    // Change the word "Economy" to "Ekonomi" in megamenu header (if exists)
    if (keyword === "Ekonomi") {
      html = html.replace(
        /<h3 class="text-white font-head font-bold text-xl">\s*Economy\s*<\/h3>/g,
        '<h3 class="text-white font-head font-bold text-xl">\n                    Ekonomi\n                  </h3>',
      );
    }

    return html;
  }

  targets.forEach((file) => {
    let content = fs.readFileSync(file, "utf8");
    content = replaceHref(content, "Ekonomi");
    content = replaceHref(content, "Bisnis");
    content = replaceHref(content, "Teknologi");

    // Ensure "Economy" in Megamenu is fully replaced to "Ekonomi" if missed by regex
    content = content.replace(/Economy\b/gi, (match) => {
      // we only want to replace it in the menu HTML visually, but it's okay to replace generally if safe.
      // Let's just be specific in replaceHref.
      return match;
    });

    fs.writeFileSync(file, content);
  });

  // 3. Update articles.js
  let artJs = fs.readFileSync(
    "c:/Users/Lenovo/Desktop/produk/website_berita/data/articles.js",
    "utf8",
  );

  // Modify ID 11 and 12 to be 'BISNIS'
  const target11 = "id: 11,";
  const target12 = "id: 12,";

  function replaceCategory(text, idTarget, newCat) {
    const startIdx = text.indexOf(idTarget);
    if (startIdx !== -1) {
      const catIdx = text.indexOf('category: "', startIdx);
      if (catIdx !== -1) {
        const endQuote = text.indexOf('"', catIdx + 11);
        text =
          text.substring(0, catIdx + 11) + newCat + text.substring(endQuote);
      }
    }
    return text;
  }
  artJs = replaceCategory(artJs, target11, "BISNIS");
  artJs = replaceCategory(artJs, target12, "BISNIS");

  fs.writeFileSync(
    "c:/Users/Lenovo/Desktop/produk/website_berita/data/articles.js",
    artJs,
  );
  console.log("SUCCESS");
} catch (err) {
  console.error(err);
}
