import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  visible = false;
  languages = [
    {
      title: 'All',
      icon_url: '../../assets/images/all-languages.png',
      slug: 'all',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
    {
      title: 'Rust',
      icon_url: 'https://dg8krxphbh767.cloudfront.net/tracks/rust.svg',
      slug: 'rust',
    },
  ];
  selectedLanguage: any = null;
  sortBy = 'oldest_first';
  testimonials: any[] = [];
  isLoadingTestimonials = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoadingTestimonials = true;
    setTimeout(() => {
      this.isLoadingTestimonials = false;
    }, 5000);
    this.testimonials = new Array(200).fill(0);
  }

  onClickLanguage(event: any) {
    this.visible = false;
  }
}
