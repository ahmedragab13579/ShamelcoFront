const fs = require('fs');
const path = require('path');

const arJson = require('d:/ProApp/ShamelcoFront/Shamelco/src/locales/ar.json');
const keys = Object.keys(arJson.messages);

const srcDir = 'd:/ProApp/ShamelcoFront/Shamelco/src';
const missingKeys = new Set();

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const regex = /t\(['"`]messages\.([A-Z0-9_]+)['"`]\)/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const key = match[1];
        if (!keys.includes(key)) {
          missingKeys.add(key);
        }
      }
    }
  }
}

scanDir(srcDir);
console.log('Missing translation keys:', Array.from(missingKeys));
