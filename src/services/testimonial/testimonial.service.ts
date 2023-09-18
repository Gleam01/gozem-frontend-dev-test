import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPaginatedData } from 'src/models/igeneric.model';
import { ITestimonial } from 'src/models/itestimonials.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private httpClient: HttpClient) {}

  getPaginatedTestimonials(
    queryString = ''
  ): Observable<IPaginatedData<ITestimonial[]>> {
    return this.httpClient.get<IPaginatedData<ITestimonial[]>>(
      `${environment.apiBaseUrl}/testimonials${queryString}`
    );
  }
}
