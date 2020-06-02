import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RepositoryLedgerService } from 'app/entities/repository-ledger/repository-ledger.service';
import { IRepositoryLedger, RepositoryLedger } from 'app/shared/model/repository-ledger.model';

describe('Service Tests', () => {
  describe('RepositoryLedger Service', () => {
    let injector: TestBed;
    let service: RepositoryLedgerService;
    let httpMock: HttpTestingController;
    let elemDefault: IRepositoryLedger;
    let expectedResult: IRepositoryLedger | IRepositoryLedger[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RepositoryLedgerService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RepositoryLedger(0, 0, 0, 0, currentDate, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 0, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RepositoryLedger', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            postedDate: currentDate
          },
          returnedFromService
        );

        service.create(new RepositoryLedger()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RepositoryLedger', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            refID: 1,
            detailID: 1,
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT),
            no: 'BBBBBB',
            deliver: 'BBBBBB',
            phoneContact: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1,
            outOfStock: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            postedDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RepositoryLedger', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            refID: 1,
            detailID: 1,
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT),
            no: 'BBBBBB',
            deliver: 'BBBBBB',
            phoneContact: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1,
            outOfStock: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            postedDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RepositoryLedger', () => {
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
