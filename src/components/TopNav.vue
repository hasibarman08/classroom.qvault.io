<template>
  <div id="nav">
    <div class="item-group">
      <a
        v-if="showLogo"
        href="https://qvault.io"
        target="_blank"
        class="item"
      >
        <img
          alt="Qvault logo"
          src="../img/qvault-icon-250.png"
        >
      </a>
    </div>
    <div class="item-group">
      <a
        href="https://classroom.qvault.io"
        class="item"
      >
        <span>Dashboard</span>
      </a>   
      <a
        href="/playground/go"
        class="item"
      >
        <span>Playground</span>
      </a>   
      <a
        href="https://qvault.io/contact"
        target="_blank"
        class="item"
      >
        <span>Contact</span>
      </a>   
      <a
        href="https://qvault.io/articles"
        target="_blank"
        class="item"
      >
        <span>Blog</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLogo: {
      default: true,
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

$bar-height: 60px;

#nav {
  height: $bar-height;
  background-color: $gray-darkest;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.1em;

  .item-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .item {
      color: $white;
      cursor: pointer;
      height: 100%;
      padding-left: 20px;
      padding-right: 20px;
      display: flex;
      align-items: center;
      text-decoration: none;

      img {
        vertical-align: middle;
        width: 40px;
      }

      &.current {
        color: $gold-mid;
      }

      &:hover{
        background-color: $gray-darker;
      }
    }
  }
}
</style>
