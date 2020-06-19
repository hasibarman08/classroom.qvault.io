<template>
  <div id="container">
    <div id="outer">
      <div id="inner">
        <span id="title">Certificate of Completion</span>
        <br><br>
        <span style="font-size:25px"><i>This is to certify that</i></span>
        <br><br>
        <span style="font-size:30px"><b>{{ firstName }} {{ lastName }}</b></span><br><br>
        <span style="font-size:25px"><i>has completed the course</i></span> <br><br>
        <span style="font-size:30px">{{ courseName }}</span> <br><br>
        <span style="font-size:25px"><i>dated</i></span><br>
        {{ courseCompletedAt }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      firstName: 'Lane',
      lastName: 'Wagner',
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
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  height: 100%;
  width: 100%;
  display: flex;

  #outer {
    width: 800px; 
    height: 600px; 
    padding: 20px;
    text-align: center; 
    border: 10px solid #787878;

    #inner {
      width: 750px; 
      height: 550px; 
      padding: 20px; 
      text-align: center; 
      border: 5px solid #787878;

      #title {
        font-size: 50px;
        font-weight: bold;
      }
    }
  }
}

</style>
