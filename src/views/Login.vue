<template>
  <div
    id="container"
    :style="{ backgroundImage: 'url(' + require('@/img/login-bg.jpg') + ')' }"
  >
    <div class="blur">
      <a
        id="logo-link"
        href="https://qvault.io"
      >
        <img
          id="logo"
          alt="Qvault logo"
          src="../img/qvault-icon-250.png"
        >
      </a>
          
      <div class="panel">
        <div id="left">
          <span id="title">Welcome to Qvault</span>

          <div id="sub-title-container">
            <span>
              Learn to program. Earn content by doing well.
            </span>
          </div>

          <div
            v-if="state === 'register'"
          >
            <RegisterForm class="top" />
            <div class="bottom">
              <span>Have an account? <a @click="state='login'">Login</a></span>
            </div>
          </div>

          <div
            v-if="state === 'login'"
          >
            <LoginForm class="top" />
            <div class="bottom">
              <span>Need an account? <a @click="state='register'">Sign Up Free</a></span>
              <span><a @click="state='forgot-password'">Forgot Password?</a></span>
            </div>
          </div>
    
          <div
            v-if="state === 'forgot-password'"
          >
            <ForgotPasswordForm class="top" />
            <div class="bottom">
              <span><a @click="state='login'">Back</a></span>
            </div>
          </div>
        </div>

        <div id="right">
          <img
            id="side-image"
            alt="Transparent books in laptop"
            src="../img/laptop.png"
          >
          <div>
            <span class="title">
              Level-Up Your Career
            </span>
            <p>
              Other platforms barrage their users with endless content, 
              we curate a manageable list of courses that are perfect for you, our student.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isLoggedIn
} from '@/lib/cloudClient.js';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export default {
  components: {
    LoginForm,
    ForgotPasswordForm,
    RegisterForm
  },
  data() {
    return {
      state: 'register'
    };
  },
  mounted(){
    this.$store.commit('setIsLoggedIn', isLoggedIn());
    if (this.$store.getters.getIsLoggedIn){
      this.$router.push({name: 'Courses'});
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  background-color: $gray-darkest;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;

  .blur {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #logo-link {
      #logo {
        width: 75px;
        margin: 2em;
      }
    }

    .panel {
      background-color: $gray-lightest;
      flex: 1;
      min-height: 300px;

      @media (min-width: 600px) {
        width: 60vw;
      }

      display: flex;
      flex-flow: row wrap;
      align-items: stretch;
      box-shadow: 0 0 5em $gray-mid;
      margin-bottom: 2em;

      #left {
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding-top: 2em;
        background-color: inherit;

        #title {
          color: $gray-dark;
          font-size: 1.4em;
          margin-bottom: 1em;
        }

        #sub-title-container {
          font-size: 1em;
          color: $gray-light;
          margin-bottom: 2em;
        }
      }

      #right{
        padding: 2em;
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        background-color: $gold-light;
        color: $gray-lightest;
        text-align: center;

        #side-image {
          width: 300px;
          margin-bottom: 2em;
        }

        .title {
          font-size: 1.5em;
        }
      }

      .top {
        flex: 1;
        display: flex;
        flex-direction: row;
      }

      .bottom {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        span {
          margin-bottom: 10px;
          a {
            cursor: pointer;
          }
        }
      }
    }
  }
}

</style>
