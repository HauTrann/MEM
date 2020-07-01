import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ProposedRepairAndMaintainService } from 'app/entities/proposed-repair-and-maintain/proposed-repair-and-maintain.service';
import { IProposedRepairAndMaintain, ProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

describe('Service Tests', () => {
  describe('ProposedRepairAndMaintain Service', () => {
    let injector: TestBed;
    let service: ProposedRepairAndMaintainService;
    let httpMock: HttpTestingController;
    let elemDefault: IProposedRepairAndMaintain;
    let expectedResult: IProposedRepairAndMaintain | IProposedRepairAndMaintain[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProposedRepairAndMaintainService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProposedRepairAndMaintain(0, 0, 0, 'AAAAAAA', currentDate, currentDate, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            proposedDate: currentDate.format(DATE_FORMAT),
            validationDate: currentDate.format(DATE_FORMAT),
            finishDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProposedRepairAndMaintain', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            proposedDate: currentDate.format(DATE_FORMAT),
            validationDate: currentDate.format(DATE_FORMAT),
            finishDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            proposedDate: currentDate,
            validationDate: currentDate,
            finishDate: currentDate
          },
          returnedFromService
        );

        service.create(new ProposedRepairAndMaintain()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProposedRepairAndMaintain', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            userID: 1,
            description: 'BBBBBB',
            proposedDate: currentDate.format(DATE_FORMAT),
            validationDate: currentDate.format(DATE_FORMAT),
            finishDate: currentDate.format(DATE_FORMAT),
            status: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            proposedDate: currentDate,
            validationDate: currentDate,
            finishDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProposedRepairAndMaintain', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            userID: 1,
            description: 'BBBBBB',
            proposedDate: currentDate.format(DATE_FORMAT),
            validationDate: currentDate.format(DATE_FORMAT),
            finishDate: currentDate.format(DATE_FORMAT),
            status: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            proposedDate: currentDate,
            validationDate: currentDate,
            finishDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProposedRepairAndMaintain', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
