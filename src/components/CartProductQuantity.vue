<template>
  <input class="cart-product__quantity"
         type="number"
         step="1"
         :min="min"
         :max="max"
         v-model.number="quantity"
         @change="onChange($event.target.value)">
</template>

<script>
  export default {
    name: "CartProductQuantity",

    props: {
      min: Number,
      max: Number,
      value: Number,
    },
    data() {
      return {
        quantity: this.value,
      };
    },

    methods: {
      onChange(newValue) {
        const inputValue = parseInt(newValue, 10);

        if (inputValue <= this.max && inputValue >= this.min) {
          this.$emit('changeQuantity', inputValue);
        } else {
          this.quantity = this.value;
        }
      },
    },

    watch: {
      value(newValue) {
        this.quantity = newValue;
      },
    },
  }
</script>