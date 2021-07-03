<template>
    <div>
        <h1>This is your shopping cart:</h1>
        <div class="container">
            <div class="row" style="background-color: silver">
                    <div class="col-sm-1">

                    </div>
                    <div class="col-sm-2">
                        <strong>Product:</strong>
                    </div>

                    <div class="col-sm-2">
                        <strong>Price:</strong>
                    </div>

                    <div class="col-sm-1">
                        <strong>Quantity:</strong>
                    </div>

                    <div class="col-sm-2">
                        <strong>Total:</strong> 
                    </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm-10">
                        <CartProductCard v-bind:key="product.cathNO" v-for="product of this.global1.cartSelectionToShow" :productData="product" :userData="this.global2.userUID"/>
                    </div>
                    <div class="col-sm-2">
                        <form @submit.prevent="checkout">
                            <button @click="checkout()">Proceed to checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartProductCard from '/src/components/CartProductCard.vue';
import user from '../user.js'
import cart from '../cart.js'

export default {
    name: 'Cart',
    components: {
        CartProductCard
    },
    data() {
        return {
            global2: user,
            global1: cart
        }
    },
    methods: {
        checkout(){
            this.$router.push({path: '/checkout/'+`${this.global2.userUID}`})
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged( (user) => {
            if(user) {
                this.global2.userUID = user.uid;
                db.collection('users').doc(`${this.global2.userUID}`)
                    .onSnapshot((doc) => {
                        if(doc.exists) {
                            console.log("Document containing shopping cart selection downloaded successfully.")
                            this.global1.cartSelectedProducts = {};
                            this.global1.cartSelectionToShow = {};
                            this.global1.cartSelectedProducts = doc.data().cart;
                            for(this.cartProduct in doc.data().cart) {
                                //this.global1.cartSelectedProducts.push(`${this.cartProduct}`);
                                db.collection("products").where("cathNo", "==", `${this.cartProduct}`)
                                    .get()
                                    .then((querySnapshot) => {
                                        querySnapshot.forEach(doc => {
                                            console.log(doc.id, "=>", doc.data());
                                            this.global1.cartSelectionToShow[`${doc.id}`] = doc.data();
                                        });
                                    }).catch((error) => {
                                        console.log("Error getting documets:", error)
                                    })
                            }
                        }
                    })
            } else {
                console.log("Error: User is signed out. Please go to app homepage and reload.")
                //TODO: set up user sign in if no user detected.
            }
        })
    }
}
</script>