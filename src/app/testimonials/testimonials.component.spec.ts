import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';
import { LanguageService } from 'src/services/language/language.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TestimonialService } from 'src/services/testimonial/testimonial.service';
import { SharedModule } from 'src/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { of } from 'rxjs';
import {
  mockRustTestimonials,
  mockTestimonialsData,
} from 'src/mocks/mock-testimonials';
import { mockLanguagesData } from 'src/mocks/mock-languages';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { routes } from '../app-routing.module';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;
  const languageService = jasmine.createSpyObj<LanguageService>(
    'LanguageService',
    ['getLanguages']
  );
  const testimonialService = jasmine.createSpyObj<TestimonialService>(
    'TestimonialService',
    ['getPaginatedTestimonials']
  );
  const nzMessage = jasmine.createSpyObj<NzMessageService>('NzMessageService', [
    'create',
  ]);
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        NzTableModule,
        NzInputModule,
        NzDropDownModule,
        NzSelectModule,
        NzIconTestModule,
        NzEmptyModule,
        NzRadioModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [TestimonialsComponent],
      providers: [
        { provide: LanguageService, useValue: languageService },
        { provide: TestimonialService, useValue: testimonialService },
        { provide: NzMessageService, useValue: nzMessage },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    testimonialService.getPaginatedTestimonials.and.returnValue(
      of(mockTestimonialsData)
    );
    languageService.getLanguages.and.returnValue(of(mockLanguagesData));
    fixture.detectChanges();
  });

  it('should create TestimonialsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should get languages in drowpdown', () => {
    expect(component.languages).toEqual(mockLanguagesData.data);
    const selectedLanguageDisplayed = fixture.nativeElement.querySelector(
      '.dropdown-image'
    ) as HTMLImageElement;
    expect(component.selectedLanguage).toEqual(mockLanguagesData.data[0]);
    expect(selectedLanguageDisplayed.src).toContain(
      mockLanguagesData.data[0].icon_url.substring(6)
    );
  });

  it('should display testimonials in table', () => {
    expect(
      fixture.nativeElement.querySelector('h1 .badge').textContent
    ).toContain(mockTestimonialsData.pagination.total_count);
    const testimonialRows = fixture.debugElement.queryAll(
      By.css('.ant-table-tbody .ant-table-row')
    );
    const testimonialFirstRowCells = fixture.debugElement.queryAll(
      By.css('.ant-table-tbody .ant-table-row:first-child .ant-table-cell')
    );
    expect(component.testimonials).toEqual(mockTestimonialsData.data);
    expect(testimonialRows.length).toBeLessThanOrEqual(20);
    expect(testimonialFirstRowCells.length).toEqual(4);
    expect(testimonialFirstRowCells[0].children[0].nativeElement?.src).toEqual(
      mockTestimonialsData.data[0].language.icon_url
    );
    expect(
      testimonialFirstRowCells[1].children[0].nativeElement?.textContent
    ).toContain(mockTestimonialsData.data[0].mentor);
    expect(testimonialFirstRowCells[2].nativeElement?.textContent).toContain(
      mockTestimonialsData.data[0].content
    );
    expect(testimonialFirstRowCells[3].nativeElement?.textContent).toContain(
      'ago'
    );
  });

  it('should redirect to testimonial details page when click on testimonial row', () => {
    const spy = spyOn(router, 'navigate');
    fixture.debugElement
      .query(By.css('.ant-table-tbody .ant-table-row:first-child'))
      .triggerEventHandler('click', mockTestimonialsData.data[0]);
    expect(spy.calls.first().args[0]).toContain(
      `/testimonial/${mockTestimonialsData.data[0].id}`
    );
  });

  xit('should display filter by exercise result', () => {
    testimonialService.getPaginatedTestimonials.and.returnValue(
      of(mockRustTestimonials)
    );
    fixture.debugElement
      .query(By.css('.ant-input-affix-wrapper > input.ant-input'))
      .triggerEventHandler('keyup', 'giga');

    expect(component.testimonials).toEqual(mockRustTestimonials.data);
    expect(component.searchText).toEqual('giga');
    expect(
      testimonialService.getPaginatedTestimonials.calls.first().args[0]
    ).toContain(`&exercise=giga`);
  });
});
