import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: TestimonialsComponent
  },
  {
    path: 'testimonial/:testimonialId',
    component: TestimonialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
