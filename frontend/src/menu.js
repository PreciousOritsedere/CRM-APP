import {
  mdiDesktopMac,
  mdiSquareEditOutline,
  mdiTable,
  mdiLock,
  mdiFileDocumentOutline
} from '@mdi/js'

const externalLink = () => {
  return process.env.NODE_ENV === 'production' ? window.location.origin + '/api-docs' : 'http://localhost:8080/api-docs';
}

export default [
  'General',
  [
    {
      to: '/',
      label: 'Dashboard',
      icon: mdiDesktopMac
    }
  ],
  'Entities',
  [

  {
    to: '/users',
    label: 'Users',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Users/UsersView.vue'),
},

  {
    to: '/activities',
    label: 'Activities',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Activities/ActivitiesView.vue'),
},

  {
    to: '/contacts',
    label: 'Contacts',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Contacts/ContactsView.vue'),
},

  {
    to: '/deals',
    label: 'Deals',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Deals/DealsView.vue'),
},

  {
    to: '/email_campaigns',
    label: 'Email campaigns',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Email_campaigns/Email_campaignsView.vue'),
},

  {
    to: '/leads',
    label: 'Leads',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Leads/LeadsView.vue'),
},

  {
    to: '/reports',
    label: 'Reports',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Reports/ReportsView.vue'),
},

  {
    to: '/tags',
    label: 'Tags',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Tags/TagsView.vue'),
},

  {
    to: '/tasks',
    label: 'Tasks',
    icon: mdiTable,
    component: () => import('@/views/CRUD/Tasks/TasksView.vue'),
},

    {
      to: '/change_password',
      label: 'Change Password',
      icon: mdiLock,
      component: () => import('@/views/ChangePasswordView.vue'),
    },
    {
      href: externalLink(),
      label: 'API docs',
      icon: mdiFileDocumentOutline,
    },
  ],
]
