import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { ITestimonial } from 'src/models/itestimonials.model';
import { TestimonialService } from 'src/services/testimonial/testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit, OnDestroy {
  testimonialId!: string;
  testimonial!: ITestimonial;
  isLoadingTestimonial = false;
  subscription = new Subscription();
  isServerError = false;

  constructor(
    private route: ActivatedRoute,
    private _testimonial: TestimonialService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testimonialId = params['testimonialId'];
      this.getTestimonials(this.testimonialId);
    });
  }

  getTestimonials(id: string) {
    this.isServerError = false;
    this.isLoadingTestimonial = true;
    this.subscription.add(
      this._testimonial.getTestimonial(id).subscribe({
        next: (data) => {
          this.isLoadingTestimonial = false;
          this.testimonial = data;
        },
        error: (err) => {
          this.isLoadingTestimonial = false;
          this.isServerError = true;
          if (err?.status === 0) {
            this.message.create(
              'error',
              'Please check your internet connection and try again.',
              {
                nzDuration: 5000,
              }
            );
          } else {
            this.message.create(
              'error',
              'An error occurred, please contact Gozem administrator (hr@gozem.com) to get a solution.',
              {
                nzDuration: 5000,
              }
            );
          }
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
