import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ReportBrokenEquipmentDetailComponent } from 'app/entities/report-broken-equipment/report-broken-equipment-detail.component';
import { ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

describe('Component Tests', () => {
  describe('ReportBrokenEquipment Management Detail Component', () => {
    let comp: ReportBrokenEquipmentDetailComponent;
    let fixture: ComponentFixture<ReportBrokenEquipmentDetailComponent>;
    const route = ({ data: of({ reportBrokenEquipment: new ReportBrokenEquipment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ReportBrokenEquipmentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReportBrokenEquipmentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReportBrokenEquipmentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reportBrokenEquipment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reportBrokenEquipment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
