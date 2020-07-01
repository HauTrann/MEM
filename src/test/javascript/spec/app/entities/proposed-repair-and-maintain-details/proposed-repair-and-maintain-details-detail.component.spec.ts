import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ProposedRepairAndMaintainDetailsDetailComponent } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details-detail.component';
import { ProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

describe('Component Tests', () => {
  describe('ProposedRepairAndMaintainDetails Management Detail Component', () => {
    let comp: ProposedRepairAndMaintainDetailsDetailComponent;
    let fixture: ComponentFixture<ProposedRepairAndMaintainDetailsDetailComponent>;
    const route = ({ data: of({ proposedRepairAndMaintainDetails: new ProposedRepairAndMaintainDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ProposedRepairAndMaintainDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProposedRepairAndMaintainDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProposedRepairAndMaintainDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proposedRepairAndMaintainDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proposedRepairAndMaintainDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
