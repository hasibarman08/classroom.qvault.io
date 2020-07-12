<template>
  <GoogleLogin
    id="button"
    :params="googleButtonParams"
    :on-success="onSuccess"
    :on-failure="onFailure"
  >
    <img src="https://img.icons8.com/color/48/000000/google-logo.png">
    <span>{{ text }}</span>
  </GoogleLogin>
</template>

<script>
import { GoogleLogin } from 'vue-google-login';

export default {
  components: {
    GoogleLogin
  },
  props: {
    text: {
      type: String,
      required: true
    },
    onSuccess: {
      type: Function,
      required: true
    }
  },
  data(){
    return {
      googleButtonParams: {
        client_id: '44792168937-1rpf8k8v1uv7eqoc8u2bg8qaenkfj41n.apps.googleusercontent.com'
      }
    };
  },
  methods:{
    onFailure(){
      // do nothing
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#button {
  display: inline-block;
  background: $white;
  color: $gray-mid;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  white-space: nowrap;
  padding: 4px;
  outline: none;

  img {
    display: inline-block;
    vertical-align: middle;
    width: 38px;
    height: 38px;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.8);
  }
}

</style>
