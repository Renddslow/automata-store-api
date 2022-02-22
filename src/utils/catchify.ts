const catchify = <T>(cb: Promise<unknown>): Promise<[unknown | null, T | null]> =>
  Promise.resolve(cb).then(
    (d: T) => [null, d],
    (err) => [err, null],
  );

export default catchify;
