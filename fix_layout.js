const fs = require("fs");
const files = [
  "ekonomi.html",
  "bisnis.html",
  "teknologi.html",
  "category.html",
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let lines = fs.readFileSync(file, "utf8").split("\n");

    let mainIndex = lines.findIndex((l) => l.includes('<main class="w-full">'));
    let properMainIndex = lines.findIndex((l) =>
      l.includes("<!-- ===== MAIN LAYOUT ===== -->"),
    );

    if (
      mainIndex !== -1 &&
      properMainIndex !== -1 &&
      properMainIndex > mainIndex
    ) {
      let headerPart = lines.slice(0, mainIndex);
      let correctBottomPart = lines.slice(properMainIndex);

      fs.writeFileSync(
        file,
        headerPart.join("\n") + "\n" + correctBottomPart.join("\n"),
      );
      console.log("Fixed " + file);
    } else {
      console.log(
        "Skipping " + file + " (already fixed or structure unexpected)",
      );
    }
  }
}
