import { TestBed } from '@angular/core/testing';

import { ShoppingAuthGuard } from './shopping-auth.guard';

describe('ShoppingAuthGuard', () => {
  let guard: ShoppingAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShoppingAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
