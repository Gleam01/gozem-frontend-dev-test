import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { IPagination } from 'src/models/igeneric.model';
import { ILanguage } from 'src/models/ilanguage.model';
import { ITestimonial } from 'src/models/itestimonials.model';
import { LanguageService } from 'src/services/language/language.service';
import { TestimonialService } from 'src/services/testimonial/testimonial.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  subscription = new Subscription();
  visible = false;
  genericAllLanguage: ILanguage = {
    id: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
    title: 'All',
    icon_url: '../../assets/images/all-languages.png',
    slug: 'all',
    num_exercises: 0,
  };
  languages: ILanguage[] = [];
  selectedLanguage: ILanguage = this.genericAllLanguage;
  sortBy = 'oldest_first';
  isLoadingTestimonials = false;
  paginationData!: IPagination;
  testimonials!: ITestimonial[];
  private searchText$ = new Subject<string>();
  searchText!: string;

  constructor(private language: LanguageService, private testimonial: TestimonialService, private router: Router) {}

  ngOnInit(): void {
    this.getLanguages();
    this.getTestimonials(this.buildFilteringQueryString(1));

    // Prevent multiple api calls when searching testimonials by exercise
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe
      ((exercise) => {
        this.searchText = exercise;
        this.getTestimonials(this.buildFilteringQueryString(1))
      });
  }

  getLanguages() {
    this.subscription.add(
      this.language.getLanguages().subscribe({
        next: (data) => {
          this.languages = data.data;
          this.genericAllLanguage.num_exercises = this.languages.reduce(
            (accumulator, object) => {
              return accumulator + object.num_exercises;
            },
            0
          );
          this.languages.unshift(this.genericAllLanguage);
        },
        error: (error) => {

        }
      })
    );
  }

  getTestimonials(queryString: string = '') {
    this.isLoadingTestimonials = true;
    this.subscription.add(
      this.testimonial.getPaginatedTestimonials(queryString).subscribe({
        next: (data) => {
          this.isLoadingTestimonials = false;
          this.testimonials = data.data;
          this.paginationData = data.pagination;
        },
      })
    );
  }

  buildFilteringQueryString(page: number) {
    let queryString = `?page=${page}`;
    if (this.sortBy) {
      queryString = queryString.concat(`&order=${this.sortBy}`)
    }
    if (this.selectedLanguage.slug !== 'all') {
      queryString = queryString.concat(`&language=${this.selectedLanguage.slug}`)
    }
    if (this.searchText) {
      queryString = queryString.concat(`&exercise=${this.searchText}`);
    }

    return queryString;
  }

  onGetPageData(page: number) {
    this.getTestimonials(this.buildFilteringQueryString(page));
  }

  onClickLanguage(event: any) {
    this.visible = false;
    this.onGetPageData(1)
  }

  search(exercise: string) {
    this.searchText$.next(exercise);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSeeTestimonialDetails(testimonial: ITestimonial) {
    this.router.navigate([`/testimonial/${testimonial.id}`]);
  }
}
