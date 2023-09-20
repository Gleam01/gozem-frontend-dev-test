import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LanguageService } from './language.service';
import { mockLanguagesData } from 'src/mocks/mock-languages';
import { environment } from 'src/environments/environment';

describe('LanguageService', () => {
  let service: LanguageService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LanguageService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('LanguageService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLanguages and return an array of ILanguages in an IData Object', () => {
    service.getLanguages().subscribe((response) => {
      expect(response).toEqual(mockLanguagesData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiBaseUrl}/languages`,
    });

    req.flush(mockLanguagesData);
  });
});
