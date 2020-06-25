import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { TechnicalDataTimeLineComponent } from 'app/entities/technical-data-time-line/technical-data-time-line.component';
import { TechnicalDataTimeLineService } from 'app/entities/technical-data-time-line/technical-data-time-line.service';
import { TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

describe('Component Tests', () => {
  describe('TechnicalDataTimeLine Management Component', () => {
    let comp: TechnicalDataTimeLineComponent;
    let fixture: ComponentFixture<TechnicalDataTimeLineComponent>;
    let service: TechnicalDataTimeLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [TechnicalDataTimeLineComponent]
      })
        .overrideTemplate(TechnicalDataTimeLineComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TechnicalDataTimeLineComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnicalDataTimeLineService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TechnicalDataTimeLine(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.technicalDataTimeLines && comp.technicalDataTimeLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
