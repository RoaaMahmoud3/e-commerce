import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes ,  withInMemoryScrolling({scrollPositionRestoration:'top'}),withViewTransitions()),
    // provideClientHydration(withEventReplay()),
    provideClientHydration(),
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor , loadingInterceptor ,errorInterceptor ])),
    importProvidersFrom(CookieService , NgxSpinnerModule),
    provideAnimationsAsync(),
    provideToastr({
      progressBar:true,
      closeButton:true,
      timeOut:3000
    })
  ]
};
