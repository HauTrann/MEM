import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RequestReceiveDeviceService } from 'app/entities/request-receive-device/request-receive-device.service';
import { IRequestReceiveDevice, RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

describe('Service Tests', () => {
  describe('RequestReceiveDevice Service', () => {
    let injector: TestBed;
    let service: RequestReceiveDeviceService;
    let httpMock: HttpTestingController;
    let elemDefault: IRequestReceiveDevice;
    let expectedResult: IRequestReceiveDevice | IRequestReceiveDevice[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RequestReceiveDeviceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RequestReceiveDevice(0, 0, 0, currentDate, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            requestDate: currentDate.format(DATE_FORMAT),
            dateOfDelivery: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RequestReceiveDevice', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            requestDate: currentDate.format(DATE_FORMAT),
            dateOfDelivery: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            requestDate: currentDate,
            dateOfDelivery: currentDate
          },
          returnedFromService
        );

        service.create(new RequestReceiveDevice()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RequestReceiveDevice', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            userID: 1,
            requestDate: currentDate.format(DATE_FORMAT),
            dateOfDelivery: currentDate.format(DATE_FORMAT),
            description: 'BBBBBB',
            status: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            requestDate: currentDate,
            dateOfDelivery: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RequestReceiveDevice', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitID: 1,
            userID: 1,
            requestDate: currentDate.format(DATE_FORMAT),
            dateOfDelivery: currentDate.format(DATE_FORMAT),
            description: 'BBBBBB',
            status: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            requestDate: currentDate,
            dateOfDelivery: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RequestReceiveDevice', () => {
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
