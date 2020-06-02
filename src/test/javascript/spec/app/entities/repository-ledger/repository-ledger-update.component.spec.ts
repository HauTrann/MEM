import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RepositoryLedgerUpdateComponent } from 'app/entities/repository-ledger/repository-ledger-update.component';
import { RepositoryLedgerService } from 'app/entities/repository-ledger/repository-ledger.service';
import { RepositoryLedger } from 'app/shared/model/repository-ledger.model';

describe('Component Tests', () => {
  describe('RepositoryLedger Management Update Component', () => {
    let comp: RepositoryLedgerUpdateComponent;
    let fixture: ComponentFixture<RepositoryLedgerUpdateComponent>;
    let service: RepositoryLedgerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RepositoryLedgerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RepositoryLedgerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepositoryLedgerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepositoryLedgerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepositoryLedger(123);
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
        const entity = new RepositoryLedger();
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
