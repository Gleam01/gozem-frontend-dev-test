import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

import { SharedModule } from 'src/shared/shared.module';

import { interceptorsExports } from 'src/interceptors';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMessageModule } from 'ng-zorro-antd/message';

registerLocaleData(fr);

@NgModule({
  declarations: [AppComponent, TestimonialsComponent, TestimonialComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NzSelectModule,
    NzRadioModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzEmptyModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzMessageModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, ...interceptorsExports],
  bootstrap: [AppComponent],
})
export class AppModule {}
