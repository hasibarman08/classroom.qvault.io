<template>
  <div
    id="overlay"
    :style="{height: isOpen ? '100%' : '0%'}"
  >
    <div id="content">
      <p>{{ text }}</p>
      <BlockButton
        class="btn"
        :click="() => {onConfirm(); closeNav()}"
      >
        Confirm
      </BlockButton>
      <BlockButton
        class="btn"
        :click="closeNav"
        type="cancel"
      >
        Cancel
      </BlockButton>
    </div>
  </div>
</template>
 
<script>
import BlockButton from '@/components/BlockButton';

export default {
  components: {
    BlockButton
  },
  props: {
    onConfirm:{
      type: Function,
      required: true
    }
  },
  data(){
    return {
      isOpen: false,
      text: null
    };
  },
  methods: {
    openNav(text){
      this.isOpen = true;
      this.text = text;
    },
    closeNav(){
      this.isOpen = false;
    }
  }
};
</script> 

<style scoped lang="scss">
@import '@/styles/colors.scss';

#overlay {
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.95);
  overflow-y: hidden;
  transition: 0.5s;

  p {
    padding: 8px;
    font-size: 2em;
    color: $white;
  }

  #content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;

    .btn {
      font-size: 24px;
      padding: 10px 30px 10px 30px;
      margin: 15px;
    }
  }
}
</style>
