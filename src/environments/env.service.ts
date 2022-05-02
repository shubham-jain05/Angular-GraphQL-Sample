import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  // env variable which overridden by env.js
  public PRODUCTION = false;
  public ENVIRONMENT_MODE = '';
  public API_URL = '';
  public API_URL_MASK = '';

  constructor() {}
}