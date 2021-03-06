import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TechnicalDataTimeLineService } from 'app/entities/technical-data-time-line/technical-data-time-line.service';
import { ITechnicalDataTimeLine, TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

describe('Service Tests', () => {
  describe('TechnicalDataTimeLine Service', () => {
    let injector: TestBed;
    let service: TechnicalDataTimeLineService;
    let httpMock: HttpTestingController;
    let elemDefault: ITechnicalDataTimeLine;
    let expectedResult: ITechnicalDataTimeLine | ITechnicalDataTimeLine[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TechnicalDataTimeLineService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TechnicalDataTimeLine(0, 'AAAAAAA', 'AAAAAAA', 0, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            time: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TechnicalDataTimeLine', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            time: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate
          },
          returnedFromService
        );

        service.create(new TechnicalDataTimeLine()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TechnicalDataTimeLine', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            value: 'BBBBBB',
            equipmentID: 1,
            time: currentDate.format(DATE_FORMAT),
            serial: 'BBBBBB',
            userID: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TechnicalDataTimeLine', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            value: 'BBBBBB',
            equipmentID: 1,
            time: currentDate.format(DATE_FORMAT),
            serial: 'BBBBBB',
            userID: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            time: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TechnicalDataTimeLine', () => {
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
