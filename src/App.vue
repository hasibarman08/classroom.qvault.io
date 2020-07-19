<template>
  <div id="app">
    <notifications
      :duration="3000"
      classes="custom-notification"
    />
    <router-view />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faArrowRight, 
  faUserTie,
  faScroll,
  faPuzzlePiece,
  faSignOutAlt,
  faPlay,
  faCheck,
  faStore,
  faTimes,
  faUndo,
  faBars
} from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight);
library.add(faUserTie);
library.add(faScroll);
library.add(faPuzzlePiece);
library.add(faSignOutAlt);
library.add(faPlay);
library.add(faCheck);
library.add(faStore);
library.add(faTimes);
library.add(faUndo);
library.add(faBars);

export default {
  
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
