import { TestBed } from '@angular/core/testing';

import { ServiceDetailInspectionService } from './service-detail-inspection.service';

describe('ServiceDetailInspectionService', () => {
  let service: ServiceDetailInspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailInspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
