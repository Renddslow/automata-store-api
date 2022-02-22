declare namespace mannish {
  type Provider = (name: string, fn: Function) => () => void;
  type Callback<T> = (name: string, ...args: any[]) => T;

  interface Mannish {
    provide: Provider;
    call: Callback<any>;
  }
}
declare function mannish(): mannish.Mannish;

export = mannish;
