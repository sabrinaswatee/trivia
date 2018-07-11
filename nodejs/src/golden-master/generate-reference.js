const fs = require('fs');
const path = require('path');
const run = require('./run');
const seeds = require('./random-seeds');

const fileName = (seed) => path.join(__dirname, 'reference', `output-${seed}.txt`);

seeds.forEach((seed) => {
  const output = run(seed);
  fs.writeFileSync(fileName(seed), output);
});
