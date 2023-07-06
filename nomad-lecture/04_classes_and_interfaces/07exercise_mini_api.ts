/**
 * dont use <T,V> inner {}.
 * when declaring interface and class,
 *  use ; to seperate the statement 
 * 
 */

interface LocalStorageAPI<T, V> {

  setItem(key: T, value: V): void;
  getItem(key: T): V | null;
  clearItem(key: T): void;
  clear(): void;
}


class LocalStorage<T, V> implements LocalStorageAPI<T, V> {
  private storage:{[key:string]: V};

  constructor() {
    this.storage = {};
  }

  setItem(key: T, value: V){
    this.storage[String(key)] = value;
  }

  getItem(key: T): V {
    return this.storage[String(key)];
  }

  clearItem(key: T){
    delete this.storage[String(key)];
  }

  clear(){
    this.storage = {};
  }
}


interface GeolocationAPI {
  getCurrentPosition(
        successFn: PositionCallback,
        errorFn?: PositionErrorCallback,
        optionsObj?: PositionOptions
        ): void;
  
  watchPosition(
        successFn: PositionCallback,
        errorFn?: PositionErrorCallback,
        optionsObj?: PositionOptions
        ): number;
        
  clearWatch(watchId: number): void;
}