<template>
    <v-checkbox v-model="selected" :label="item" :value="item"></v-checkbox>
</template>

<script>
  export default {
    props: {
      item: String
    },

    computed: {
      selected: {
        get () {
          return this.item
        },
        set () {
          this.$emit('item-selected', this.item)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>