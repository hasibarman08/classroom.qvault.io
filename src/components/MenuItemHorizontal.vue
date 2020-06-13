<template>
  <div>
    <div
      id="item"
      @click="() => {
        click(); 
        subItems.length > 0 ? subItemsTabOpen = !subItemsTabOpen : null
      }"
    >
      <FontAwesomeIcon
        :icon="icon"
        class="icon"
      />
      <span>{{ text }}</span>
      <FontAwesomeIcon
        v-if="subItems.length > 0"
        class="arrow"
        :class="{'is-open': subItemsTabOpen}"
        icon="arrow-right"
      />
    </div>
    <div
      v-if="subItems.length > 0"
      id="sub-items"
      :style="{maxHeight: subitemsTabHeight + 'px'}"
    >
      <div 
        v-for="(subItem, i) of subItems"
        :key="i"
        class="sub-item"
        @click="()=> {subItem.click ? subItem.click() : null}"
      >
        <span>{{ i + 1 }}) {{ subItem.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon
  },
  props: { 
    click:{
      type: Function,
      required: true
    },
    icon:{
      type: String,
      required: true
    },
    text:{
      type: String,
      required: true
    },
    subItems:{
      type: Array,
      required: false,
      default: () => []
    }
  },
  data(){
    return {
      subItemsTabOpen: false
    };
  },
  computed: {
    subitemsTabHeight(){
      return this.subItemsTabOpen ? this.subitemsTabHeightExpanded : 0;
    },
    subitemsTabHeightExpanded(){
      return this.subItems.length * 30;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#item {
  height: 50px;
  line-height: 50px;
  font-size: 18px;

  &:hover{
    background-color: $gray-darker;
    cursor: pointer;

    span {
    margin-left: 25px;
    }
  }

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
}

#sub-items {
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

</style>
