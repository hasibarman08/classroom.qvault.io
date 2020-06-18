<template>
  <div id="app">
    <notifications
      :duration="3000"
      classes="custom-notification"
    />
    <Dashboard v-if="$store.getters.getIsLoggedIn" />
    <Login v-else />
  </div>
</template>

<script>
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
  faStore,
  faCertificate,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  isLoggedIn
} from '@/lib/cloudClient.js';

library.add(faArrowRight);
library.add(faUserTie);
library.add(faScroll);
library.add(faPuzzlePiece);
library.add(faSignOutAlt);
library.add(faPlay);
library.add(faGem);
library.add(faCheck);
library.add(faStore);
library.add(faCertificate);
library.add(faTimes);

export default {
  components: {
    Dashboard,
    Login
  },
  mounted(){
    this.$store.commit('setIsLoggedIn', isLoggedIn());
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
  border-right: 5px solid $gray-darker;
 
  &.warn {
    background: $gold-mid !important;
  }
 
  &.error {
    background: $pink-mid !important;
  }
 
  &.success {
    background: $green-dark !important;
  }
}
</style>
