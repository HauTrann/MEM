import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { TechnicalDataTimeLineDetailComponent } from 'app/entities/technical-data-time-line/technical-data-time-line-detail.component';
import { TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

describe('Component Tests', () => {
  describe('TechnicalDataTimeLine Management Detail Component', () => {
    let comp: TechnicalDataTimeLineDetailComponent;
    let fixture: ComponentFixture<TechnicalDataTimeLineDetailComponent>;
    const route = ({ data: of({ technicalDataTimeLine: new TechnicalDataTimeLine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [TechnicalDataTimeLineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TechnicalDataTimeLineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TechnicalDataTimeLineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load technicalDataTimeLine on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.technicalDataTimeLine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
