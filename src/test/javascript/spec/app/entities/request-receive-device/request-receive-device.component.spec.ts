import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceComponent } from 'app/entities/request-receive-device/request-receive-device.component';
import { RequestReceiveDeviceService } from 'app/entities/request-receive-device/request-receive-device.service';
import { RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

describe('Component Tests', () => {
  describe('RequestReceiveDevice Management Component', () => {
    let comp: RequestReceiveDeviceComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceComponent>;
    let service: RequestReceiveDeviceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceComponent],
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
        .overrideTemplate(RequestReceiveDeviceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequestReceiveDeviceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequestReceiveDeviceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RequestReceiveDevice(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.requestReceiveDevices && comp.requestReceiveDevices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RequestReceiveDevice(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.requestReceiveDevices && comp.requestReceiveDevices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
