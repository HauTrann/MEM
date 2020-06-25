import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceDetailsDetailComponent } from 'app/entities/request-receive-device-details/request-receive-device-details-detail.component';
import { RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

describe('Component Tests', () => {
  describe('RequestReceiveDeviceDetails Management Detail Component', () => {
    let comp: RequestReceiveDeviceDetailsDetailComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceDetailsDetailComponent>;
    const route = ({ data: of({ requestReceiveDeviceDetails: new RequestReceiveDeviceDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RequestReceiveDeviceDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequestReceiveDeviceDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load requestReceiveDeviceDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.requestReceiveDeviceDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
