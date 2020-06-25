import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceDetailsUpdateComponent } from 'app/entities/request-receive-device-details/request-receive-device-details-update.component';
import { RequestReceiveDeviceDetailsService } from 'app/entities/request-receive-device-details/request-receive-device-details.service';
import { RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

describe('Component Tests', () => {
  describe('RequestReceiveDeviceDetails Management Update Component', () => {
    let comp: RequestReceiveDeviceDetailsUpdateComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceDetailsUpdateComponent>;
    let service: RequestReceiveDeviceDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RequestReceiveDeviceDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequestReceiveDeviceDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequestReceiveDeviceDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequestReceiveDeviceDetails(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequestReceiveDeviceDetails();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
