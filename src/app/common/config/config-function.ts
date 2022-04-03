import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const GoogleApiKey = "AIzaSyA88tbSLpihvKXmN6Mifzi9cAiSDZMrjAY";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
