<template>
        <h1>Please select payment methods:</h1>

        <form @submit.prevent="submitPaymentMethod" class="form-inline">
            <label for="paymentSelect">Select your preference:</label>
            <select v-model="paymentMethod" class="costum-select my-1 mr-sm-2" id="paymentSelect">
                <option value="onlinePayment">Online payment</option>
                <option value="atDelivery">At delivery</option>
                <option value="virman">Virman</option>
            </select>
            <button type="submit" class="btn btn-primary px-2 mx-2">Submit&confirm order</button>
            <div>
                <small>Warning: there is no coming back after this one.</small>
            </div>
        </form>
</template>

<script>
export default {
    name: 'Payment',
    props: ['userData'],
    data() {
        return {
            paymentMethod: ''
        }
    },
    methods: {
        submitPaymentMethod() {
            db.collection("users").doc(`${this.userData}`).set({
                paymentMethod: this.paymentMethod,
                paymentHardConfirm: true,
            }, {merge: true}).then(() => {
                console.log("Payment method successfully submitted.")
            }).catch((error) => {
                console.log("Error sending user data:", error);
            })
            this.$router.push({path: '/checkout/'+`${this.userData}`+'/payment/continue'})
        }
    }
}
</script>
