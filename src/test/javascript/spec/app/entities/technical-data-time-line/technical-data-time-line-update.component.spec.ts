import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { TechnicalDataTimeLineUpdateComponent } from 'app/entities/technical-data-time-line/technical-data-time-line-update.component';
import { TechnicalDataTimeLineService } from 'app/entities/technical-data-time-line/technical-data-time-line.service';
import { TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

describe('Component Tests', () => {
  describe('TechnicalDataTimeLine Management Update Component', () => {
    let comp: TechnicalDataTimeLineUpdateComponent;
    let fixture: ComponentFixture<TechnicalDataTimeLineUpdateComponent>;
    let service: TechnicalDataTimeLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [TechnicalDataTimeLineUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TechnicalDataTimeLineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TechnicalDataTimeLineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnicalDataTimeLineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TechnicalDataTimeLine(123);
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
        const entity = new TechnicalDataTimeLine();
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
