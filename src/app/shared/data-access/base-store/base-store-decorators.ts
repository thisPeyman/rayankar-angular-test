export function Cacheable(config: { storageKey: string }) {
  return function (ctr: any) {
    ctr.prototype.saveInStorage = true;
    ctr.prototype.storageKey = config.storageKey;
  };
}
