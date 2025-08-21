export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Administration',
    icon: 'folder',
    items: [
      {
        text: 'Users',
        path: '/users'
      },
      {
        text: 'Resources',
        path: '/resources'
      },
      {
        text: 'Facilities',
        path: '/facilities'
      },
      {
        text: 'PN Facilities',
        path: '/peer-navigator-facilities'
      },
      {
        text: 'Countries',
        path: '/countries'
      }
      ,
      {
        text: 'Colors',
        path: '/colors'
      },
      {
        text: 'Notifications',
        path: '/notifications'
      },
      {
        text: 'Gallery',
        path: '/file-manager'
      }
    ]
  },
  {
    text: 'Twyshe Main App',
    icon: 'product',
    items: [
      {
        text: 'Peer Navigators',
        path: '/peer-navigators'
      },
      {
        text: 'Participants',
        path: '/participants'
      },
      {
        text: 'Followups',
        path: '/follow-ups'
      },
      {
        text: 'Usage Analytics',
        path: '/analytics'
      },
      {
        text: 'Data Dictionary',
        path: '/data-dictionary'
      },
      {
        text: 'Study Followup',
        path: '/study-followup'
      },
    ]
  },
  {
    text: 'Twyshe Messenger',
    icon: 'message',
    items: [
      {
        text: 'Phones',
        path: '/phones'
      },
      {
        text: 'Last Seen',
        path: '/last-seen'
      },
      {
        text: 'Discussions',
        path: '/discussions'
      },
      {
        text: 'Conversations',
        path: '/conversations'
      },
      {
        text: 'Quizzes',
        path: '/quizzes'
      },
      {
        text: 'Quiz Attempts',
        path: '/quiz-attempts'
      },
    ]
  }
];
