import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { InOutRepositoryDetailsDetailComponent } from 'app/entities/in-out-repository-details/in-out-repository-details-detail.component';
import { InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

describe('Component Tests', () => {
  describe('InOutRepositoryDetails Management Detail Component', () => {
    let comp: InOutRepositoryDetailsDetailComponent;
    let fixture: ComponentFixture<InOutRepositoryDetailsDetailComponent>;
    const route = ({ data: of({ inOutRepositoryDetails: new InOutRepositoryDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [InOutRepositoryDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InOutRepositoryDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InOutRepositoryDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load inOutRepositoryDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inOutRepositoryDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
