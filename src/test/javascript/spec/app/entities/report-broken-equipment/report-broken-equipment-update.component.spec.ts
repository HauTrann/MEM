import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ReportBrokenEquipmentUpdateComponent } from 'app/entities/report-broken-equipment/report-broken-equipment-update.component';
import { ReportBrokenEquipmentService } from 'app/entities/report-broken-equipment/report-broken-equipment.service';
import { ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

describe('Component Tests', () => {
  describe('ReportBrokenEquipment Management Update Component', () => {
    let comp: ReportBrokenEquipmentUpdateComponent;
    let fixture: ComponentFixture<ReportBrokenEquipmentUpdateComponent>;
    let service: ReportBrokenEquipmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ReportBrokenEquipmentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReportBrokenEquipmentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReportBrokenEquipmentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReportBrokenEquipmentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReportBrokenEquipment(123);
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
        const entity = new ReportBrokenEquipment();
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
