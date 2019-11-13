import { TestBed } from '@angular/core/testing';

import { ToastService } from 'src/app/shared/services/toast/toast.service';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastService = TestBed.get(ToastService);
    expect(service).toBeTruthy();
  });
});
