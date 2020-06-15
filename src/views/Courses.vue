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
        v-for="(course, i) of courses"
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
          <div
            v-else
            class="price"
          >
            <FontAwesomeIcon
              icon="gem"
            />
            <span>{{ course.GemCost }}</span>
          </div>
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
  getCourses,
  purchaseCourse,
  getLastGemTransaction
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
    this.loadCourses();
  },
  methods: {
    async loadCourses() {
      try {
        this.courses = await getCourses();
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      }
    },
    clickOnCourse(courseUUID, gemAmount, isPurchased){
      if (isPurchased) {
        this.$router.push({name: 'Modules'});
        return;
      }

      if (this.$store.getters.getBalance < gemAmount){
        this.$notify({
          type: 'warn',
          title: 'Need More Gems',
          text: 'Go grab some gems in the store!'
        });
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

    .price {
      color: $purple-lighter;
      margin: 10px;
      font-size: 24px;

      span {
        margin-left: 10px;
      }
    }
  }
}

</style>
