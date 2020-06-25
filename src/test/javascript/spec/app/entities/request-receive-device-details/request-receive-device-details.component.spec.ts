import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceDetailsComponent } from 'app/entities/request-receive-device-details/request-receive-device-details.component';
import { RequestReceiveDeviceDetailsService } from 'app/entities/request-receive-device-details/request-receive-device-details.service';
import { RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

describe('Component Tests', () => {
  describe('RequestReceiveDeviceDetails Management Component', () => {
    let comp: RequestReceiveDeviceDetailsComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceDetailsComponent>;
    let service: RequestReceiveDeviceDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceDetailsComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(RequestReceiveDeviceDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequestReceiveDeviceDetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequestReceiveDeviceDetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RequestReceiveDeviceDetails(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.requestReceiveDeviceDetails && comp.requestReceiveDeviceDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RequestReceiveDeviceDetails(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.requestReceiveDeviceDetails && comp.requestReceiveDeviceDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
