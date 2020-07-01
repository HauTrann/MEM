import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

@Component({
  selector: 'jhi-report-broken-equipment-detail',
  templateUrl: './report-broken-equipment-detail.component.html'
})
export class ReportBrokenEquipmentDetailComponent implements OnInit {
  reportBrokenEquipment: IReportBrokenEquipment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportBrokenEquipment }) => (this.reportBrokenEquipment = reportBrokenEquipment));
  }

  previousState(): void {
    window.history.back();
  }
}
