import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TestimonialComponent } from './testimonial.component';
import { TestimonialService } from 'src/services/testimonial/testimonial.service';
import { of, throwError } from 'rxjs';
import { mockTestimonialsData } from 'src/mocks/mock-testimonials';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { SharedModule } from 'src/shared/shared.module';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

describe('TestimonialComponent', () => {
  let component: TestimonialComponent;
  let fixture: ComponentFixture<TestimonialComponent>;
  const testimonialId = '64df354bc5c5aa54dd5f93c1';
  const testimonialService = jasmine.createSpyObj<TestimonialService>(
    'TestimonialService',
    ['getTestimonial']
  );
  const nzMessage = jasmine.createSpyObj<NzMessageService>('NzMessageService', [
    'create',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzSkeletonModule, NzDescriptionsModule, NzEmptyModule, SharedModule],
      declarations: [TestimonialComponent],
      providers: [
        { provide: TestimonialService, useValue: testimonialService },
        { provide: NzMessageService, useValue: nzMessage },
        { provide: ActivatedRoute, useValue: { params: of({testimonialId}) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestimonialComponent);
    component = fixture.componentInstance;
    testimonialService.getTestimonial.and.returnValue(
      of(mockTestimonialsData.data[0])
    );
    fixture.detectChanges();
  });

  it('should create TestimonialComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should get testimonial with id equal to testimonialID', () => {
    component.ngOnInit();
    expect(component.testimonialId).toEqual(testimonialId);
    expect(component.testimonial).toEqual(mockTestimonialsData.data[0]);
  });

  it('should display testimonial details', () => {
    const titles = fixture.nativeElement.querySelectorAll(
      '.ant-descriptions-item-label'
    );
    const contents = fixture.nativeElement.querySelectorAll(
      '.ant-descriptions-item-content'
    );

    expect(Object.keys(titles).length).toEqual(5);
    expect(titles[0].textContent).toContain('Language');
    expect(titles[1].textContent).toContain('Exercise');
    expect(titles[2].textContent).toContain('Mentor');
    expect(titles[3].textContent).toContain('Testimonial');
    expect(titles[4].textContent).toContain('Added since');
    expect(contents[0].textContent).toContain(
      mockTestimonialsData.data[0].language.title
    );
    expect(contents[1].textContent).toContain(
      mockTestimonialsData.data[0].exercise.title
    );
    expect(contents[2].textContent).toContain(
      mockTestimonialsData.data[0].mentor
    );
    expect(contents[3].textContent).toContain(
      mockTestimonialsData.data[0].content
    );
    expect(contents[4].textContent).toContain('ago');
  });
});
