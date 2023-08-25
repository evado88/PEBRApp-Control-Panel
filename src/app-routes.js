import { withNavigationWatcher } from './contexts/navigation';
import {
  HomePage, TasksPage, UsersPage, ClientsPage, ProfilePage, AnalyticsPage,
  EventsPage, AppointmentsPage, FollowupsPage, MedicationRefillsPage, PatientsPage, FacilitiesPage, ResourcesPage, 
  CountriesPage, ColorsPage, DiscussionsPage
} from './pages';

const routes = [
  {
    path: '/users',
    component: UsersPage
  },
  {
    path: '/clients',
    component: ClientsPage
  },
  {
    path: '/patients',
    component: PatientsPage
  },
  {
    path: '/medication-refills',
    component: MedicationRefillsPage
  },
  {
    path: '/events',
    component: EventsPage
  },
  {
    path: '/appointments',
    component: AppointmentsPage
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
    path: '/tasks',
    component: TasksPage
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
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
