<template>
  <div id="container">
    <div id="title-container">
      <span id="title">
        Store
      </span>

      <span id="balance">
        <FontAwesomeIcon
          icon="gem"
        />
        {{ balance }}
      </span>
    </div>

    <span id="sub-title">
      Gems are used to unlock courses, purchase certifications, and complete workshops
    </span>

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
          title: 'Get 1000 Gems',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Yohinki_Purple_Gem.jpg',
          price: 19.99
        }
      ]
    };
  },
  computed: {
    balance(){
      return 10;
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

#title-container{
  width: 100%;
  margin: 20px;
  position: relative;

  #title {
    color: $gray-darker;
    font-size: 3em;
  }

  #balance {
    position: absolute;
    left: 0;
    top: 0;
    color: $purple-light;
    font-size: 2em;
  }
}

#sub-title {
  text-align: center;
  color: $gray-mid;
  font-size: 1em;
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
        font-size: 24px;
        margin: 20px 0 20px 0;
        color: $purple-lighter;

        span {
          margin-left: 15px;
        }
      }
    }
  }
}

</style>
