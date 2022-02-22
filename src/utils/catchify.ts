const catchify = (cb: Promise<unknown>): Promise<[unknown | null, unknown | null]> =>
  Promise.resolve(cb).then(
    (d) => [null, d],
    (err) => [err, null],
  );

export default catchify;
