import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuItems = [
    {
      icon: '../../../assets/images/dashboard.svg',
      text: 'Dashboard',
      link: 'dashboard',
    },
    {
      icon: '../../../assets/images/language.svg',
      text: 'Languages',
      link: 'languages',
    },
    {
      icon: '../../../assets/images/mentoring.svg',
      text: 'Mentoring',
      link: 'mentoring',
    },
    {
      icon: '../../../assets/images/contributing.svg',
      text: 'Contribute',
      link: 'contributions',
    },
  ]

}
