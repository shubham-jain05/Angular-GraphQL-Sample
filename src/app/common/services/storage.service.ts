import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setValueInLocalStorage(key: string, value: any) {
    let appendKey = 'admin.'.concat(key);
    let stringValue = JSON.stringify(value);
    localStorage.setItem(appendKey, stringValue);
  }

  getValueFromLocalStorage(key: string) {
    let appendKey: string = 'admin.'.concat(key);
    let parseValue = JSON.parse(localStorage.getItem(appendKey) as string);
    return parseValue;
  }

  setValueInSessionStorage(key: string, value: any) {
    let appendKey = 'admin.'.concat(key);
    let stringValue = JSON.stringify(value);
    sessionStorage.setItem(appendKey, stringValue);
  }

  getValueFromSessionStorage(key: string) {
    let appendKey = 'admin.'.concat(key);
    let parseValue = JSON.parse(sessionStorage.getItem(appendKey)  as string );
    return parseValue;
  }

  clearAllValueFromStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }

  clearValueFromLocalStorage(key: string) {
    let originKey = 'admin.'.concat(key);
    localStorage.removeItem(originKey);
  }

  clearValueFromSessionStorage(key: string) {
    let originKey = 'admin.'.concat(key);
    sessionStorage.removeItem(originKey);
  }
}
