import Vue from 'vue';
import VueRouter from 'vue-router';
import Courses from '../views/Courses.vue';
import CourseProduct from '../views/CourseProduct.vue';
import Profile from '../views/Profile.vue';
import Exercise from '../views/Exercise.vue';
import Store from '../views/Store.vue';
import Certificates from '../views/Certificates.vue';
import Dashboard from '../views/Dashboard.vue';
import Certificate from '../views/Certificate.vue';
import Login from '../views/Login.vue';
import Playground from '../views/Playground.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/courses',
        name: 'Courses',
        component: Courses
      },
      {
        path: '/course_product/:courseUUID',
        name: 'CourseProduct',
        component: CourseProduct
      },
      {
        path: '/exercise/:courseUUID/:moduleUUID?',
        name: 'Exercise',
        component: Exercise
      },
      {
        path: '/store',
        name: 'Store',
        component: Store
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/certificates',
        name: 'Certificates',
        component: Certificates
      }
    ]
  },
  {
    path: '/certificate/:userUUID/:courseUUID',
    name: 'Certificate',
    component: Certificate
  },
  {
    path: '/playground/:lang',
    name: 'Playground',
    component: Playground
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
