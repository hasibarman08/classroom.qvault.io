<template>
  <div>
    <div
      id="item"
      :class="{'current': current}"
      @click="click"
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
        :class="{'current': subItem.uuid === activeSubItemUUID}"
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
      required: false,
      default: () => {}
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
    },
    current:{
      type: Boolean,
      required: false,
      default: false
    },
    subItemsTabOpen:{
      type: Boolean,
      required: false,
      default: false
    },
    activeSubItemUUID:{
      type: String,
      required: false,
      default: null
    }
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
  color: $white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.current {
    color: $gold-light;
  }

  span {
      margin-left: 15px;
      transition: 0.4s;
  }

  .icon {
      margin-left: 15px;
  }

  .arrow {
    margin-left: 25px;
    transition: all 0.4s ease;

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
    cursor: text;

    span {
      padding-left: 20px;
    }

    &.current {
      border-color: $purple-mid;
      color: $purple-lighter;
    }
  }
}

</style>
