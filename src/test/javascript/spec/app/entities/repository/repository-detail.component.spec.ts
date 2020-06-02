import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RepositoryDetailComponent } from 'app/entities/repository/repository-detail.component';
import { Repository } from 'app/shared/model/repository.model';

describe('Component Tests', () => {
  describe('Repository Management Detail Component', () => {
    let comp: RepositoryDetailComponent;
    let fixture: ComponentFixture<RepositoryDetailComponent>;
    const route = ({ data: of({ repository: new Repository(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RepositoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RepositoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepositoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load repository on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repository).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
