import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RequestReceiveDeviceDetailsService } from 'app/entities/request-receive-device-details/request-receive-device-details.service';
import { IRequestReceiveDeviceDetails, RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

describe('Service Tests', () => {
  describe('RequestReceiveDeviceDetails Service', () => {
    let injector: TestBed;
    let service: RequestReceiveDeviceDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IRequestReceiveDeviceDetails;
    let expectedResult: IRequestReceiveDeviceDetails | IRequestReceiveDeviceDetails[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RequestReceiveDeviceDetailsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RequestReceiveDeviceDetails(0, 0, 'AAAAAAA', 0, 'AAAAAAA', 0, 'AAAAAAA', 0, 0, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RequestReceiveDeviceDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expiryDate: currentDate
          },
          returnedFromService
        );

        service.create(new RequestReceiveDeviceDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RequestReceiveDeviceDetails', () => {
        const returnedFromService = Object.assign(
          {
            requestReceiveDeviceID: 1,
            serial: 'BBBBBB',
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1,
            repositoryID: 1,
            lotNo: 'BBBBBB',
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expiryDate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RequestReceiveDeviceDetails', () => {
        const returnedFromService = Object.assign(
          {
            requestReceiveDeviceID: 1,
            serial: 'BBBBBB',
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1,
            repositoryID: 1,
            lotNo: 'BBBBBB',
            expiryDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expiryDate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RequestReceiveDeviceDetails', () => {
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
