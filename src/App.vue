<template>
  <div id="app">
    <notifications
      :duration="3000"
      classes="custom-notification"
    />
    <Dashboard v-if="isLoggedIn" />
    <Login v-else />
  </div>
</template>

<script>
import { isLoggedIn } from '@/lib/cloudClient.js';
import Dashboard from '@/Dashboard.vue';
import Login from '@/Login.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faArrowRight, 
  faUserTie,
  faScroll,
  faPuzzlePiece,
  faSignOutAlt,
  faPlay,
  faGem,
  faCheck,
  faStore
} from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);
library.add(faUserTie);
library.add(faScroll);
library.add(faPuzzlePiece);
library.add(faSignOutAlt);
library.add(faPlay);
library.add(faGem);
library.add(faCheck);
library.add(faStore);

export default {
  components: {
    Dashboard,
    Login
  },
  computed: {
    isLoggedIn(){
      return isLoggedIn();
    }
  }
};
</script>

<style lang="scss">
@import 'styles/styles.scss';
@import 'styles/colors.scss';

#app{
  height: 100%;
}

.vue-notification-group{
  margin: 60px 10px 0 0;
}

.custom-notification {
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
 
  font-size: 1em;
 
  color: $white;
  background: $purple-mid !important;
  border-left: 5px solid $gray-lightest;
 
  &.warn {
    background: $gold-mid !important;
    border-left-color: 5px solid $pink;
  }
 
  &.error {
    background: $pink !important;
    border-left-color: 5px solid $gray-dark;
  }
 
  &.success {
    background: $purple-mid !important;
    border-left-color: 5px solid $gray-lightest;
  }
}
</style>
