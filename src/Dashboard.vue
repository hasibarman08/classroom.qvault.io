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

        <div
          class="item"
          @click="$router.push({name: 'Store'})"
        >
          <FontAwesomeIcon
            icon="store"
            class="icon"
          />
          <span>Store</span>
        </div>

        <div
          class="item"
          @click="$router.push({name: 'Courses'})"
        >
          <FontAwesomeIcon
            icon="scroll"
            class="icon"
          />
          <span>Courses</span>
        </div>
            
        <div
          class="item"
          @click="modulesTabOpen = !modulesTabOpen"
        >
          <FontAwesomeIcon
            icon="puzzle-piece"
            class="icon"
          />
          <span>Modules</span>
          <FontAwesomeIcon
            class="arrow"
            :class="{'is-open': modulesTabOpen}"
            icon="arrow-right"
          />
        </div>
        <div
          class="sub-items"
          :style="{maxHeight: modulesTabHeight + 'px'}"
        >
          <div 
            v-for="(mod, i) of modules"
            :key="i"
            class="sub-item"
          >
            <span>{{ i + 1 }}) {{ mod.title }}</span>
          </div>
        </div>
        
        <div
          class="item"
        >
          <FontAwesomeIcon
            icon="sign-out-alt"
            class="icon"
          />
          <span>Logout</span>
        </div>
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
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    Footer,
    FontAwesomeIcon
  },
  data(){
    return {
      course: 'Go Mastery',
      modulesTabOpen: false,
      modules: [
        {
          title: 'Types'
        },
        {
          title: 'Functions'
        }
      ]
    };
  },
  computed: {
    modulesTabHeight(){
      return this.modulesTabOpen ? this.modulesTabHeightExpanded : 0;
    },
    modulesTabHeightExpanded(){
      return this.modules.length * 30;
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
  }

  .item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin-bottom: 1em;

    span {
      margin-left: 15px;
      transition: 0.4s;
    }

    .icon {
      margin-left: 15px;
      color: $white;
    }

    .arrow {
      margin-left: 25px;
      transition: all 0.4s ease;
      color: $white;

      &.is-open {
        transform: rotateZ(90deg);
      }
    }

    &:hover{
      background-color: $gray-darker;
      cursor: pointer;

      span {
        margin-left: 25px;
      }
    }
  }

  .sub-items {
    overflow: hidden;
    transition: max-height 0.2s linear 0s;

    .sub-item {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border: solid $white;
      border-width: 0 0 0 1px;
      margin-left: 30px;

      span {
        padding-left: 20px;
      }

      &:hover{
        cursor: pointer;
        border-color: $purple-mid;
      }
    }
  }
} 

#content {
	display: inline-block;
	vertical-align: top;
	height: 100%;
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
