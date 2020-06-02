import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InOutRepositoryDetailsService } from 'app/entities/in-out-repository-details/in-out-repository-details.service';
import { IInOutRepositoryDetails, InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

describe('Service Tests', () => {
  describe('InOutRepositoryDetails Service', () => {
    let injector: TestBed;
    let service: InOutRepositoryDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IInOutRepositoryDetails;
    let expectedResult: IInOutRepositoryDetails | IInOutRepositoryDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InOutRepositoryDetailsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new InOutRepositoryDetails(0, 0, 'AAAAAAA', 0, 'AAAAAAA', 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InOutRepositoryDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new InOutRepositoryDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InOutRepositoryDetails', () => {
        const returnedFromService = Object.assign(
          {
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InOutRepositoryDetails', () => {
        const returnedFromService = Object.assign(
          {
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            unitPrice: 1,
            amount: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InOutRepositoryDetails', () => {
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
