import { withNavigationWatcher } from './contexts/navigation';

import {
  HomePage, UsersPage, UserPage, PeerNavigatorsPage, ProfilePage, AnalyticsPage, FollowupsPage, PatientsPage, FacilitiesPage, PeerNavigatorFacilitiesPage, ResourcesPage,
  CountriesPage, ColorsPage, ColorPage, DiscussionsPage, FacilityPage, ResourcePage, CountryPage, DiscussionPage, ForumPage,
  PostPage, NotificationPage, NotificationsPage, PhonesPage, PhonePage,
  PhoneParticipantsPage,
  ConversationsPage, LastSeenPage, ChatPage, PhoneConversationsPage, FileManager,
   Quizzes, QuizAttempts, QuizAttemptPage, QuizPage, 
   SMSCategoriesPage, SMSPhonesPage, SMSMessagesPage, SMSHistoryPage,
   SMSCategoryPage, SMSPhonePage, SMSMessagePage, SendSMSPage, DictionaryPage, StudyFollowupPage
} from './pages';

const routes = [
  {
    path: '/send-messages',
    component: SendSMSPage
  },
  {
    path: '/sms-categories',
    component: SMSCategoriesPage
  },
  {
    path: '/sms-category/edit/:eid',
    component: SMSCategoryPage
  },
  {
    path: '/sms-category/add',
    component: SMSCategoryPage
  },
  {
    path: '/sms-phones',
    component: SMSPhonesPage
  },
  {
    path: '/sms-phone/edit/:eid',
    component: SMSPhonePage
  },
  {
    path: '/sms-phone/add',
    component: SMSPhonePage
  },
  {
    path: '/sms-messages',
    component: SMSMessagesPage
  },
  {
    path: '/sms-message/edit/:eid',
    component: SMSMessagePage
  },
  {
    path: '/sms-message/add',
    component: SMSMessagePage
  },
  {
    path: '/sms-history',
    component: SMSHistoryPage
  },
  {
    path: '/users',
    component: UsersPage
  },
  {
    path: '/peer-navigators',
    component: PeerNavigatorsPage
  },
  {
    path: '/phones',
    component: PhonesPage
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
    path: '/data-dictionary',
    component: DictionaryPage
  },
  {
    path: '/study-followup',
    component: StudyFollowupPage
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
    path: '/peer-navigator-facilities',
    component: PeerNavigatorFacilitiesPage
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
    path: '/last-seen',
    component: LastSeenPage
  },
  {
    path: '/conversations',
    component: ConversationsPage
  },
  {
    path: '/notifications',
    component: NotificationsPage
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
    path: '/pfacility/add',
    component: FacilityPage
  },
  {
    path: '/pfacility/edit/:eid',
    component: FacilityPage
  },
  {
    path: '/phone/edit/:eid',
    component: PhonePage
  },
  {
    path: '/phone/participants/:eid',
    component: PhoneParticipantsPage
  },
  {
    path: '/phone/conversations/:eid',
    component: PhoneConversationsPage
  },
  {
    path: '/phone/chat/:eid',
    component: ChatPage
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
    path: '/notification/add',
    component: NotificationPage
  },
  {
    path: '/notification/edit/:eid',
    component: NotificationPage
  },
  {
    path: '/discussion/edit/:eid',
    component: DiscussionPage
  }, {
    path: '/discussion/chat/:eid',
    component: ForumPage
  }, {
    path: '/discussion/post/:fid/edit/:eid',
    component: PostPage
  }, {
    path: '/file-manager',
    component: FileManager
  }, {
    path: '/quizzes',
    component: Quizzes
  }, {
    path: '/quiz-attempts',
    component: QuizAttempts
  },
  {
    path: '/quiz/add',
    component: QuizPage
  },
  {
    path: '/quiz/edit/:eid',
    component: QuizPage
  },
  {
    path: '/quiz-attempt/edit/:eid',
    component: QuizAttemptPage
  },
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
