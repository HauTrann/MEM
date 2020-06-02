import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { InOutRepositoryDetailComponent } from 'app/entities/in-out-repository/in-out-repository-detail.component';
import { InOutRepository } from 'app/shared/model/in-out-repository.model';

describe('Component Tests', () => {
  describe('InOutRepository Management Detail Component', () => {
    let comp: InOutRepositoryDetailComponent;
    let fixture: ComponentFixture<InOutRepositoryDetailComponent>;
    const route = ({ data: of({ inOutRepository: new InOutRepository(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [InOutRepositoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InOutRepositoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InOutRepositoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load inOutRepository on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.inOutRepository).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
