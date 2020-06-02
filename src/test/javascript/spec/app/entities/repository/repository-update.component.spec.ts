import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RepositoryUpdateComponent } from 'app/entities/repository/repository-update.component';
import { RepositoryService } from 'app/entities/repository/repository.service';
import { Repository } from 'app/shared/model/repository.model';

describe('Component Tests', () => {
  describe('Repository Management Update Component', () => {
    let comp: RepositoryUpdateComponent;
    let fixture: ComponentFixture<RepositoryUpdateComponent>;
    let service: RepositoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RepositoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RepositoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepositoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepositoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Repository(123);
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
        const entity = new Repository();
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
