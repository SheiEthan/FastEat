import 'pinia-plugin-persistedstate'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | {
      key?: string;
      storage?: Storage;
      paths?: string[];
    };
  }
}