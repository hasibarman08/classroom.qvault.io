<template>
  <div id="container">
    <ConfirmOverlay
      ref="confirmPurchase"
    />
    <div id="title">
      <span>
        Certificates
      </span>
    </div>

    <div id="sub-title">
      <span>
        Unlock certificates to show off your progress!
      </span>
    </div>
    <div id="sub-title">
      <span>
        Once unlocked, certificates are accessible via a public link to display on your resume
      </span>
    </div>

    <div id="cards">
      <ImageCard
        v-for="(course, i) of courses"
        :key="i"
        :img-src="course.ImageURL"
        class="card"
        :click="() => {
          clickOnCertificate(
            course.UUID,
            course.IsComplete,
            course.CertificateGemCost,
            course.IsCertificatePurchased
          )}"
      >
        <div class="body">
          <p class="title">
            {{ course.Title }} Certificate
          </p>
          <p class="description">
            {{ course.CertificateDescription }}
          </p>

          <div
            v-if="!course.IsComplete"
            class="incomplete"
          >
            <FontAwesomeIcon
              icon="times"
            />
            <span>Course Not Complete</span>
          </div>

          <div
            v-else-if="course.IsCertificatePurchased"
            class="purchased"
          >
            <FontAwesomeIcon
              icon="check"
            />
            <span>Purchased</span>
          </div>

          <div v-else-if="course.IsComplete">
            <div
              class="price"
            >
              <FontAwesomeIcon
                icon="gem"
              />
              <span>{{ course.CertificateGemCost }}</span>
            </div>
            <div
              class="completed"
            >
              <FontAwesomeIcon
                icon="check"
              />
              <span>Ready to Be Unlocked</span>
            </div>
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
  purchaseCourseCertificate,
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
    clickOnCertificate(courseUUID, courseIsComplete, gemAmount, isPurchased){
      if(!courseIsComplete){
        this.$notify({
          type: 'warn',
          title: 'Course Not Complete',
          text: 'Head to the Courses tab to complete the course'
        });
        return;
      }

      console.log(courseUUID);

      if (isPurchased) {
        this.$router.push({name: 'Certificate', params: {
          courseUUID,
          userUUID: this.$store.getters.getUser.UUID
        }});
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
        `Would you like to purchase this certificate for 💎${gemAmount} gems?`,
        async () => {
          try {
            await purchaseCourseCertificate(courseUUID);
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
  font-size: 20px;
  margin-bottom: 15px;
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
      line-height: 1.3em;
      font-size: 1em;
    }

    .incomplete {
      color: $pink-light;
      margin: 10px;

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
