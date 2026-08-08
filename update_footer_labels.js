const fs = require('fs');
const path = require('path');

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

  if (content.includes('<strong>Address:</strong>')) {
    content = content.replace(/<strong>Atelier:<\/strong>/g, '<strong>Address:</strong>');
    changed = true;
  }

  if (content.includes('<strong>Email:</strong>')) {
    content = content.replace(/<strong>Client Relations:<\/strong>/g, '<strong>Email:</strong>');
    changed = true;
  }

  if (content.includes('chiminiofficial@gmail.com')) {
    content = content.replace(/chiminiofficial@gmail.com/g, 'chiminiofficial@gmail.com');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
});
