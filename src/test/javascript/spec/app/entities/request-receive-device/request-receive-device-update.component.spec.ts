import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RequestReceiveDeviceUpdateComponent } from 'app/entities/request-receive-device/request-receive-device-update.component';
import { RequestReceiveDeviceService } from 'app/entities/request-receive-device/request-receive-device.service';
import { RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

describe('Component Tests', () => {
  describe('RequestReceiveDevice Management Update Component', () => {
    let comp: RequestReceiveDeviceUpdateComponent;
    let fixture: ComponentFixture<RequestReceiveDeviceUpdateComponent>;
    let service: RequestReceiveDeviceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RequestReceiveDeviceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RequestReceiveDeviceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RequestReceiveDeviceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequestReceiveDeviceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RequestReceiveDevice(123);
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
        const entity = new RequestReceiveDevice();
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
