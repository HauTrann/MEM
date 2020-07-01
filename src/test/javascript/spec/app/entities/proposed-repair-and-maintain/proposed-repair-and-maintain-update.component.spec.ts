import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ProposedRepairAndMaintainUpdateComponent } from 'app/entities/proposed-repair-and-maintain/proposed-repair-and-maintain-update.component';
import { ProposedRepairAndMaintainService } from 'app/entities/proposed-repair-and-maintain/proposed-repair-and-maintain.service';
import { ProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

describe('Component Tests', () => {
  describe('ProposedRepairAndMaintain Management Update Component', () => {
    let comp: ProposedRepairAndMaintainUpdateComponent;
    let fixture: ComponentFixture<ProposedRepairAndMaintainUpdateComponent>;
    let service: ProposedRepairAndMaintainService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ProposedRepairAndMaintainUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProposedRepairAndMaintainUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProposedRepairAndMaintainUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProposedRepairAndMaintainService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProposedRepairAndMaintain(123);
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
        const entity = new ProposedRepairAndMaintain();
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
