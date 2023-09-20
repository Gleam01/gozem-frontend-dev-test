import { TestBed } from '@angular/core/testing';

import { TestimonialService } from './testimonial.service';
import { mockTestimonialsData, mockRustTestimonials } from 'src/mocks/mock-testimonials';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('TestimonialService', () => {
  let service: TestimonialService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TestimonialService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('TestimonialService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPaginatedTestimonials and return an array of ITestimonial in an IPaginatedDat Object', () => {
    service.getPaginatedTestimonials().subscribe((response) => {
      expect(response).toEqual(mockTestimonialsData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiBaseUrl}/testimonials`,
    });

    req.flush(mockTestimonialsData);
  });

  it('should call getBookById and return the appropriate Book', () => {
    const id = '64df354bc5c5aa54dd5f93c1';
    service.getTestimonial(id).subscribe((data) => {
      expect(data).toEqual(mockTestimonialsData.data[0]);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiBaseUrl}/testimonials/${id}`,
    });

    req.flush(mockTestimonialsData.data[0]);
  });

  it('should call getPaginatedTestimonials and return an array of ITestimonial in an IPaginatedDat Object filtered by Language and exercise title', () => {
    service.getPaginatedTestimonials('?page=1&language=rust&exercise=giga').subscribe((response) => {
      expect(response).toEqual(mockRustTestimonials);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiBaseUrl}/testimonials?page=1&language=rust&exercise=giga`,
    });

    req.flush(mockRustTestimonials);
  });
});
