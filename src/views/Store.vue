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
      <ImageCard
        v-for="(product, i) of products"
        :key="i"
        class="card"
        :img-src="product.ImageURL"
      >
        <div class="body">
          <span class="price">{{ (product.UnitAmount / 100).toLocaleString("en-US", {style:"currency", currency:"USD"}) }}</span>

          <div class="title">
            <FontAwesomeIcon
              icon="gem"
            />
            <span>{{ product.Name }}</span>
          </div>
        </div>
      </ImageCard>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ImageCard from '@/components/ImageCard';
import { 
  getProducts
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    ImageCard
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    balance(){
      return 10;
    }
  },
  async mounted(){
    try {
      this.products = await getProducts();
    } catch (err) {
      alert(err);
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

</style>
