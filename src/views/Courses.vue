<template>
  <div id="container">
    <ConfirmOverlay
      ref="confirmPurchase"
      :on-confirm="()=>{}"
    />
    <div id="title">
      <span>
        Courses
      </span>
    </div>

    <div id="sub-title">
      <span>
        Learn to code, earn gems by completing exercises, and unlock certifications
      </span>
    </div>

    <div id="cards">
      <ImageCard
        v-for="(course, i) of courses"
        :key="i"
        :img-src="course.ImageURL"
        class="card"
        :click="() => {clickOnCourse(course.GemCost) }"
      >
        <div class="body">
          <p class="title">
            {{ course.Title }}
          </p>
          <div
            v-if="!course.IsPurchased"
            class="price"
          >
            <FontAwesomeIcon
              icon="gem"
            />
            <span>{{ course.GemCost }}</span>
          </div>
          <div
            v-if="course.IsComplete"
            class="completed"
          >
            <FontAwesomeIcon
              icon="check"
            />
            <span>Complete</span>
          </div>
          <p class="description">
            {{ course.Description }}
          </p>
        </div>
      </ImageCard>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ImageCard from '@/components/ImageCard';
import ConfirmOverlay from '@/components/ConfirmOverlay';
import { 
  getCourses
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    ImageCard,
    ConfirmOverlay
  },
  data() {
    return {
      courses: []
    };
  },
  async mounted(){
    try {
      this.courses = await getCourses();
    } catch (err) {
      this.$notify({
        type: 'error',
        text: err
      });
    }
  },
  methods: {
    clickOnCourse(gemAmount){
      this.$refs['confirmPurchase'].openNav(
        `Would you like to purchase this course for ${gemAmount} gems?`);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';

#container {
  padding: 20px;
  display: block;
  text-align: center;
}

#title{
  width: 100%;
  margin: 20px;
  position: relative;
  color: $gray-darker;
  font-size: 3em;
}

#sub-title {
  text-align: center;
  color: $gray-mid;
  font-size: 2em;
  margin-bottom: 20px;
}

#cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  .card {
    flex: 1 1 calc(22% - 1em);
    margin: 20px;
    max-width: 400px;
    min-width: 200px;

    .title {
      color: $gold-dark;
      font-size: 2em;
      margin: 0em;
    }

    .description {
      color: $white;
      font-weight: 400;
      margin: 1em;
    }

    .price {
      color: $purple-lighter;
      margin: 10px;
      font-size: 24px;

      span {
        margin-left: 10px;
      }
    }

    .completed {
      color: $green-light;
      margin: 10px;

      span {
        margin-left: 10px;
      }
    }
  }
}

</style>
