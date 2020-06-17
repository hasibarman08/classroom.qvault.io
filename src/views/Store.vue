<template>
  <div id="container">
    <LoadingOverlay
      :is-loading="isLoading" 
    />

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
        :click="() => { checkout(product.ID) }"
      >
        <div class="title">
          <FontAwesomeIcon
            icon="gem"
          />
          <span>Get {{ product.Name }}</span>
        </div>
        <div class="price">
          <span>${{ (product.Price.UnitAmount / 100) }}</span>
        </div>
      </ImageCard>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { loadStripe } from '@stripe/stripe-js';
import 'vue-loading-overlay/dist/vue-loading.css';

import LoadingOverlay from '@/components/LoadingOverlay';
import ImageCard from '@/components/ImageCard';
import {
  startProductCheckout,
  completePayments,
  getLastGemTransaction
} from '@/lib/cloudClient.js';

export default {
  components: {
    FontAwesomeIcon,
    ImageCard,
    LoadingOverlay
  },
  data() {
    return {
      stripeCustomerID: null,
      stripeCustomerEmail: null,
      error: null,
      isLoading: false
    };
  },
  computed: {
    products(){
      let products = this.$store.getters.getProducts;
      products.sort((p1, p2) => p1.Price.UnitAmount > p2.Price.UnitAmount ? 1 : -1);
      return products;
    }
  },
  async mounted(){
    (async () => {
      try {
        await completePayments();
        const lastGemTransaction = await getLastGemTransaction();
        this.$store.commit('setBalance', lastGemTransaction.Balance);
      } catch (err) {
        this.$notify({
          type: 'error',
          text: err
        });
      } 
    })();
  },
  methods: {
    async checkout(productID){
      this.isLoading = true;
      const checkoutSession = await startProductCheckout(productID);
      const stripe = await loadStripe('pk_test_51EvvJkBNIsXC7YAh92Uwimgy5SGoXLVcWg4AClST38YIf4y2gw0ntIvWfknEoWgtNZK2RhKw8OHe0f56uHLMf1jM00aeqo68fW');
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id
      });
      this.isLoading = false;
      this.error = error.message;
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
