import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { InOutRepositoryDetailsUpdateComponent } from 'app/entities/in-out-repository-details/in-out-repository-details-update.component';
import { InOutRepositoryDetailsService } from 'app/entities/in-out-repository-details/in-out-repository-details.service';
import { InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

describe('Component Tests', () => {
  describe('InOutRepositoryDetails Management Update Component', () => {
    let comp: InOutRepositoryDetailsUpdateComponent;
    let fixture: ComponentFixture<InOutRepositoryDetailsUpdateComponent>;
    let service: InOutRepositoryDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [InOutRepositoryDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InOutRepositoryDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InOutRepositoryDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InOutRepositoryDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InOutRepositoryDetails(123);
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
        const entity = new InOutRepositoryDetails();
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
