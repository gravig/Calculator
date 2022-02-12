export default class Observable<T> {
  private watchers: Callback<T>[] = [];
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public watch = (callback: Callback<T>): void => {
    const { watchers } = this;
    if (watchers.includes(callback)) {
      return;
    }
    this.watchers = [...this.watchers, callback];
  };

  public unwatch = (callback: Callback<T>): void => {
    this.watchers = this.watchers.filter((watcher) => watcher !== callback);
  };

  public set = (newValue: T | Updater<T>): void => {
    if (this.value === newValue) {
      return;
    }

    if (typeof newValue === "function") {
      this.value = (newValue as Updater<T>)(this.value);
    } else {
      this.value = newValue;
    }

    this.notify(this.value);
  };

  public get = (): T => {
    return this.value;
  };

  public notify = (newValue: T) => {
    this.watchers.forEach((watcher) => {
      watcher(newValue);
    });
  };
}

type Callback<T> = (newValue: T) => void;
type Updater<T> = (previous: T) => T;
