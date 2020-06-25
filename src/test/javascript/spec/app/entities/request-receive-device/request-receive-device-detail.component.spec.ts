import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceDetailComponent } from 'app/entities/request-receive-device/request-receive-device-detail.component';
import { RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

describe('Component Tests', () => {
  describe('RequestReceiveDevice Management Detail Component', () => {
    let comp: RequestReceiveDeviceDetailComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceDetailComponent>;
    const route = ({ data: of({ requestReceiveDevice: new RequestReceiveDevice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RequestReceiveDeviceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequestReceiveDeviceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load requestReceiveDevice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requestReceiveDevice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
