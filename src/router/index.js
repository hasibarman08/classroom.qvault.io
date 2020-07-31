import Vue from 'vue';
import VueRouter from 'vue-router';
import Courses from '../views/Courses.vue';
import CourseProduct from '../views/CourseProduct.vue';
import Profile from '../views/Profile.vue';
import Exercise from '../views/Exercise.vue';
import Store from '../views/Store.vue';
import CouponCode from '../views/CouponCode.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Playground from '../views/Playground.vue';
import Portfolio from '../views/Portfolio.vue';

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
        path: 'courses',
        name: 'Courses',
        component: Courses
      },
      {
        path: 'course_product/:courseUUID',
        name: 'CourseProduct',
        component: CourseProduct
      },
      {
        path: 'exercise/:courseUUID/:moduleUUID?',
        name: 'Exercise',
        component: Exercise
      },
      {
        path: 'store',
        name: 'Store',
        component: Store
      },
      {
        path: 'coupon_code',
        name: 'CouponCode',
        component: CouponCode
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/playground/:lang',
    name: 'Playground',
    component: Playground
  },
  {
    path: '/portfolio/:userUUID',
    name: 'Portfolio',
    component: Portfolio
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// Redirect if path begins with a hash (ignore hashes later in path)
router.beforeEach((to, from, next) => {
  // Redirect if fullPath begins with a hash (ignore hashes later in path)
  if (to.fullPath.substr(0, 2) === '/#') {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
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
