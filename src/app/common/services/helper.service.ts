import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from "moment";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private router:  Router) { }

  
  public redirectTO(type: string , path: string){
    this.router.navigate(['/authentication/'.concat(path)]);
  }

  getRandomAlphanumericString(length: number): string {
    return this.randomString(
      length,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );
  }

  getStrongPassword(length: number): string {
    return this.randomString(
      length,
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}:"<>?|[];\',./`~'
    );
  }

  randomString(length: number, chars: string): string {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  getCloned(input: any): any {
    const cloned = JSON.parse(JSON.stringify(input));
    return cloned;
  }

  convertEnumToSelectOptions(definition: any) {
    return Object.keys(definition).map((key) => ({
      value: definition[key],
      label: key,
    }));
  }

  convertEnumToArray(definition: any): Array<any> {
    return Object.keys(definition).map((key) => definition[key]);
  }

  getNestedObject(nestedObj: any, pathArr: any) {
    return pathArr.reduce(
      (obj: any, key: any) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
      nestedObj
    );
  }

  getDateSet(date: any) {
    let Date = moment(date).toDate();
    return Date.toDateString();
  }

  setDateTimeFormat(date: any) {
    let Date = moment(date).format('YYYY-MM-DD[T]HH:mm:ss');
    return Date;
  }

  setDateFormat(date: any) {
    let Date = moment(date).format('YYYY-MM-DD');
    return Date;
  }

  handlErrorResponse(error: any) {
    if (!!error) {
      if (error.Errors !== undefined && error.Errors.length > 0) {
        _.each(error.Errors, (x) => {
          alert(x.message);
        });
      } else if (error.message !== undefined && error.message !== '') {
        alert(error.message);
      }
    } else {
      alert('System Error Occured Please contact our support team');
    }
  }

  commaSepratedNumber(num: any) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }

  create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  convertLocalTime(date: any) {
    let localTime = moment(date).local().format('hh:mm a');
    return localTime;
  }

  convertParseLocalTime(date: any) {
    let jsonPasrse = JSON.parse(date);
    let localTime = moment(jsonPasrse.start)
      //.local()
      .format('hh:mm a');
    return localTime;
  }

  copyToClipboard(Url: string) {
    if (!!Url) {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = Url;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      alert('copied to clipboard!');
    } else {
      alert('No Data Found');
    }
  }

  checkAlpha(event: any) {
    const pattern = /^[a-z,A-Z,0-9]{0,10}$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  checkNum(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String?.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event?.preventDefault();
    }
  }

  checkString(event: any) {
    const pattern = /^[a-z,A-Z, /\s]{0,25}$/;
    const inputChar = String?.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event?.preventDefault();
    }
  }

  getOS() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

  getBrowserLanguage() {
    let userLang = navigator.language;
    if (!!userLang) {
      return userLang;
    } else {
      return 'en-US';
    }
  }

 
}
