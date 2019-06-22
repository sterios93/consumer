<template>
  <div class="category-item">
    <input class="checkBox" type="checkbox" :value="item" v-model="selected">
    <label class="checkLabel">{{ item }}</label>
  </div>
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
        return this.isCategorySelected(this.item);
      },
      set() {
        this.$emit("item-selected", this.item);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
    .checkBox
      height 20px
      width 20px
    .checkLabel
      vertical-align text-bottom
      margin-left 10px  
</style>