import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Tables from '@/views/TablesView.vue'
import decode from 'jwt-decode';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return;
  const date = new Date().getTime() / 1000;
  const data = decode(token);
  if (!data) return;
  return date < data.exp;
}

const routes = [

  {
    meta: {
      title: 'Dashboard',
    },
    path: '/',
    name: 'Dashboard',
    component: Home
  },

    {
      meta: {
        title: 'Users'
      },
      path: '/users',
      name: 'Users',
      component: () => import('@/views/CRUD/Users/UsersView.vue'),
    },
    {
      meta: {
        title: 'New Users'
      },
      path: '/users/new',
      name: 'NewUsers',
      component: () => import('@/views/CRUD/Users/UsersNew.vue'),
    },
    {
      meta: {
        title: 'Edit Users'
      },
      path: '/users/:id/edit',
      name: 'EditUsers',
      component: () => import('@/views/CRUD/Users/UsersEdit.vue'),
    },

    {
      meta: {
        title: 'Activities'
      },
      path: '/activities',
      name: 'Activities',
      component: () => import('@/views/CRUD/Activities/ActivitiesView.vue'),
    },
    {
      meta: {
        title: 'New Activities'
      },
      path: '/activities/new',
      name: 'NewActivities',
      component: () => import('@/views/CRUD/Activities/ActivitiesNew.vue'),
    },
    {
      meta: {
        title: 'Edit Activities'
      },
      path: '/activities/:id/edit',
      name: 'EditActivities',
      component: () => import('@/views/CRUD/Activities/ActivitiesEdit.vue'),
    },

    {
      meta: {
        title: 'Contacts'
      },
      path: '/contacts',
      name: 'Contacts',
      component: () => import('@/views/CRUD/Contacts/ContactsView.vue'),
    },
    {
      meta: {
        title: 'New Contacts'
      },
      path: '/contacts/new',
      name: 'NewContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Contacts'
      },
      path: '/contacts/:id/edit',
      name: 'EditContacts',
      component: () => import('@/views/CRUD/Contacts/ContactsEdit.vue'),
    },

    {
      meta: {
        title: 'Deals'
      },
      path: '/deals',
      name: 'Deals',
      component: () => import('@/views/CRUD/Deals/DealsView.vue'),
    },
    {
      meta: {
        title: 'New Deals'
      },
      path: '/deals/new',
      name: 'NewDeals',
      component: () => import('@/views/CRUD/Deals/DealsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Deals'
      },
      path: '/deals/:id/edit',
      name: 'EditDeals',
      component: () => import('@/views/CRUD/Deals/DealsEdit.vue'),
    },

    {
      meta: {
        title: 'Email_campaigns'
      },
      path: '/email_campaigns',
      name: 'Email_campaigns',
      component: () => import('@/views/CRUD/Email_campaigns/Email_campaignsView.vue'),
    },
    {
      meta: {
        title: 'New Email_campaigns'
      },
      path: '/email_campaigns/new',
      name: 'NewEmail_campaigns',
      component: () => import('@/views/CRUD/Email_campaigns/Email_campaignsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Email_campaigns'
      },
      path: '/email_campaigns/:id/edit',
      name: 'EditEmail_campaigns',
      component: () => import('@/views/CRUD/Email_campaigns/Email_campaignsEdit.vue'),
    },

    {
      meta: {
        title: 'Leads'
      },
      path: '/leads',
      name: 'Leads',
      component: () => import('@/views/CRUD/Leads/LeadsView.vue'),
    },
    {
      meta: {
        title: 'New Leads'
      },
      path: '/leads/new',
      name: 'NewLeads',
      component: () => import('@/views/CRUD/Leads/LeadsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Leads'
      },
      path: '/leads/:id/edit',
      name: 'EditLeads',
      component: () => import('@/views/CRUD/Leads/LeadsEdit.vue'),
    },

    {
      meta: {
        title: 'Reports'
      },
      path: '/reports',
      name: 'Reports',
      component: () => import('@/views/CRUD/Reports/ReportsView.vue'),
    },
    {
      meta: {
        title: 'New Reports'
      },
      path: '/reports/new',
      name: 'NewReports',
      component: () => import('@/views/CRUD/Reports/ReportsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Reports'
      },
      path: '/reports/:id/edit',
      name: 'EditReports',
      component: () => import('@/views/CRUD/Reports/ReportsEdit.vue'),
    },

    {
      meta: {
        title: 'Tags'
      },
      path: '/tags',
      name: 'Tags',
      component: () => import('@/views/CRUD/Tags/TagsView.vue'),
    },
    {
      meta: {
        title: 'New Tags'
      },
      path: '/tags/new',
      name: 'NewTags',
      component: () => import('@/views/CRUD/Tags/TagsNew.vue'),
    },
    {
      meta: {
        title: 'Edit Tags'
      },
      path: '/tags/:id/edit',
      name: 'EditTags',
      component: () => import('@/views/CRUD/Tags/TagsEdit.vue'),
    },

    {
      meta: {
        title: 'Tasks'
      },
      path: '/tasks',
      name: 'Tasks',
      component: () => import('@/views/CRUD/Tasks/TasksView.vue'),
    },
    {
      meta: {
        title: 'New Tasks'
      },
      path: '/tasks/new',
      name: 'NewTasks',
      component: () => import('@/views/CRUD/Tasks/TasksNew.vue'),
    },
    {
      meta: {
        title: 'Edit Tasks'
      },
      path: '/tasks/:id/edit',
      name: 'EditTasks',
      component: () => import('@/views/CRUD/Tasks/TasksEdit.vue'),
    },

  {
    meta: {
      title: 'Change Password'
    },
    path: '/change_password',
    name: 'Change Password',
    component: () => import('@/views/ChangePasswordView.vue'),
  },
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
    {
      meta: {
        title: 'Register',
        fullScreen: true
      },
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      meta: {
        title: 'Verify',
        fullScreen: true
      },
      path: '/verify-email',
      name: 'Verify',
      component: () => import('@/views/VerifyEmailView.vue')
    },
    {
      meta: {
        title: 'Forgot',
        fullScreen: true
      },
      path: '/forgot',
      name: 'Forgot',
      component: () => import('@/views/ForgotPasswordView.vue')
    },
    {
      meta: {
        title: 'Reset',
        fullScreen: true
      },
      path: '/password-reset',
      name: 'Reset',
      component: () => import('@/views/ResetPasswordView.vue')
    },
  {
    meta: {
      title: 'Error',
      fullScreen: true
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
    {
      meta: {
        title: 'Starter',
        fullScreen: true
      },
      path: '/starter',
      name: 'Starter',
      component: () => import('@/views/StarterView.vue')
    },
    {
        meta: {
          title: 'Profile',
        },
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue')
      }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(async (to, from) => {
  if (
    !isAuthenticated() && !['Login', 'Register', 'Verify', 'Reset', 'Forgot', 'Starter'].includes(to.name)
  ) {
    return { name: 'Starter' }
  }
})

export default router
