import Vue from 'vue';
import VueRouter from 'vue-router';
import Courses from '../views/Courses.vue';
import Profile from '../views/Profile.vue';
import Modules from '../views/Modules.vue';
import Store from '../views/Store.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Modules',
    component: Modules
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
];

const router = new VueRouter({
  routes
});

// Supress redundant navigation errors
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(function (err) {
    if (err.toString().includes('redundant')){
      return;
    }
    throw err;
  });
};

export default router;
