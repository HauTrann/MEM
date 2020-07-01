import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ReportBrokenEquipmentComponent } from 'app/entities/report-broken-equipment/report-broken-equipment.component';
import { ReportBrokenEquipmentService } from 'app/entities/report-broken-equipment/report-broken-equipment.service';
import { ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

describe('Component Tests', () => {
  describe('ReportBrokenEquipment Management Component', () => {
    let comp: ReportBrokenEquipmentComponent;
    let fixture: ComponentFixture<ReportBrokenEquipmentComponent>;
    let service: ReportBrokenEquipmentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ReportBrokenEquipmentComponent],
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
        .overrideTemplate(ReportBrokenEquipmentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReportBrokenEquipmentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReportBrokenEquipmentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReportBrokenEquipment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reportBrokenEquipments && comp.reportBrokenEquipments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReportBrokenEquipment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reportBrokenEquipments && comp.reportBrokenEquipments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
