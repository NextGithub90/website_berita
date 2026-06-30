const fs = require("fs");
const files = ["index.html", "detail.html", "category.html"];
files.forEach((f) => {
  const html = fs.readFileSync(f, "utf8");

  console.log("---", f, "---");

  const regex =
    /<h3[^>]*>(.*?)<\/h3>[\s\S]*?<a\s+href="([^"]+)"\s*(?:class="[^"]*")?\s*>Show More/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    console.log("Show More for H3:", m[1].trim());
    console.log("HREF:", m[2]);
  }
});
