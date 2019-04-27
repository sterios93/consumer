<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout wrap justify-center>
                <v-flex xs12 class="menu-list-mobile">
                    <component :is="menuComponent" v-bind="menuListProps"/>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-bottom-nav
                :active.sync="selectedMenu"
                :value="true"
                fixed
                color="white"
        >
            <v-btn color="teal" flat value="info" >
                <span>Info</span>
                <v-icon>info</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="main" >
                <span>Main Menu</span>
                <v-icon>restaurant</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="special" >
                <span>Special Offers</span>
                <v-icon>fastfood</v-icon>
            </v-btn>

            <v-btn color="teal" flat value="lunch" >
                <span>Lunch Menu</span>
                <v-icon>restaurant_menu</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-layout>
</template>

<script>
  import LunchList from '../../shared/menu/lunch/List'
  import MenuList from "../../shared/menu/MenuList";
  import SpecialList from '../../shared/menu/special/List'
  import InfoPage from '../../shared/menu/info/View'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    props: {
      color: String,
      categories: Array
    },
    components: {
        'main-menu': MenuList,
        'lunch-menu': LunchList,
        'special-menu': SpecialList,
        'info-menu': InfoPage,
    },
    data() {
      return {
        selectedMenu: 'main',
        category: this.categories[0],
      }
    },
    created() {
      this.category = this.categories[0].id
    },

    computed: {
      ...mapState('special', ['items']),
      isMainMenu() { return this.selectedMenu === 'main' },
      menuComponent() { return `${this.selectedMenu}-menu` },
      menuListProps() {
        if (this.selectedMenu === 'info') {
            return {
                isDesktop: false,
                information: this.$store.state.info.list.information,
            };
        } else  {
            return {
              color: this.color,
              items: this.isMainMenu ? this.getMenuByCategory()(this.category) : this.$store.state[this.selectedMenu].list.items
            }
        }
      },
      categoryProps() {
        return {
          items: this.categories,
          color: this.color
        }
      }
    },
    methods: {
      ...mapGetters('main', ['getMenuByCategory']),
      ...mapActions({
        'setModalVisibility': 'modals/setModalVisibility',
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility',
      }),
    }
  }
</script>

<style scoped lang="stylus"></style>
