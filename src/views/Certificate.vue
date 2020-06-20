<template>
  <div id="container">
    <div id="title-container">
      <img
        alt="Qvault logo"
        src="../img/qvault-icon.png"
      >
      <span id="title">Qvault Classroom</span>
    </div>
    <div id="outer">
      <div id="inner">
        <p id="title">
          Certificate of Completion
        </p>

        <p class="text">
          Qvault certifies that
        </p>

        <p id="name">
          {{ firstName }} {{ lastName }}
        </p>

        <p class="text">
          has completed the course
        </p>

        <p id="course">
          "{{ courseName }}"
        </p>

        <p class="text">
          dated
        </p>

        <p id="date">
          {{ courseCompletedAt }}
        </p>
      </div>
    </div>
    <BlockButton
      id="btn"
      :click="() => {
        if (this.$store.getters.getIsLoggedIn){
          this.$router.push({name: 'Dashboard'});
        } else {
          this.$router.push({name: 'Login'});
        }
      }"
    >
      Back to Qvault
    </BlockButton>
  </div>
</template>

<script>
import BlockButton from '@/components/BlockButton';
import {
  getCourseCertificateInfo
} from '@/lib/cloudClient.js';

export default {
  components: {
    BlockButton
  },
  data(){
    return {
      firstName: 'Lane',
      lastName: 'Wagners',
      courseName: 'Go Mastery',
      courseCompletedAt: 'June 1st, 1776'
    };
  },
  computed: {
    userUUID(){
      return this.$route.params.userUUID;
    },
    courseUUID(){
      return this.$route.params.courseUUID;
    }
  },
  async mounted(){
    try {
      const info = await getCourseCertificateInfo(this.courseUUID, this.userUUID);
      this.firstName = info.FirstName;
      this.lastName = info.LastName;
      this.courseName = info.CourseTitle;
      const d = Date.parse(info.CompletedAt);
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      this.courseCompletedAt = `${mo} ${da}, ${ye}`;
    } catch (err) {
      this.$notify({
        type: 'error',
        text: err
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  min-height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $gray-darkest;
  color: $gray-darker;

  #title-container {
    width: 100%;
    text-align: center;
    color: $gray-lightest;

    img {
      vertical-align: middle;
      width: 60px;
    }

    #title {
      margin-left: 25px;
      font-size: 36px;
      vertical-align: middle;
    }
  }

  #outer {
    padding: 30px;
    margin: 20px;
    text-align: center; 
    border: 10px solid $gold-mid;
    background-color: $gray-darker;
    font-family: Times, Times New Roman, Georgia, serif;

    #inner {
      text-align: center; 
      border: 8px solid $gold-lighter;
      background-color: $gray-lightest;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2em;

      p {
        margin: 0.6em;
      }

      #title {
        font-size: 3.5em;
        font-weight: 500;
      }

      .text{
        font-style: italic;
      }

      #name {
        font-size: 2.5em;
        font-weight: 700;
      }

      #course {
        font-size: 2em;
        font-weight: 700;
      }

      #date {
        font-size: 1.2em;
        font-weight: 100;
      }
    }
  }

  #btn {
    font-size: 1.5em;
    padding: 15px;
    border-radius: 3px;
  }
}

</style>
