<template>
  <v-checkbox v-model="selected" :label="item" :value="item"/>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
	item: String,
  },

  computed: {
	...mapGetters('restaurants', ['isCategorySelected']),
    selected: {
      get() {
		  // TODO: somehow the tick is not placed when the category is selected
        return this.isCategorySelected(this.item);
      },
      set() {
        this.$emit("item-selected", this.item);
      }
    }
  }
};
</script>

<style scoped lang="stylus"></style>