<template>
  <div class="cart" v-if="Object.keys(cartProducts).length">
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Наименование товара и описание
          </th>
          <th class="text-left">
            Количество
          </th>
          <th class="text-left">
            Цена
          </th>
          <th>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in cartProducts"
            :key="item.id"
            class="cart-product">
          <td>{{ item.name }}</td>
          <td>
            <quantity :value="item.quantity"
                      :min="1"
                      :max="products[item.id].availableItems"
                      @changeQuantity="onChangeQuantity(item, $event)"></quantity>
            <span>&nbsp;шт.</span>
          </td>
          <td :class="rateClass">{{ item.price }} /&nbsp;шт.</td>
          <td>
            <v-btn
                elevation="2"
                small
                @click="remove(item)">
              Удалить
            </v-btn>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td>Общая сумма: {{ totalAmount }}</td>
        </tr>
        </tfoot>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import CartProductQuantity from './CartProductQuantity';

  export default {
    name: "Cart",
    props: {
      rateClass: String,
    },

    components: {
      'quantity': CartProductQuantity,
    },
    
    computed: {
      ...mapGetters([
        'products',
        'cartProducts',
        'totalAmount',
      ]),
    },

    methods: {
      ...mapActions([
        'remove',
        'changeQuantity',
      ]),

      onChangeQuantity({id}, quantity) {
        this.changeQuantity({id, quantity});
      }
    },
  }
</script>

<style>
  .cart {
    margin-top: 40px;
  }
</style>