const should = require('should/as-function');
const run = require('./golden-master/run');
const seeds = require('./golden-master/random-seeds');
const path = require('path');
const fs = require('fs');

const fileName = (seed) => path.join(__dirname, 'golden-master', 'reference', `output-${seed}.txt`);

const example = (seed) => {
  it(`should pass for seed ${seed}`, () => {
    const buffer = fs.readFileSync(fileName(seed));
    const expected = buffer.toString();
    const actual = run(seed);
    should(actual).equal(expected);
  });
};

describe("GoldenMaster", () => {
  seeds.forEach(example);
});
