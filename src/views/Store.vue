<template>
  <div id="container">
    <h1 id="title">
      Store
    </h1>

    <div id="cards">
      <div
        v-for="(product, i) of products"
        :key="i"
        class="card"
      >
        <img
          :src="product.image"
        >
        <div class="body">
          <span class="price">${{ product.price }}</span>

          <div class="title">
            <FontAwesomeIcon
              icon="gem"
            />
            <span>{{ product.title }}</span>
          </div>
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
      products: [
        {
          title: '1000 Gems',
          image: 'https://www.edureka.co/blog/wp-content/uploads/2018/09/Golang-Logo-Golang-Tutorial-Edureka.jpg',
          price: 19.99
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

      .price {
        color: $green-lighter;
        margin: 10px;
        transition: all .3s ease-in-out;
      }

      .title {
        color: $gold-dark;
        font-size: 2em;
        margin: 0em;
        color: $purple-lighter;

        span {
          margin-left: 15px;
        }
      }
    }
  }
}

</style>
