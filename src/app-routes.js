import { withNavigationWatcher } from './contexts/navigation';

import {
  HomePage, UsersPage, UserPage, PeerNavigatorsPage , ProfilePage, AnalyticsPage, FollowupsPage, PatientsPage, FacilitiesPage, ResourcesPage,
  CountriesPage, ColorsPage, ColorPage, DiscussionsPage, FacilityPage, ResourcePage, CountryPage, DiscussionPage
} from './pages';

const routes = [
  {
    path: '/users',
    component: UsersPage
  },
  {
    path: '/peer-navigators',
    component: PeerNavigatorsPage 
  },
  {
    path: '/participants',
    component: PatientsPage
  },
  {
    path: '/analytics',
    component: AnalyticsPage
  },
  {
    path: '/follow-ups',
    component: FollowupsPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/facilities',
    component: FacilitiesPage
  },
  {
    path: '/resources',
    component: ResourcesPage
  },
  {
    path: '/countries',
    component: CountriesPage
  },
  {
    path: '/colors',
    component: ColorsPage
  },
  {
    path: '/discussions',
    component: DiscussionsPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/color/edit/:eid',
    component: ColorPage
  },
  {
    path: '/user/add',
    component: UserPage
  },
  {
    path: '/user/edit/:eid',
    component: UserPage
  },
  {
    path: '/facility/add',
    component: FacilityPage
  },
  {
    path: '/facility/edit/:eid',
    component: FacilityPage
  },
  {
    path: '/resource/add',
    component: ResourcePage
  },
  {
    path: '/resource/edit/:eid',
    component: ResourcePage
  },
  {
    path: '/country/add',
    component: CountryPage
  },
  {
    path: '/country/edit/:eid',
    component: CountryPage
  },
  {
    path: '/color/add',
    component: ColorPage
  },
  {
    path: '/color/edit/:eid',
    component: ColorPage
  },
  {
    path: '/discussion/edit/:eid',
    component: DiscussionPage
  },
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
