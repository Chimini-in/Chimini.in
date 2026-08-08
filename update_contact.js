const fs = require('fs');
const path = require('path');

const newSocialIcons = `        <div class="social-icons">
          <a href="https://www.instagram.com/chimini.in" aria-label="Instagram (Main)" target="_blank" rel="noopener noreferrer">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.instagram.com/archi_giftz" aria-label="Instagram (Gifts)" target="_blank" rel="noopener noreferrer">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61592027116216" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCCsXvNjGAO36DoqWooxEPpA" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
        </div>`;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.next') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.jsx')) {
        callback(dirPath);
      }
    }
  });
}

walkDir(__dirname, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace address
  if (content.includes('Mangalore, Karnataka')) {
    content = content.replace(/Mangalore, Karnataka/g, 'Mangalore, Karnataka');
    changed = true;
  }
  
  // Replace phone
  if (content.includes('+91 97418 55293, +91 96320 90645')) {
    content = content.replace(/\+33 \(0\) 1 45 67 89 00/g, '+91 97418 55293, +91 96320 90645');
    changed = true;
  }
  
  // Replace 'Mangalore atelier' with 'Mangalore atelier'
  if (content.includes('Mangalore atelier')) {
    content = content.replace(/Mangalore atelier/g, 'Mangalore atelier');
    changed = true;
  }

  // Replace social icons block
  const oldSocialIconsRegex = /<div class="social-icons">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Column 2: Quick Links -->/g;
  if (oldSocialIconsRegex.test(content)) {
    content = content.replace(/<div class="social-icons">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Column 2: Quick Links -->/g, newSocialIcons + '\n      </div>\n\n      <!-- Column 2: Quick Links -->');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
});
