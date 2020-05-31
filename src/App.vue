<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '@/Dashboard.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faArrowRight, 
  faUserTie,
  faScroll,
  faPuzzlePiece,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);
library.add(faUserTie);
library.add(faScroll);
library.add(faPuzzlePiece);
library.add(faSignOutAlt);

export default {
  components: {
    Dashboard
  }
};
</script>

<style lang="scss">
@import 'styles/styles.scss';

#app{
  height: 100%;
}
</style>
