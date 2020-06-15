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
          :click="() => {$router.push({name: 'Store'})}"
          text="Store"
          :current="$router.currentRoute.name === 'Store'"
        />

        <MenuItemHorizontal
          icon="scroll"
          :click="() => {$router.push({name: 'Courses'}) }"
          text="Courses"
          :current="$router.currentRoute.name === 'Courses'"
        />

        <MenuItemHorizontal
          icon="puzzle-piece"
          text="Modules"
          :sub-items="modules"
          :click="() => {$router.push({name: 'Modules'}) }"
          :current="$router.currentRoute.name === 'Modules'"
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
            <router-link
              to="/store"
            >
              <div
                id="balance"
                class="nav-item left"
              >
                <FontAwesomeIcon
                  icon="gem"
                />
                {{ $store.getters.getBalance }}
              </div>
            </router-link>

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
  isLoggedIn,
  logout,
  getCourses,
  getLastGemTransaction,
  getProducts
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    MenuItemHorizontal
  },
  data(){
    return {
      modules: []
    };
  },
  async mounted(){
    this.loadBalance();
    this.loadModules();
    this.loadProducts();
  },
  methods: {
    logout(){
      logout();
      this.$store.commit('setIsLoggedIn', isLoggedIn());
    },
    async loadModules(){
      try {
        const courses = await getCourses();
        if (courses.length > 0) {
          let modules = [];
          for (const mod of courses[0].Modules) {
            modules.push({
              text: mod.Title
            });
          }
          this.modules = modules;
        }
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async loadBalance(){
      try {
        const lastGemTransaction = await getLastGemTransaction();
        this.$store.commit('setBalance', lastGemTransaction.Balance);
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    async loadProducts(){
      try {
        const products = await getProducts();
        this.$store.commit('setProducts', products);
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
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

    #balance {
      color: $purple-lighter;
      font-size: 2em;
    }

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
