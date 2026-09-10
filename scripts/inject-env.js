const fs = require('fs');
const path = require('path');

const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  console.error('❌ API_BASE_URL não definida. Ex: API_BASE_URL=https://sua-api.com node scripts/inject-env.js');
  process.exit(1);
}

const indexPath = path.resolve(__dirname, '../index.html');
const content = fs.readFileSync(indexPath, 'utf8');
const updated = content.replace('%%API_BASE_URL%%', apiBaseUrl);
fs.writeFileSync(indexPath, updated, 'utf8');

console.log(`✅ API_BASE_URL injetada: ${apiBaseUrl}`);
