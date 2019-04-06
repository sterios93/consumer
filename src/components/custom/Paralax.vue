<template>
    <v-parallax
            dark
            height="350"
            v-bind:src="require('../../../public/img/header-image.jpeg')"
    >
        <v-layout
                align-center
                column
                justify-center
        >
        </v-layout>
    </v-parallax>
</template>

<script>
    export default {
        name: 'paralax',
        data() {
            return {}
        }
    }
</script>

<style scoped lang="stylus">
</style>
