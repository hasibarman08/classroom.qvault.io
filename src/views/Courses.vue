<template>
  <div id="container">
    <span id="title">
      Courses
    </span>

    <div id="cards">
      <div
        v-for="(course, i) of courses"
        :key="i"
        class="card"
      >
        <img
          :src="course.image"
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
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon
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

  .card {
    flex: 0 1 calc(22% - 1em);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: $white;
    margin: 15px;
    overflow: hidden;
    cursor: pointer;
    text-align: center;

    &:hover{
      box-shadow: 0 16px 32px 0 rgba(0,0,0,0.8);

      .body {
        background-color: $gray-dark;

        .price {
          transform: scale(1.3);
        }
      }
    }

    img {
      width: 100%;
    }

    .body {
      background-color: $gray-darkest;
      padding: 10px;

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
}

</style>
