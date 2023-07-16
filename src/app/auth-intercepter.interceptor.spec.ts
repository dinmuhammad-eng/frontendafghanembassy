import { TestBed } from '@angular/core/testing';

import { AuthIntercepterInterceptor } from './auth-intercepter.interceptor';

describe('AuthIntercepterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthIntercepterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthIntercepterInterceptor = TestBed.inject(AuthIntercepterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
