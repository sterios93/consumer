<template>
    <v-layout row wrap>
        <v-flex xs12>
            <MenuListContainer v-bind="{...sharedProps}"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import {mapActions} from 'vuex'

  export default {
    props: {
      tabs: Object,
      color: String,
      activeTab: String,
      categories: Array,
      selectedCategories: Array
    },
    components: {
      MenuListContainer,
    },
    created() {
      this.controls = [
        {
          img: 'main.png',
          title: 'Create main menu product',
          cb: () => this.setMenuModalVisibility({
            key: 'main',
            value: true
          })
        },
        {
          img: 'special.png',
          title: 'Create special offer',
          cb: () => this.setMenuModalVisibility({
            key: 'special',
            value: true
          })
        },
        {
          img: 'lunch.png',
          title: 'Create lunch offer',
          cb: () => this.setMenuModalVisibility({
            key: 'lunch',
            value: true
          })
        },
        {
          img: 'category.png',
          title: 'Create category',
          cb: () => this.setModalVisibility({
            key: 'category',
            value: true
          })
        }
      ]
    },

    computed: {
      categoryProps () {
        return {
          items: this.categories,
        }
      },
      sharedProps () {
        return {
          color: this.color,
          activeTab: this.activeTab
        }
      }
    },
    methods: {
      ...mapActions({
        'setModalVisibility': 'modals/setModalVisibility',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility'
      }),
      onControlsClicked() {
        this.setBottomSheetVisibility(true)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
