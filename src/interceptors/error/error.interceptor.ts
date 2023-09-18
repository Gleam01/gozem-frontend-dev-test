import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let _request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'Referrer-Policy': 'no-referrer-when-downgrade',
      },
    });

    return next.handle(_request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            this.message.create(
              'error',
              'Please check your internet connection and try again.',
              {
                nzDuration: 5000,
              }
            );
            break;
          case 401:
            // Auto logout if 401 response returned from api
            break;
        }
        return throwError(error);
      })
    );
  }
}
