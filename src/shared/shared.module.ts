import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DateAgoPipe } from './pipes/date-ago.pipe';



@NgModule({
  declarations: [NavbarComponent, DateAgoPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent, DateAgoPipe]
})
export class SharedModule { }
