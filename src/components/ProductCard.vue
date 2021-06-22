<template>
  
    <div class="card product-card" style="width: 18rem;">
      <div class="card-img-container">
        <img :src="productData.image_url" class="card-img-top cardImage" alt="sample promo image">
      </div>
      <div class="card-body">
        <h4 class="card-title">{{productData.name}}</h4>
        <p class="card-text">{{productData.specs.cpu}}, {{productData.specs.ram}}, {{productData.specs.memory}}, {{productData.specs.screen}}, {{productData.specs.os}}, {{productData.specs.color}}</p>
        <h5>{{productData.price}} kn</h5>
        <div class="container">
            <div class="row">
              <div class="col mx-0 px-0">
                <img src="../assets/compare_products.svg" style="max-width: 2.5em" alt="compare products image">
              </div>
              <div class="col">
                <img src="../assets/shopping_cart.svg" style="max-width: 8em" alt="compare products image">
              </div>
              <div class="col px-0">
                <button type="button" @click="addToFavorites()"><img src="../assets/favorites.svg" style="max-width: 2.5em" alt="compare products image"></button>
              </div>
            </div>
        </div>
      </div>
    </div>
  

</template>

<script>
import store from '../store.js'

export default {
  name: 'ProductCard',
  props: ['productData'],
  data() {
    return store
  },
  methods: {
    addToFavorites() {
      db.collection("users").doc(`${this.user.userUID}`).update({
        /*['favorites.'+`${this.productData.cathNo}`]: {quantity: 1},*/
          favorites: firebase.firestore.FieldValue.arrayUnion(
            `${this.productData.cathNo}`
          )
        });
        console.log('Showing modal notification:')
        document.getElementById('openNotification').classList.add('showNotification');
        setTimeout(function() {document.getElementById('openNotification').classList.remove('showNotification')}, 2000)
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

