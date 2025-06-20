const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, '..', 'node_modules', '.bin', 'tsx');
if (!fs.existsSync(tsxPath)) {
  console.error('Dependency "tsx" is missing. Run `npm ci` before running tests.');
  process.exit(1);
}
