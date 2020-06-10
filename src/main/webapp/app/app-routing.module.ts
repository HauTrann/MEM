import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { navbarBottomRoute } from 'app/layouts/navbar-bottom/navbar-bottom.route';
import { sidebarRoute } from 'app/layouts/sidebar/sidebar.route';
import { loginMainRoute } from 'app/layouts/login/login-main.route';

const LAYOUT_ROUTES = [navbarRoute, sidebarRoute, navbarBottomRoute, ...errorRoute];
const LAYOUT_ROUTES_LOGIN = [...loginMainRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN]
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        ...LAYOUT_ROUTES_LOGIN,
        ...LAYOUT_ROUTES
      ],
      // { enableTracing: DEBUG_INFO_ENABLED }
      { useHash: true, enableTracing: false }
    )
  ],
  exports: [RouterModule]
})
export class MedicalEquipmentManagerAppRoutingModule {}
