import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ProposedRepairAndMaintainDetailComponent } from 'app/entities/proposed-repair-and-maintain/proposed-repair-and-maintain-detail.component';
import { ProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

describe('Component Tests', () => {
  describe('ProposedRepairAndMaintain Management Detail Component', () => {
    let comp: ProposedRepairAndMaintainDetailComponent;
    let fixture: ComponentFixture<ProposedRepairAndMaintainDetailComponent>;
    const route = ({ data: of({ proposedRepairAndMaintain: new ProposedRepairAndMaintain(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ProposedRepairAndMaintainDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProposedRepairAndMaintainDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProposedRepairAndMaintainDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proposedRepairAndMaintain on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proposedRepairAndMaintain).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
