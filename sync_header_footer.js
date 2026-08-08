const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const legacyDir = path.join(__dirname, 'legacy');
const indexHtmlPath = path.join(publicDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("Could not find index.html");
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract the sticky-header-container from index.html
const headerMatch = indexHtml.match(/<div class="sticky-header-container">[\s\S]*?<\/div>\s*<main/);
if (!headerMatch) {
  console.error("Could not find header in index.html");
  process.exit(1);
}
// Strip the trailing <main
const headerContent = headerMatch[0].replace(/\s*<main$/, '');

// Extract the main-footer from index.html
const footerMatch = indexHtml.match(/<footer id="main-footer" class="main-footer">[\s\S]*?<\/footer>/);
if (!footerMatch) {
  console.error("Could not find footer in index.html");
  process.exit(1);
}
const footerContent = footerMatch[0];

// Files to update
const filesToUpdate = ['shop.html', 'collections.html', 'gifts.html', 'about.html', 'contact.html'];
const directories = [publicDir, legacyDir];

for (const dir of directories) {
  for (const file of filesToUpdate) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace header
    content = content.replace(/<div class="sticky-header-container">[\s\S]*?<\/div>\s*(?=<main)/, headerContent + '\n\n  ');
    
    // Replace footer
    content = content.replace(/<footer id="main-footer" class="main-footer">[\s\S]*?<\/footer>/, footerContent);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}
