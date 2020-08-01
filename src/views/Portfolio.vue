<template>
  <div id="container">
    <TopNav title="Qvault Portfolio" />
    <div id="content">
      <div class="title">
        <span>
          {{ firstName }} {{ lastName }}
        </span>
      </div>

      <img
        :alt="firstName"
        :src="profileImageURL"
        width="80"
      >

      <div id="cards">
        <ImageCard
          v-for="(course, i) of filteredCourses"
          :key="i"
          :img-src="course.ImageURL"
          class="card"
          :click="() => {linkClick(course.LandingPage)}"
        >
          <div class="body">
            <p class="title">
              {{ course.Title }}
            </p>

            <div
              v-if="course.IsComplete"
              class="completed"
            >
              <FontAwesomeIcon
                icon="check"
              />
              <span>Complete</span>
            </div>
            <div
              v-else
              class="purchased"
            >
              <span>In Progress</span>
            </div>
          </div>
        </ImageCard>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav';
import ImageCard from '@/components/ImageCard';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { 
  getCoursesPublic,
  getUserPublic
} from '@/lib/cloudClient.js';

export default {
  components: {
    TopNav,
    ImageCard,
    FontAwesomeIcon
  },
  data(){
    return {
      userUUID: this.$route.params.userUUID,
      firstName: null,
      lastName: null,
      courses: [],
      profileImageURL: null
    };
  },
  computed:{
    filteredCourses(){
      return this.courses.filter(course => course.IsComplete || course.IsPurchased).sort((c1, c2) => c1.Title < c2.Title ? 1 : -1);
    }
  },
  async mounted(){
    try {
      this.courses = await getCoursesPublic(this.userUUID);
      const user = await getUserPublic(this.userUUID);
      this.firstName = user.FirstName;
      this.lastName = user.LastName;
      this.profileImageURL = user.ProfileImageURL;
    } catch (err) {
      this.$notify({
        type: 'error',
        text: err
      });
    }
  },
  methods: {
    linkClick(url){
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  background-color: $gray-lightest;
  height: 100%
}

#content{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title{
  margin: 20px;
  color: $gray-dark;
  font-size: 3em;
}

#cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  .card {
    flex: 1 1 calc(22% - 1em);
    margin: 20px;
    max-width: 350px;
    min-width: 200px;

    .body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        color: $gold-dark;
        font-size: 1.5em;
        margin: 1em;
      }

      .completed {
        color: $green-light;
        margin: 10px;
        font-size: 1.3em;

        span {
          margin-left: 10px;
        }
      }

      .purchased {
        color: $gray-lightest;
        margin: 10px;
        font-size: 1.3em;

        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
