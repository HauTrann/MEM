import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MedicalEquipmentManagerTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { TechnicalDataTimeLineDeleteDialogComponent } from 'app/entities/technical-data-time-line/technical-data-time-line-delete-dialog.component';
import { TechnicalDataTimeLineService } from 'app/entities/technical-data-time-line/technical-data-time-line.service';

describe('Component Tests', () => {
  describe('TechnicalDataTimeLine Management Delete Component', () => {
    let comp: TechnicalDataTimeLineDeleteDialogComponent;
    let fixture: ComponentFixture<TechnicalDataTimeLineDeleteDialogComponent>;
    let service: TechnicalDataTimeLineService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MedicalEquipmentManagerTestModule],
        declarations: [TechnicalDataTimeLineDeleteDialogComponent]
      })
        .overrideTemplate(TechnicalDataTimeLineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TechnicalDataTimeLineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TechnicalDataTimeLineService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
