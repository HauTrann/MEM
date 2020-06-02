import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { InOutRepositoryUpdateComponent } from 'app/entities/in-out-repository/in-out-repository-update.component';
import { InOutRepositoryService } from 'app/entities/in-out-repository/in-out-repository.service';
import { InOutRepository } from 'app/shared/model/in-out-repository.model';

describe('Component Tests', () => {
  describe('InOutRepository Management Update Component', () => {
    let comp: InOutRepositoryUpdateComponent;
    let fixture: ComponentFixture<InOutRepositoryUpdateComponent>;
    let service: InOutRepositoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [InOutRepositoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InOutRepositoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InOutRepositoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InOutRepositoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InOutRepository(123);
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
        const entity = new InOutRepository();
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
