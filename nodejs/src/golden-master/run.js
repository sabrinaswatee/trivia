const fakeRandom = require('./fake-random');

const captureStdOut = (fn) => {
  const logs = [];
  const oldWrite = process.stdout.write;
  process.stdout.write = (string) => {
    logs.push(string);
  }
  fn();
  process.stdout.write = oldWrite;
  return logs.join('');
};

const run = (seed) => {
  const stdOut = captureStdOut(() => {
    const _originalRandom = Math.random;
    Math.random = fakeRandom(seed);
    delete require.cache[require.resolve('../game')]
    require('../game');
    Math.random = _originalRandom;
  });
  return stdOut;
};

module.exports = run;
