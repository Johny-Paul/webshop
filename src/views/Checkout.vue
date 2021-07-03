<template>
    <div>
        <form @submit.prevent="submitForm()">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputFirstName">First Name:</label>
                    <input v-model="fname" type="text" class="form-control" placeholder="John" id="inputFirstName" required autocomplete="given-name">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputLastName">Last Name:</label>
                    <input v-model="lname" type="text" class="form-control" placeholder="Doe" id="inputLastName" required autocomplete="family-name">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail">E-mail:</label>
                    <input v-model="email" type="email" class="form-control" placeholder="john.doe@example.com" id="inputEmail" required autocomplete="email">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPhoneNum">Phone number:</label>
                    <input v-model="phone" type="text" class="form-control" placeholder="123456789" id="inputPhoneNum" required autocomplete="tel">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputAdress">Shipping Adress:</label>
                    <input v-model="address" type="text" class="form-control" placeholder="Street Name 123" id="inputAdress" required autocomplete="street-address"> 
                </div>
                <div class="form-group col-md-4">
                    <label for="inputPostalCode">Postal Code:</label>
                    <input v-model="postalCode" type="text" class="form-control" placeholder="51000" id="inputPostalCode" required autocomplete="postal-code">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCity">City:</label>
                    <input v-model="city" type="text" class="form-control" placeholder="New York" id="inputCity" required autocomplete="shipping locality">
                </div>
            </div>

            <div class="form group col-md-4">
                <label for="inputCountry">Country:</label>
                <input v-model="country" type="text" class="form-control" placeholder="USA" id="inputCountry" required autocomplete="shipping country">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Checkout',
    props: ['userData'],
    data() {
        return {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            postalCode: '',
            city: '',
            country: '',
        }
    },
    methods: {
        submitForm() {
            db.collection("users").doc(`${this.userData}`).set({
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                phone: this.phone,
                address: this.address,
                postalCode: this.postalCode,
                city: this.city,
                country: this.country
            }, { merge: true }).then(()=> {
                console.log("User data successfully submitted.")
            }).catch((error)=> {
                console.log("Error sending user data:", error);
            })
            this.$router.push({path: '/checkout/'+`${this.userData}`+'/payment'})

        }
    }
}
</script>