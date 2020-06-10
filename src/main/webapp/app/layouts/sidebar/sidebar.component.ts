import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';

import { VERSION } from 'app/app.constants';
import { LoginService } from 'app/core/login/login.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.scss']
})
export class SidebarComponent implements OnInit {
  inProduction?: boolean;
  languages?: any[];
  modalRef?: NgbModalRef;
  version: string;
  account: any;
  showSb?: boolean = true;
  eventSubscriberChangeSession?: Subscription;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    public router: Router,
    private modalService: NgbModal,
    private eventManager: JhiEventManager
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
  }

  ngOnInit(): void {
    this.registerShowSidebar();
  }

  changeLanguage(languageKey: string): void {
    this.languageService.changeLanguage(languageKey);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  registerShowSidebar(): void {
    this.eventSubscriberChangeSession = this.eventManager.subscribe('toggleNavbar', (response: { content: boolean | undefined }) => {
      this.showSb = response.content;
    });
  }
}
