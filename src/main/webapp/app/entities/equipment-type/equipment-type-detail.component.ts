import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEquipmentType } from 'app/shared/model/equipment-type.model';
import { UtilsService } from 'app/entities/utils/utils.service';

@Component({
  selector: 'jhi-equipment-type-detail',
  templateUrl: './equipment-type-detail.component.html'
})
export class EquipmentTypeDetailComponent implements OnInit {
  equipmentType: IEquipmentType | null = null;

  constructor(protected activatedRoute: ActivatedRoute, public utilsService: UtilsService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ equipmentType }) => (this.equipmentType = equipmentType));
  }

  previousState(): void {
    window.history.back();
  }
}
