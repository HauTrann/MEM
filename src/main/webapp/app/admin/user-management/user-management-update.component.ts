import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LANGUAGES } from 'app/core/language/language.constants';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { IOrganizationUnit } from 'app/shared/model/organization-unit.model';
import { OrganizationUnitService } from 'app/entities/organization-unit/organization-unit.service';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html'
})
export class UserManagementUpdateComponent implements OnInit {
  user!: User;
  languages = LANGUAGES;
  authorities: string[] = [];
  isSaving = false;
  departments: IDepartment[] | null = [];
  departmentID?: number;
  organizationUnits: IOrganizationUnit[] | null = [];
  organizationUnitID?: number;

  editForm = this.fb.group({
    id: [],
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
    firstName: ['', [Validators.maxLength(50)]],
    lastName: ['', [Validators.maxLength(50)]],
    email: ['', [Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [],
    langKey: [],
    authorities: [],
    departmentID: [],
    dateOfBirth: [],
    phoneNumber: [],
    code: [],
    vice: [],
    organizationUnitID: []
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private organizationUnitService: OrganizationUnitService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        if (this.user.id === undefined) {
          this.user.activated = true;
        }
        this.updateForm(user);
      }
    });
    this.organizationUnitService.getAll().subscribe(res => {
      this.organizationUnits = res.body;
    });
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });

    this.departmentService.getAll().subscribe(res => {
      this.departments = res.body;
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== undefined) {
      this.userService.update(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      langKey: user.langKey,
      authorities: user.authorities,
      departmentID: user.departmentID,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      code: user.code,
      vice: user.vice,
      organizationUnitID: user.organizationUnitID
    });
  }

  private updateUser(user: User): void {
    user.login = this.editForm.get(['login'])!.value;
    user.firstName = this.editForm.get(['firstName'])!.value;
    user.lastName = this.editForm.get(['lastName'])!.value;
    user.email = this.editForm.get(['email'])!.value;
    user.activated = this.editForm.get(['activated'])!.value;
    user.langKey = this.editForm.get(['langKey'])!.value;
    user.authorities = this.editForm.get(['authorities'])!.value;
    user.departmentID = this.editForm.get(['departmentID'])!.value;
    user.dateOfBirth = this.editForm.get(['dateOfBirth'])!.value;
    user.phoneNumber = this.editForm.get(['phoneNumber'])!.value;
    user.code = this.editForm.get(['code'])!.value;
    user.vice = this.editForm.get(['vice'])!.value;
    user.organizationUnitID = this.editForm.get(['organizationUnitID'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  checkVisiableDepartment(): Boolean {
    return this.editForm.get(['authorities'])!.value?.includes('ROLE_USER');
  }

  checkRolAdmin(): Boolean {
    return this.editForm.get(['authorities'])!.value?.includes('ROLE_ADMIN');
  }

  authoritieChange(): void {}
}
