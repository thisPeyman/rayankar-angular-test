import { Inject, Injectable, Optional } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, tap } from 'rxjs';

@Injectable()
export class BaseStore<T extends object> extends ComponentStore<T> {
  constructor(@Optional() @Inject('') defaultState?: T | undefined) {
    super(defaultState);

    if ((this as any).saveInStorage) {
      const cachedData = this.cachedState;
      cachedData && this.setState(cachedData);

      this.observeStateAndSaveToStorage();
    }
  }

  observeStateAndSaveToStorage = this.effect((trigger$) => {
    return combineLatest([trigger$, this.state$]).pipe(
      tap(([, v]) => {
        localStorage.setItem((this as any).storageKey, JSON.stringify(v));
      })
    );
  });

  get cachedState(): T | null {
    const cachedDataInStorage = localStorage.getItem((this as any).storageKey);
    return cachedDataInStorage ? JSON.parse(cachedDataInStorage) : null;
  }
}
