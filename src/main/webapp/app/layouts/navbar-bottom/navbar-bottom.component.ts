import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { SELECT } from 'app/shared/constants/app.constants';

@Component({
  selector: 'jhi-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['navbar-bottom.scss']
})
export class NavbarBottomComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;
  showSb?: boolean = true;
  selectMenu?: string;
  selected?: string;
  SELECT = SELECT;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.isNavbarCollapsed = true;
    this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  select(): void {}

  clickButton(select: any): void {
    /* this.eventManager.broadcast({
      name: 'Select',
      content: select
    }); */
    switch (select) {
      case 'MENU':
        this.router.navigate(['/menu']);
        break;
      case 'NOTIFICATION':
        this.router.navigate(['/notification']);
        break;
      case 'ACCOUNT':
        this.router.navigate(['/acc_user']);
        break;
    }
  }
}
