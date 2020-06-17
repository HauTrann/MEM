import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEquipment } from 'app/shared/model/equipment.model';
import { UtilsService } from 'app/entities/utils/utils.service';

@Component({
  selector: 'jhi-equipment-detail',
  templateUrl: './equipment-detail.component.html'
})
export class EquipmentDetailComponent implements OnInit {
  equipment: IEquipment | null = null;

  constructor(protected activatedRoute: ActivatedRoute, public utilsService: UtilsService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ equipment }) => (this.equipment = equipment));
  }

  previousState(): void {
    window.history.back();
  }
}
