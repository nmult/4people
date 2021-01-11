<template>
  <div class="good-item">
    <span :class="['good-item__name', rateClass]">
        {{ products[product].name }} ({{ availableItems }}) - &nbsp;
      <span>{{ products[product].price }}&nbsp;</span> RUB
    </span>
    <v-btn
        elevation="2"
        small
        @click="add({id: product})">
      +
    </v-btn>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "Product",

    props: {
      product: Number,
      rateClass: String,
    },

    computed: {
      ...mapGetters([
        'products',
        'cartProducts',
      ]),

      availableItems() {
        const currentProductInCart = this.cartProducts.find((p) => p.id == this.product);
        let available = this.products[this.product].availableItems;

        if (currentProductInCart) {
          available -= currentProductInCart.quantity;
        }

        return available;
      }
    },
    
    methods: {
      ...mapActions([
        'add',
      ]),
    },

  }
</script>