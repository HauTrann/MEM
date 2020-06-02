import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { InOutRepositoryService } from 'app/entities/in-out-repository/in-out-repository.service';
import { IInOutRepository, InOutRepository } from 'app/shared/model/in-out-repository.model';

describe('Service Tests', () => {
  describe('InOutRepository Service', () => {
    let injector: TestBed;
    let service: InOutRepositoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IInOutRepository;
    let expectedResult: IInOutRepository | IInOutRepository[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InOutRepositoryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InOutRepository(0, 0, currentDate, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, false);
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

      it('should create a InOutRepository', () => {
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

        service.create(new InOutRepository()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InOutRepository', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT),
            no: 'BBBBBB',
            deliver: 'BBBBBB',
            phoneContact: 'BBBBBB',
            outOfStock: true,
            recorded: true
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

      it('should return a list of InOutRepository', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            date: currentDate.format(DATE_FORMAT),
            postedDate: currentDate.format(DATE_FORMAT),
            no: 'BBBBBB',
            deliver: 'BBBBBB',
            phoneContact: 'BBBBBB',
            outOfStock: true,
            recorded: true
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

      it('should delete a InOutRepository', () => {
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
