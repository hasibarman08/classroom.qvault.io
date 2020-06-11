<template>
  <div id="app">
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

#app{
  height: 100%;
}
</style>
