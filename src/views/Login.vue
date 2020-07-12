<template>
  <div id="container">
    <div id="title-container">
      <img
        alt="Qvault logo"
        src="../img/qvault-icon-250.png"
      >

      <span id="title">Qvault Classroom</span>

      <div id="sub-title-container">
        <span>
          <b>Learn to code online, anytime, anywhere.</b> The future of education is laser-focused on mastery, not due dates and test scores
        </span>
      </div>
    </div>

    <div
      v-if="state === 'register'"
      class="panel"
    >
      <RegisterForm />
      <div class="bottom">
        <span>Have an account? <a @click="state='login'">Login</a></span>
      </div>
    </div>

    <div
      v-if="state === 'login'"
      class="panel"
    >
      <LoginForm class="top" />
      <div class="bottom">
        <span>Need an account?<a @click="state='register'">Sign Up Free</a></span>
        <span><a @click="state='forgot-password'">Forgot Password?</a></span>
      </div>
    </div>
    
    <div
      v-if="state === 'forgot-password'"
      class="panel"
    >
      <ForgotPasswordForm class="top" />
      <div class="bottom">
        <span><a @click="state='login'">Back</a></span>
      </div>
    </div>

    <div id="widget-container">
      <div class="widget">
        <!-- https://icons8.com/icons/set/coin --> 
        <img src="https://img.icons8.com/nolan/64/certificate.png">
        <span>Earn a Certificate</span>
        <p>
          Add certificates to your resume!
          Stand out to land those interviews
        </p>
      </div>
      <div class="widget">
        <img src="https://img.icons8.com/nolan/64/coin-wallet.png">
        <span>Level-Up Your Salary</span>
        <p>
          Take our new <i>Go Mastery</i> course! Go devs make <b>$28k more per year</b> on average than JavaScript devs.
          <a
            href="https://insights.stackoverflow.com/survey/2020#technology-what-languages-are-associated-with-the-highest-salaries-worldwide-united-states"
          >
            source
          </a>
        </p>
      </div>
      <div class="widget">
        <img src="https://img.icons8.com/nolan/64/school.png">
        <span>Learn From Home</span>
        <p>
          Complete your education at your own pace.
          Don't stress about timed tests or deadlines
        </p>
      </div>
    </div>

    <div id="footer">
      <span><a
        href="https://qvault.io"
        target="_blank"
      >Blog</a></span>

      <span><a
        href="https://qvault.io/contact"
        target="_blank"
      >Contact</a></span>
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
  methods: {
    mounted(){
      this.$store.commit('setIsLoggedIn', isLoggedIn());
      if (this.$store.getters.getIsLoggedIn){
        this.$router.push({name: 'Courses'});
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  background-color: $gray-darkest;
  min-height: 100%;
  color: $gray-lightest;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  b {
    color: $gold-dark;
  }

  #title-container {
    width: 100%;
    text-align: center;
    margin-top: 3em;

    img {
      vertical-align: middle;
      width: 60px;
    }

    #title {
      margin-left: .75em;
      font-size: 2.5em;
      vertical-align: middle;
      color: $gray-lightest;
    }

    #sub-title-container {
      margin: 2em 0 1em 0;
      font-size: 1em;
      vertical-align: middle;
      color: $gray-lighter;
      padding: 1em;
    }
  }

  .panel {
    background-color: $gray-lightest;
    flex: 1;
    min-height: 300px;
    width: 50vw;
    min-width: 400px;
    color: $gray-dark;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 20px;
    box-shadow: 0 10px 20px 0px $gray-mid;

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

  #widget-container{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    text-align: center;
    width: 80%;
    margin: 1em;

    .widget{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      max-width: 250px;

      span {
        margin-top: 5px;
        font-size: 1.5em;
      }

      p {
        font-size: 1em;
      }
      
      a {
        color: $purple-darker;
      }
    }
  }

  #footer {
    margin: 1em 0 2em 0;
  }

  a {
    margin-left: 10px;
  }
}

</style>
