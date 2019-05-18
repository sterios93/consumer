<template>
    <v-parallax
            dark
            height="350"
            src="./img/vegs.jpg"
    >
        <v-layout
                align-center
                column
                justify-center
        >
            <slot></slot>
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
