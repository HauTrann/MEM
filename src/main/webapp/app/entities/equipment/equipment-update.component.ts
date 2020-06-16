import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Equipment, IEquipment } from 'app/shared/model/equipment.model';
import { EquipmentService } from './equipment.service';
import { EquipmentType } from 'app/shared/model/equipment-type.model';
import { EquipmentTypeService } from 'app/entities/equipment-type/equipment-type.service';
import { UtilsService } from 'app/entities/utils/utils.service';
import { TechnicalDataModel } from 'app/entities/equipment/technical-data.model';

@Component({
  selector: 'jhi-equipment-update',
  templateUrl: './equipment-update.component.html'
})
export class EquipmentUpdateComponent implements OnInit {
  isSaving = false;
  equipmentTypes: EquipmentType[] | null = [];
  file: any;
  thongSoKyThuats: TechnicalDataModel[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    equipmentTypeID: [],
    groupOfEquipment: [],
    status: [],
    description: [],
    qrcode: []
  });

  constructor(
    protected equipmentService: EquipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private equipmentTypeService: EquipmentTypeService,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ equipment }) => {
      this.updateForm(equipment);
    });
    this.equipmentTypeService.query().subscribe(res => {
      this.equipmentTypes = res.body;
    });
  }

  updateForm(equipment: IEquipment): void {
    this.thongSoKyThuats = equipment.technicalData ? equipment.technicalData : [];
    this.editForm.patchValue({
      id: equipment.id,
      code: equipment.code,
      name: equipment.name,
      equipmentTypeID: equipment.equipmentTypeID,
      groupOfEquipment: equipment.groupOfEquipment,
      status: equipment.status === undefined ? 1 : equipment.status,
      description: equipment.description,
      qrcode: equipment.qrcode
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const equipment = this.createFromForm();
    equipment.technicalData = this.thongSoKyThuats;
    if (equipment.id !== undefined) {
      this.subscribeToSaveResponse(this.equipmentService.update(equipment));
    } else {
      this.subscribeToSaveResponse(this.equipmentService.create(equipment));
    }
  }

  private createFromForm(): IEquipment {
    return {
      ...new Equipment(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      equipmentTypeID: this.editForm.get(['equipmentTypeID'])!.value,
      groupOfEquipment: this.editForm.get(['groupOfEquipment'])!.value,
      status: this.editForm.get(['status'])!.value,
      description: this.editForm.get(['description'])!.value,
      qrcode: this.editForm.get(['qrcode'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquipment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  changeFiles(envent: any): void {
    if (envent.target) {
      const file = envent.target.files;
      this.file = null;
      if (file && file.length) {
        this.file = file[0];
      }
    }
  }

  addNewRow(): void {
    this.thongSoKyThuats?.push({});
  }

  removeRow(detail: any): void {
    this.thongSoKyThuats?.splice(this.thongSoKyThuats.indexOf(detail), 1);
  }
}
