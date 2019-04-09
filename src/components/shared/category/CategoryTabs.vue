<template>
    <v-tabs dark :color="color" show-arrows>
        <v-tabs-slider class="lime accent-2"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item.id" @change="tabChanged(item.id)">
            {{ item.name }}
        </v-tab>
    </v-tabs>
</template>

<script>
  export default {
    props: {
      items: Array,
      color: String
    },
    methods: {
      tabChanged(id) {
        this.$emit('on-tab-change', id)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>