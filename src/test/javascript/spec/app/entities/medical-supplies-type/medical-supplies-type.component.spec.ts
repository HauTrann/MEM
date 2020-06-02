import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { MedicalSuppliesTypeComponent } from 'app/entities/medical-supplies-type/medical-supplies-type.component';
import { MedicalSuppliesTypeService } from 'app/entities/medical-supplies-type/medical-supplies-type.service';
import { MedicalSuppliesType } from 'app/shared/model/medical-supplies-type.model';

describe('Component Tests', () => {
  describe('MedicalSuppliesType Management Component', () => {
    let comp: MedicalSuppliesTypeComponent;
    let fixture: ComponentFixture<MedicalSuppliesTypeComponent>;
    let service: MedicalSuppliesTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [MedicalSuppliesTypeComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(MedicalSuppliesTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MedicalSuppliesTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MedicalSuppliesTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicalSuppliesType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicalSuppliesTypes && comp.medicalSuppliesTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MedicalSuppliesType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.medicalSuppliesTypes && comp.medicalSuppliesTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
