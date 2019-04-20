<template>
    <div class="overflow-y-scroll overflow-x-hidden">
        <v-container grid-list-md fluid>
            <v-layout>
                <v-flex>
                    <h1>Restaurant info</h1>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'restaurant-info',
        data() {
            return {}
        }
    }
</script>

<style scoped lang="stylus">
    .overflow-y-scroll
        overflow-y scroll
        height 500px
        padding-bottom: 56px
</style>