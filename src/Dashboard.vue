<template>
  <div id="dashboard">
    <div id="container">
      <div id="sidebar">
        <div class="logo-item">
          <img
            alt="Qvault logo"
            src="./img/qvault-icon.png"
          >
          <span> Qvault Classroom </span>
        </div>

        <MenuItemHorizontal
          icon="store"
          class="item"
          :click="() => {$router.push({name: 'Store'})}"
          text="Store"
        />

        <MenuItemHorizontal
          class="item"
          icon="scroll"
          :click="() => {$router.push({name: 'Courses'}) }"
          text="Courses"
        />

        <MenuItemHorizontal
          class="item"
          icon="puzzle-piece"
          :click="() => { modulesTabOpen = !modulesTabOpen }"
          text="Modules"
          :sub-items="modules"
        />

        <MenuItemHorizontal
          class="item"
          icon="sign-out-alt"
          :click="logout"
          text="Logout"
        />
      </div>

      <div id="content">
        <div>
          <div id="nav">
            <router-link
              to="/profile"
            >
              <div class="nav-item">
                <FontAwesomeIcon
                  icon="user-tie"
                  class="icon"
                />
              </div>
            </router-link>

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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import MenuItemHorizontal from '@/components/MenuItemHorizontal';
import { 
  logout
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    MenuItemHorizontal
  },
  data(){
    return {
      course: 'Go Mastery',
      modulesTabOpen: false,
      modules: [
        {
          text: 'Types'
        },
        {
          text: 'Functions'
        }
      ]
    };
  },
  methods: {
    logout(){
      logout();
      location.reload();
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

$bar-height: 60px;

#dashboard {
  height: 100%;
}

#container {
	height: 100%;
  display: flex;
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

    a {
      color: $white;
      text-decoration: none;
    }

    .router-link-exact-active {
      color: $gold-mid;
    }

    .nav-item {
      float: right;
      height: 100%;
      padding-left: 20px;
      padding-right: 20px;
      line-height: $bar-height;

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
