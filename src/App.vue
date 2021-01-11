<template>
  <div id="app">
    <v-expansion-panels
            v-model="expanded"
            accordion
            multiple>
      <v-expansion-panel
          v-for="group in groups"
          :key="group.id">
        <v-expansion-panel-header>
          {{ group.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <product v-for="product in group.products"
                   :key="product"
                   :product="product"
                   :rate-class="rateClass"></product>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <cart :rate-class="rateClass"></cart>
  </div>
</template>

<script>
  import Product from './components/Product';
  import Cart from './components/Cart';
  import {getUSD} from "./utils/currency"
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name:       'App',
    components: {
      Product,
      Cart,
    },

    data() {
      return {
        timer: null,
        rateClass: '',
        expanded: [0],
      }
    },

    async created() {
      await this.getProductsByNewRate();
      await this.getProductsNames();

      this.runGetProducts();
    },

    computed: {
      ...mapGetters([
        'groups',
        'products',
        'cartProducts',
        'totalAmount',
        'exchangeRate',
      ]),
    },

    methods: {
      ...mapActions([
        'getProductsData',
        'getProductsNames',
      ]),

      getProductsByNewRate() {
        this.getProductsData();
        this.$store.commit('UPDATE_EXCHANGE_RATE', getUSD());
      },

      runGetProducts() {
        this.timer = setInterval(() => {
          this.getProductsByNewRate();
        }, 15 * 1000);
      },
    },

    beforeDestroy() {
      clearInterval(this.timer);
    },

    watch: {
      exchangeRate(newVal, oldVal) {
        if (newVal > oldVal) {
          this.rateClass = 'red';
        } else {
          this.rateClass = 'green';
        }
      },
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .good-item {
    margin-bottom: 20px;
  }

  .good-item__name {
    margin-right: 10px;
  }

  .green {
    background-color: #4cdb1e;
  }

  .red {
    background-color: #db391e;
  }
</style>