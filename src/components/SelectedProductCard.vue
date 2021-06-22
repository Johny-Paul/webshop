<template>
    <div class="container myContainer">
        <div class="row" style="height: 250px;">
            <div class="col-sm-2">
                <img :src="productData.image_url" alt="sample promo image" class="selProdCardImg">
            </div>

            

            <div class="col-sm-2">
                <div class="collapseButton">
                    <button type="button" @click="toggleData()"><span v-if="!showDetails">Show details</span><span v-if="showDetails">Hide details</span></button>
                </div>
                <span class="" v-if="showDetails">{{productData.name}}, {{productData.specs.cpu}}, {{productData.specs.ram}}, {{productData.specs.memory}}, {{productData.specs.screen}}, {{productData.specs.os}}, <span v-if="productData.specs.bluetooth">bluetooth</span>, color: {{productData.specs.color}}, warranty: {{productData.specs.warranty}}</span>  
            </div>

            <div class="col-sm-2">
                {{productData.price}} kn  
            </div>

            <div class="col-sm-2">
                <form @submit.prevent="calcPrice">
                    <label for="inputQuantity"></label>
                    <input type="number" id="inputQuantity" class="inputNumber" v-model="quantity">
                    <button type="button" @click="calcPrice" style="margin-left: .5em;">Enter</button>
                </form>
            </div>

            <div class="col-sm-2">
                {{this.priceSum}} kn
            </div>

            <div class="col-sm-1">
                <button @click="deleteFromFavorites">Delete</button>
            </div>

            <div class="col-sm-1">
                <button>U košaricu</button>
            </div>

        </div>
    </div>
</template>

<script>
import favorites from '../favorites.js'

export default {
    name: 'SelectedProductCard',
    props: {
        productData: {
            default: ''
        },
        userData: {
            default: ''
        }
    },
    data() {
        return {
            quantity: 1,
            priceSum: 0,
            showDetails: false,
            global: favorites,
        };
    },
    methods: {
        calcPrice: function() {
            this.priceSum = this.quantity * this.productData.price;
            this.priceSum = this.priceSum.toFixed(2);
        },/*
        calcPrice() {
            this.priceSum = this.quantity * this.productData.price;
            this.priceSum = this.priceSum.toFixed(2)
        },*/
        toggleData() {
            if (this.showDetails == true) {
                this.showDetails = false;
            } else {
                this.showDetails = true;
            }
        },
        toggleOnResize() {
            if (window.innerWidth > 768) {
                this.showDetails = true;
            } else {
                this.showDetails = false;
            }
        },
        deleteFromFavorites() {
            this.global.favoriteProducts = this.global.favoriteProducts.filter(product => product !== this.productData.cathNo);
            console.log("New favorites:", this.global.favoriteProducts);
            db.collection("users").doc(`${this.userData}`).update({
                favorites: this.global.favoriteProducts
            }).then( () => {
                console.log("Product successfully deleted from Favorites.");
            })  
        }
    },
    mounted() {
        this.priceSum = this.productData.price.toFixed(2);
        if (window.innerWidth > 768) {
            this.showDetails = true;
        } else {
            this.showDetails = false;
        };
    },
    updated: function () {
        window.addEventListener('resize', this.toggleOnResize)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.toggleOnResize)
    }
}
</script>
