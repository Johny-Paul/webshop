<template>
  <div id="nav" class="navbar">
    <!--
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    -->
    <router-link to="informatika" class="nav-link">Informatika</router-link>
    <router-link to="audiovideo" class="nav-link">Televizori/audio-video</router-link>
    <router-link to="bijela" class="nav-link">Bijela tehnika</router-link>
    <router-link to="sport" class="nav-link">Sport i oprema</router-link>
    <router-link to="igracke" class="nav-link">Igračke, djeca i bebe</router-link>
    <router-link to="ljubimci" class="nav-link">Kućni ljubimci</router-link>
    <input type="text" placeholder="Pretraži trgovinu..." class="nav-link">
  </div>

  <div class="sidebar" id="mySideNav">
    <router-link to="compareProducts" class="compareProducts"><img src="../src/assets/sidebar/compare_products.svg" alt="compare products icon"><span>Compare</span></router-link>
    <router-link to="favorites" class="favorites"><img src="../src/assets/sidebar/favorites.svg" alt="favorites icon"><span>Wish list</span></router-link>
    <router-link to="shoppingCart" class="shoppingCart"><img src="../src/assets/sidebar/shopping_cart.svg" alt="shopping cart icon"><span>Shopping Cart</span></router-link>
  </div>

  <router-view/>

  <div class="notificationWishlist" id="openNotification">
      <h5>Product added to your wish list!</h5>
  </div>
</template>

<script>
import store from '../src/store.js'

export default {
  data() {
    return store
  },
  
  mounted() {
    db.collection('products').where("featured", "==", true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.productsToShow[`${doc.id}`] = doc.data();
          });
        }).catch((error) => {
          console.log("Error getting documents:", error);
        })
    firebase.auth().onAuthStateChanged( (user) => {
      if(user) {
        console.log("Recurring user detected. User ID saved.")
        this.user.userUID = user.uid;
      } else {
        firebase.auth().signInAnonymously()
          .then(() => {
            console.log('Anonymous user signed in.');
            firebase.auth().onAuthStateChanged( (user) => {
              if(user) {
                this.user.userUID = user.uid;
                db.collection("users").doc(user.uid).set( {
                  favorites: []
                })
              }
            })
          })
        }
    })
  }
}

</script>




<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
