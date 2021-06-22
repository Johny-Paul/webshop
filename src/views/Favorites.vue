<template>
    <div>
        <h1>This is your wish list:</h1>
        <div class="container">
            <div class="row" style="background-color: silver">
                <div class="col-sm-2">
                </div>

                <div class="col-sm-2">
                    <strong>Product name:</strong>
                </div>

                <div class="col-sm-2">
                    <strong>Price:</strong>
                </div>

                <div class="col-sm-2">
                    <strong>Quantity:</strong>
                </div>

                <div class="col-sm-2">
                    <strong>Total:</strong> 
                </div>
            </div>
        </div>


        <div class="container">
            <div class="row">
                <SelectedProductCard v-bind:key="product.cathNo" v-for="product of this.global1.favSelectionToShow" :productData="product" :userData="this.global2.userUID"/>
            </div>
        </div>
    </div>
</template>

<script>
import SelectedProductCard from '/src/components/SelectedProductCard.vue';
import favorites from '../favorites.js';
import user from '../user.js'

export default {
    name: 'Favorites',
    components: {
        SelectedProductCard
    },
    data() {
        return {
            global1: favorites,
            global2: user,
        }
    },
    //TODO: mounted je funkcija koja: 1. preuzima polje favorita(RIJEŠENO), za svaki cathNo pretražuje po firebase sve proizvode, za svaki proizvod koji zadovolji cijeli kriterij preuzme objekt i sprema ga u store.favorites odakle se prikazuje
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.global2.userUID = user.uid;
                db.collection('users').doc(`${this.global2.userUID}`)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                        console.log("Document containing favorites successfully downloaded:",doc.data());
                        //this.global1.products = doc.data().favorites;
                        //pretraživanje
                        this.global1.favoriteProducts = [];
                        this.global1.favSelectionToShow = {};
                        for (this.favorite of doc.data().favorites) {
                            this.global1.favoriteProducts.push(`${this.favorite}`);
                            db.collection("products").where("cathNo", "==", `${this.favorite}`)
                                .get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        console.log(doc.id, "=>", doc.data());
                                        this.global1.favSelectionToShow[`${doc.id}`] = doc.data();
                                    })
                                }).catch((error) => {
                                    console.log("Error getting documents:", error)
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