import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, UsersPage, ProfilePage, AnalyticsPage,
   EventsPage, AppointmentsPage, FollowupsPage, MedicationRefillsPage, PatientsPage } from './pages';

const routes = [
  {
    path: '/users',
    component: UsersPage
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
