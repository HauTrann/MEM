import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ReportBrokenEquipmentService } from 'app/entities/report-broken-equipment/report-broken-equipment.service';
import { IReportBrokenEquipment, ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

describe('Service Tests', () => {
  describe('ReportBrokenEquipment Service', () => {
    let injector: TestBed;
    let service: ReportBrokenEquipmentService;
    let httpMock: HttpTestingController;
    let elemDefault: IReportBrokenEquipment;
    let expectedResult: IReportBrokenEquipment | IReportBrokenEquipment[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ReportBrokenEquipmentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ReportBrokenEquipment(0, 0, 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate, 0, 'AAAAAAA');
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

      it('should create a ReportBrokenEquipment', () => {
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

        service.create(new ReportBrokenEquipment()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ReportBrokenEquipment', () => {
        const returnedFromService = Object.assign(
          {
            prodID: 1,
            serial: 'BBBBBB',
            description: 'BBBBBB',
            status: 1,
            userID: 1,
            time: currentDate.format(DATE_FORMAT),
            organizationUnitID: 1,
            prodName: 'BBBBBB'
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

      it('should return a list of ReportBrokenEquipment', () => {
        const returnedFromService = Object.assign(
          {
            prodID: 1,
            serial: 'BBBBBB',
            description: 'BBBBBB',
            status: 1,
            userID: 1,
            time: currentDate.format(DATE_FORMAT),
            organizationUnitID: 1,
            prodName: 'BBBBBB'
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

      it('should delete a ReportBrokenEquipment', () => {
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
