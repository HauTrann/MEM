import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProposedRepairAndMaintainDetailsService } from 'app/entities/proposed-repair-and-maintain-details/proposed-repair-and-maintain-details.service';
import {
  IProposedRepairAndMaintainDetails,
  ProposedRepairAndMaintainDetails
} from 'app/shared/model/proposed-repair-and-maintain-details.model';

describe('Service Tests', () => {
  describe('ProposedRepairAndMaintainDetails Service', () => {
    let injector: TestBed;
    let service: ProposedRepairAndMaintainDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IProposedRepairAndMaintainDetails;
    let expectedResult: IProposedRepairAndMaintainDetails | IProposedRepairAndMaintainDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProposedRepairAndMaintainDetailsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ProposedRepairAndMaintainDetails(0, 0, 'AAAAAAA', 0, 'AAAAAAA', 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProposedRepairAndMaintainDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ProposedRepairAndMaintainDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProposedRepairAndMaintainDetails', () => {
        const returnedFromService = Object.assign(
          {
            proposedRepairAndMaintainID: 1,
            serial: 'BBBBBB',
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            repositoryID: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProposedRepairAndMaintainDetails', () => {
        const returnedFromService = Object.assign(
          {
            proposedRepairAndMaintainID: 1,
            serial: 'BBBBBB',
            prodID: 1,
            prodName: 'BBBBBB',
            quantity: 1,
            unit: 'BBBBBB',
            repositoryID: 1
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

      it('should delete a ProposedRepairAndMaintainDetails', () => {
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
