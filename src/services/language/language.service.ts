import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IData } from 'src/models/igeneric.model';
import { ILanguage } from 'src/models/ilanguage.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private httpClient: HttpClient) {}

  getLanguages(): Observable<IData<ILanguage[]>> {
    return this.httpClient.get<IData<ILanguage[]>>(
      `${environment.apiBaseUrl}/languages`
    );
  }
}
