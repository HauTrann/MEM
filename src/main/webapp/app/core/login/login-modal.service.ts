import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { LoginModalComponent } from 'app/shared/login/login.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal, public router: Router) {}

  open(): void {
    /*if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(LoginModalComponent);
    modalRef.result.finally(() => (this.isOpen = false));*/
    this.router.navigate(['/login']);
  }
}
