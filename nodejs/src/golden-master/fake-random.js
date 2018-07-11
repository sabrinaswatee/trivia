module.exports = (seed) => {
  let v = seed;
  return () => {
    v = v + 0.01;
    if (v >= 1.0) {
      v = 0.0;
    }
    return v;
  };
};
