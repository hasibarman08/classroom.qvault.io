<template>
  <div id="container">
    <ConfirmOverlay
      ref="confirmPurchase"
    />
    <div id="title">
      <span>
        Courses
      </span>
    </div>

    <div id="sub-title">
      <span>
        Learn to code, earn gems by completing exercises and unlock certifications
      </span>
    </div>

    <div id="cards">
      <ImageCard
        v-for="(course, i) of $store.getters.getCourses"
        :key="i"
        :img-src="course.ImageURL"
        class="card"
        :click="() => {clickOnCourse(course.UUID, course.GemCost, course.IsPurchased) }"
      >
        <div class="body">
          <p class="title">
            {{ course.Title }}
          </p>
          <p class="description">
            {{ course.Description }}
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
            v-else-if="course.IsPurchased"
            class="purchased"
          >
            <FontAwesomeIcon
              icon="check"
            />
            <span>Purchased</span>
          </div>
          <GemDisplay
            v-else
            :cost="course.GemCost"
          />
        </div>
      </ImageCard>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ImageCard from '@/components/ImageCard';
import ConfirmOverlay from '@/components/ConfirmOverlay';
import GemDisplay from '@/components/GemDisplay';
import { 
  getCourses,
  purchaseCourse,
  getLastGemTransaction
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    ImageCard,
    ConfirmOverlay,
    GemDisplay
  },
  methods: {
    async loadCourses() {
      try {
        const courses = await getCourses();
        this.$store.commit('setCourses', courses);
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    clickOnCourse(courseUUID, gemAmount, isPurchased){
      if (isPurchased) {
        this.$router.push({name: 'Exercise', params: {courseUUID}});
        return;
      }

      if (this.$store.getters.getBalance < gemAmount){
        this.$router.push({name: 'CourseProduct', params: {courseUUID}});
        return;
      }

      this.$refs['confirmPurchase'].openNav(
        `Would you like to purchase this course for ${gemAmount} gems?`,
        async () => {
          try {
            await purchaseCourse(courseUUID);
            this.loadCourses();
            const lastGemTransaction = await getLastGemTransaction();
            this.$store.commit('setBalance', lastGemTransaction.Balance);
          } catch (err) {
            this.$notify({
              type: 'error',
              text: err
            });
          }
        }
      );
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
    max-width: 350px;
    min-width: 200px;

    .body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        color: $gold-dark;
        font-size: 1.4em;
        margin: 0em;
      }

      .description {
        color: $white;
        font-weight: 400;
        margin: 1em;
        line-height: 1.3em;
        font-size: 1em;
      }

      .completed {
        color: $green-light;
        margin: 10px;

        span {
          margin-left: 10px;
        }
      }

      .purchased {
        color: $gold-lighter;
        margin: 10px;

        span {
          margin-left: 10px;
        }
      }
    }
  }
}

</style>
