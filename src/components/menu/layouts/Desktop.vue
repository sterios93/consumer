<template>
    <v-layout row wrap>
        <v-flex xs4>
            <InfoList v-bind="InfoListProps" />
        </v-flex>
        <v-flex xs8>
            <MenuListContainer v-bind="sharedProps"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import InfoList from '../../shared/menu/info/View'
  import {mapActions} from 'vuex'

  export default {
    props: {
      tabs: Object,
      color: String,
      activeTab: String,
      categories: Array,
      compact: Boolean,
      selectedCategories: Array
    },
    components: {
      MenuListContainer,
      InfoList,
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
      InfoListProps () {
          return {
              isDesktop: true,
              information: this.$store.state.info.list.information,
          }
      },
      categoryProps () {
        return {
          items: this.categories,
        }
      },
      sharedProps () {
        return {
          color: this.color,
          activeTab: this.activeTab,
          compact: this.compact
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
    .restaurant-info-toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
