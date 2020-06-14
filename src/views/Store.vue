<template>
  <div id="container">
    <div id="title">
      <span>
        Store
      </span>
    </div>

    <div id="sub-title">
      <span>
        Gems are used to unlock courses and certifications
      </span>
    </div>

    <div id="cards">
      <ImageCard
        v-for="(product, i) of products"
        :key="i"
        class="card"
        :img-src="product.ImageURL"
      >
        <div class="title">
          <FontAwesomeIcon
            icon="gem"
          />
          <span>{{ product.Name }}</span>
        </div>
        <div class="price">
          <span>${{ (product.UnitAmount / 100) }}</span>
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
  margin: 20px;
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

  .card{
    flex: 1 1 calc(22% - 1em);
    margin: 20px;
    max-width: 400px;
    min-width: 200px;

    .title {
      color: $purple-lighter;
      font-size: 2em;
      margin: 1em;

      span {
        margin-left: 10px;
      }
    }

    .price {
      font-size: 24px;
      color: $green-dark;
      margin: 1em;
    }
  }
}

</style>
