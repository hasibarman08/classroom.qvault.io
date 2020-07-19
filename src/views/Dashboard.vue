<template>
  <div id="dashboard">
    <div id="dashboard-container">
      <div id="sidebar">
        <div class="logo-item">
          <img
            alt="Qvault logo"
            src="../img/qvault-icon.png"
          >
          <span> Qvault Classroom </span>
        </div>

        <MenuItemHorizontal
          icon="store"
          :click="() => {$router.push({name: 'Store'})}"
          text="Store"
          :current="$router.currentRoute.name === 'Store'"
        />

        <MenuItemHorizontal
          icon="scroll"
          :click="() => {$router.push({name: 'Courses'}) }"
          text="Courses"
          :current="$router.currentRoute.name === 'Courses' || $router.currentRoute.name === 'CourseProduct'"
        />

        <MenuItemHorizontal
          v-for="(course, i) of activeCourses"
          :key="i"
          icon="puzzle-piece"
          :text="course.Title"
          :sub-items="modulesToSubItems(course.Modules)"
          :click="() => {$router.push({name: 'Exercise', params: {courseUUID: course.UUID}}) }"
          :sub-items-tab-open="$router.currentRoute.params.courseUUID === course.UUID"
          :active-sub-item-u-u-i-d="$store.getters.getCurrentModuleUUID"
          :current="$router.currentRoute.params.courseUUID === course.UUID"
        />

        <MenuItemHorizontal
          icon="user-tie"
          :click="() => {$router.push({name: 'Profile'}) }"
          text="Profile"
          :current="$router.currentRoute.name === 'Profile'"
        />

        <MenuItemHorizontal
          icon="cubes"
          :click="() => {$router.push({name: 'Playground', params: {lang: 'go'}}) }"
          text="Playground"
          :current="$router.currentRoute.name === 'Playground'"
        />

        <MenuItemHorizontal
          icon="sign-out-alt"
          :click="logout"
          text="Logout"
        />
      </div>

      <div id="content">
        <div>
          <div id="nav">
            <div
              id="balance"
              class="nav-item left"
              @click="() => {$router.push({name: 'Store'})}"
            >
              <GemDisplay :cost="$store.getters.getBalance" />
            </div>

            <a
              href="https://qvault.io"
              target="_blank"
            >
              <div class="nav-item">
                <span>Blog</span>
              </div>
            </a>
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItemHorizontal from '@/components/MenuItemHorizontal';
import GemDisplay from '@/components/GemDisplay';
import {
  getRewards
} from '@/lib/cloudClient.js';

import {
  loadCourses,
  loadBalance,
  loadProducts,
  loadUser,
  loadLoggedIn,
  setLogout
} from '@/lib/cloudStore.js';

export default {
  components: {
    MenuItemHorizontal,
    GemDisplay
  },
  computed: {
    activeCourses(){
      return this.$store.getters.getCourses.filter(course => course.IsPurchased);
    }
  },
  async mounted(){
    loadLoggedIn(this);  
    loadCourses(this);
    loadProducts(this);
    loadUser(this);

    await this.loadRewards();
    loadBalance(this);
  },
  methods: {
    async loadRewards(){
      try {
        const rewards = await getRewards();
        for (const reward of rewards.Rewards){
          this.$notify({
            type: 'success',
            text: `${reward.Message} 💎x${reward.GemCredit}`
          });
        }
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    modulesToSubItems(modules){
      let subItems = [];
      for (const mod of modules) {
        subItems.push({
          text: mod.Title,
          uuid: mod.UUID
        });
      }
      return subItems;
    },
    logout(){
      setLogout(this);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

$bar-height: 60px;

#dashboard {
  height: 100%;

  #dashboard-container {
    height: 100%;
    display: flex;
  }
}

#sidebar {
	display: inline-block;
	vertical-align: top;
	height: 100%;
  flex-basis: 16%;
  min-width: 200px;
	overflow: auto;
  background-color: $gray-darkest;
  color: $gray-lightest;

  .logo-item {
    text-align: center;
    line-height: $bar-height;
    height: $bar-height;
    color: $gray-lightest;
    text-decoration: none;
    border: solid $gray-darker;
    border-width: 0 1px 1px 0;
    margin-bottom: 20px;

    img {
      vertical-align: middle;
      width: 35px;
    }

    span {
      margin-left: 10px;
    }
  }
}

#content {
	display: inline-block;
	vertical-align: top;
	height: 100vh;
	overflow: auto;
  flex: 1;
  background-color: $gray-lightest;

  #nav {
    height: $bar-height;
    background-color: $gray-darkest;

    #balance {
      color: $purple-lighter;
      font-size: 2em;
    }

    a {
      color: $white;
      text-decoration: none;
    }

    .nav-item {
      color: $white;
      cursor: pointer;
      float: right;
      height: 100%;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      align-items: center;

      &.current {
        color: $gold-mid;
      }

      &.left {
        float: left;
      }

      &:hover{
        background-color: $gray-darker;
      }

      .icon {
        font-size: 22px;
      }
    }
  }
}
</style>
