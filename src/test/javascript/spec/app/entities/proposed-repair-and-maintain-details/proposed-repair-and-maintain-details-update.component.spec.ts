import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ProposedRepairAndMaintainDetailsUpdateComponent } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details-update.component';
import { ProposedRepairAndMaintainDetailsService } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details.service';
import { ProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

describe('Component Tests', () => {
  describe('ProposedRepairAndMaintainDetails Management Update Component', () => {
    let comp: ProposedRepairAndMaintainDetailsUpdateComponent;
    let fixture: ComponentFixture<ProposedRepairAndMaintainDetailsUpdateComponent>;
    let service: ProposedRepairAndMaintainDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ProposedRepairAndMaintainDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProposedRepairAndMaintainDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProposedRepairAndMaintainDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProposedRepairAndMaintainDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProposedRepairAndMaintainDetails(123);
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
        const entity = new ProposedRepairAndMaintainDetails();
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
