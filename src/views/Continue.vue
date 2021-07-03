<template>
    <h2>Thank you for your purchase!</h2>
    <h1>Do you want to continue shopping?</h1>
    <router-link :to="{name: 'Home'}">Go to main page</router-link>
</template>

<script>
export default {
    name: 'Continue',
    props: ['userData']
}
</script>