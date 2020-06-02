import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { RepositoryLedgerDetailComponent } from 'app/entities/repository-ledger/repository-ledger-detail.component';
import { RepositoryLedger } from 'app/shared/model/repository-ledger.model';

describe('Component Tests', () => {
  describe('RepositoryLedger Management Detail Component', () => {
    let comp: RepositoryLedgerDetailComponent;
    let fixture: ComponentFixture<RepositoryLedgerDetailComponent>;
    const route = ({ data: of({ repositoryLedger: new RepositoryLedger(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [RepositoryLedgerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RepositoryLedgerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepositoryLedgerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load repositoryLedger on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repositoryLedger).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
