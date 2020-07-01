import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { ProposedRepairAndMaintainDetailsComponent } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details.component';
import { ProposedRepairAndMaintainDetailsService } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details.service';
import { ProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

describe('Component Tests', () => {
  describe('ProposedRepairAndMaintainDetails Management Component', () => {
    let comp: ProposedRepairAndMaintainDetailsComponent;
    let fixture: ComponentFixture<ProposedRepairAndMaintainDetailsComponent>;
    let service: ProposedRepairAndMaintainDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [ProposedRepairAndMaintainDetailsComponent],
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
        .overrideTemplate(ProposedRepairAndMaintainDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProposedRepairAndMaintainDetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProposedRepairAndMaintainDetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProposedRepairAndMaintainDetails(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.proposedRepairAndMaintainDetails && comp.proposedRepairAndMaintainDetails[0]).toEqual(
        jasmine.objectContaining({ id: 123 })
      );
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProposedRepairAndMaintainDetails(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.proposedRepairAndMaintainDetails && comp.proposedRepairAndMaintainDetails[0]).toEqual(
        jasmine.objectContaining({ id: 123 })
      );
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
