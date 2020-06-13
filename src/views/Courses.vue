<template>
  <div id="container">
    <span id="title">
      Courses
    </span>

    <div id="cards">
      <ImageCard
        v-for="(course, i) of courses"
        :key="i"
        :img-src="course.image"
        class="card"
      >
        <div class="body">
          <div
            v-if="!course.purchased"
            class="price"
          >
            <FontAwesomeIcon
              icon="gem"
            />
            <span>{{ course.price }}</span>
          </div>
          <div
            v-if="course.completed"
            class="completed"
          >
            <FontAwesomeIcon
              icon="check"
            />
            <span>Complete</span>
          </div>
          <p class="title">
            {{ course.title }}
          </p>
          <p class="description">
            {{ course.description }}
          </p>
        </div>
      </ImageCard>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ImageCard from '@/components/ImageCard';

export default {
  components: {
    FontAwesomeIcon,
    ImageCard
  },
  data() {
    return {
      courses: [
        {
          title: 'Go Mastery',
          image: 'https://www.edureka.co/blog/wp-content/uploads/2018/09/Golang-Logo-Golang-Tutorial-Edureka.jpg',
          description: 'Master go web development! Starting with a familiarity of programming concepts is recommended.',
          price: 1000,
          purchased: true,
          completed: true
        }
      ]
    };
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

#title {
  text-align: center;
  color: $gray-darker;
  font-size: 3em;
}

#cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .card{
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
      transition: all .3s ease-in-out;

      span {
        margin-left: 10px;
      }
    }

    .completed {
      color: $green-light;
      margin: 10px;
      transition: all .3s ease-in-out;

      span {
        margin-left: 10px;
      }
    }
  }
}

</style>
