declare module mannish {
  type Provider = (name: string, fn: Function) => () => void;
  type Callback<T> = (name: string, ...args: any[]) => T;
  const mannish: () => {
    provide: Provider;
    call: Callback<any>
  };
  module.exports = mannish;
}
