import { TestBed } from '@angular/core/testing';

import { ShareDataService } from './share-data.service';

describe('ShareDataService', () => {
  let service: ShareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change country', () => {
    spyOn(service, 'changeCountry').and.callThrough();
    expect(service.changeCountry).toHaveBeenCalledWith('Colombia');
    expect(service.changeCountry).toBe('Colombia');
  });
});
