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

            <div class="col-sm-1">
                {{this.priceSum}} kn
            </div>

            <div class="col-sm-1">
                <button @click="deleteFromCart">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import cart from '../cart.js'
import user from '../user.js'

export default {
    name: 'CartProductCard',
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
            global: cart,
            global2: user
        }
    },
    mounted() {
        for (this.product in this.global.cartSelectedProducts) {
            //console.log("Checking product" +''+ this.product+' which has quantity:' + '' + this.global.cartSelectedProducts[`${this.product}`].quantity)
            if (this.product == this.productData.cathNo) {
                this.quantity = this.global.cartSelectedProducts[`${this.product}`].quantity;
            }
        }
        this.priceSum = this.productData.price * this.quantity
        this.priceSum = this.priceSum.toFixed(2);
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
    },
    methods: {
        calcPrice: function() {
            this.priceSum = this.quantity * this.productData.price;
            this.priceSum = this.priceSum.toFixed(2);
            db.collection("users").doc(`${this.global2.userUID}`).update({
                ['cart.'+`${this.productData.cathNo}`]: {quantity: Number(this.quantity)}
            }).then(()=> {
                console.log("Product quantity updated successfully.")
            })
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
        deleteFromCart() {
            for (this.product in this.global.cartSelectedProducts) {
                if (this.product == this.productData.cathNo) {
                    delete this.global.cartSelectedProducts[`${this.product}`]
                }
            }
            //this.global.cartSelectedProducts = this.global.cartSelectedProducts.filter(product => product !== this.productData.cathNo);
            console.log("New shopping cart:", this.global.cartSelectedProducts);
            db.collection("users").doc(`${this.userData}`).update({
                cart: this.global.cartSelectedProducts
            })
        }
    }
}
</script>