<template>
  <div class="container">
    <FontAwesomeIcon
      icon="dumbbell"
      class="icon"
    />
    <ScaleBar
      :circles-total="6" 
      :circles-progress="difficulty + 1"
      :fill-color="color"
    />
    <FontAwesomeIcon
      icon="dumbbell"
      class="icon"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ScaleBar from '@/components/ScaleBar';

export default {
  components: {
    ScaleBar,
    FontAwesomeIcon
  },
  props: {
    difficulty: {
      type: Number,
      required: true
    }
  },
  computed:{
    color(){
      if (this.difficulty === 1){
        return '#e058ae';
      }
      if (this.difficulty === 2){
        return '#d82e9a';
      }
      if (this.difficulty === 3){
        return '#ad257b';
      }
      if (this.difficulty === 4){
        return '#821c5c';
      }
      if (this.difficulty === 5){
        return '#56123e';
      }
      return '#ffffff';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.container {
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    color: $gray-lighter;
    margin: .5em;
  }

  span {
    color: $gray-lighter;
    margin-right: .5em;
  }
}
</style>
