<template>
  <div class="home">
    <img alt="promo" src="../assets/promo.png" class="promo">
    <h2>Akcijska ponuda</h2>
    
    <div class="featuredProducts">
        <ProductCard class="productCardComponent" v-bind:key="product.cathNo" v-for="product of this.productsToShow" :productData="product"/>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue'
import store from '../store.js'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data() {
    return store;
  },
  
}
</script>
