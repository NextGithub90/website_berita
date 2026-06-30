const fs = require("fs");
const files = [
  "index.html",
  "category.html",
  "ekonomi.html",
  "bisnis.html",
  "teknologi.html",
  "detail.html",
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    // Also adding /g just in case there are multiple
    content = content.replace(/category\.html\?type=Ekonomi/g, "ekonomi.html");
    content = content.replace(/category\.html\?type=Bisnis/g, "bisnis.html");
    content = content.replace(
      /category\.html\?type=Teknologi/g,
      "teknologi.html",
    );
    fs.writeFileSync(file, content);
    console.log("Updated " + file);
  }
}
