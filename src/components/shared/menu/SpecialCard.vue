<template>
    <v-flex xs12>
        <v-layout row justify-center>
            <v-flex xs10 class="special-date-container" :style="containerStyle">
                <v-layout row>
                    <v-flex class="text-xs-center white--text date-font">
                        <span>{{item.startDate}}</span>
                    </v-flex>
                    <v-flex text-xs-center white--text date-font>
                        <v-icon>calendar_today</v-icon>
                    </v-flex>
                    <v-flex class="text-xs-center white--text date-font">
                        <span>{{item.endDate}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-hover>
            <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
            >
            <div v-if="isSpecial">
                <h4 v-if="item.name" class="ma-0 title grey--text text--darken-4 text-uppercase font-weight-medium text-xs-center">{{item.name}}</h4>
                <v-img
                        class="white--text"
                        height="150px"
                        :src="imagePath"
                >
                </v-img>
                <v-card-title class="px-5 justify-center">
                    <div class="text-xs-center mb-4">{{item.description}}</div>
                    <v-flex
                            xs12
                            v-if="item.price"
                            class="old-price ma-0 pa-0 title red--text text--accent-1 text-uppercase font-weight-medium text-xs-center"
                    >
                        {{item.price | formatCurrency}}
                    </v-flex>
                    <v-flex
                            xs12
                            v-if="item.price"
                            class="new-price ma-0 pa-0 headline red--text text--accent-4 text-uppercase font-weight-bold text-xs-center"
                    >
                        {{item.price - item.price * (item.discount / 100) | formatCurrency}}
                    </v-flex>
                </v-card-title>
                <v-card-actions class="px-5 justify-center">
                    <v-btn color="success" block dark @click="readMore">Explore</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <div v-if="isSpecial" class="ribbon"><span>{{ribbonText}}</span></div>
            </div>
            <v-card-actions class="px-2 py-0" v-if="isEditable">
                <v-flex xs12>
                    <v-switch
                            color="indigo accent-4"
                            :input-value="isActive"
                            :value="isActive"
                            :loading="activeLoading"
                            :disabled="activeLoading"
                            @click.prevent="toggleIsActive"
                    >
                        <template v-slot:label>
                            <span class="indigo--text text--accent-4">Toggle active</span>
                        </template>
                    </v-switch>
                </v-flex>
                <v-btn icon @click="onEditClick">
                    <v-icon color="indigo accent-2">edit</v-icon>
                </v-btn>
                <v-btn
                        icon
                        @click="onDeleteClick"
                        :loading="deleteLoading"
                        :disabled="deleteLoading"
                >
                    <v-icon color="indigo accent-2">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-hover>

    </v-flex>

</template>

<script>
  // TODO :: Show the read more button only for special offers and lunch offers. Dont show them when viewing the special offer view page or lunch view page.
  import {mapActions} from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        default: () => {},
      },
      isEditable: {
        type: Boolean,
        default: false,
      },
      isSpecial: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'main',
      },
      colors: {
        type: Array,
        default: () => ['#309250', '#2fa557e0'],
      }
    },
    data() {
      return {
        isActive: false,
        defaultImage: './img/default-menu-v2.jpg',
        activeLoading: false,
        deleteLoading: false,
      }
    },
    computed: {
      ribbonText() {
        return this.type === 'lunch' ? this.type : `- ${this.item.discount} %`
      },
      imagePath() {
        return this.item.image || this.defaultImage
      },
      containerStyle() {
        return {
          background: `linear-gradient(${this.colors[0]} 0%, ${this.colors[1]} 100%)`
        }
      }
    },
    watch: {
      'item.isActive': {
        handler: function (value) {
          this.isActive = value
        },
        immediate: true
      }
    },
    methods: {
      ...mapActions({
        setSnackbar: 'snackbar/setState',
        setModalData: 'modals/setModalData',
        setMenuModalVisibility: 'modals/setMenuModalVisibility',
      }),
      readMore() {
        this.$router.push({ path: `/${this.type}-offer/${this.item.id}`})
      },
      onEditClick() {
        this.setMenuModalVisibility({
          key: this.type,
          value: true,
          action: 'edit'
        })

        this.$store.dispatch(`${this.type}/setItem`, {
          payload: JSON.parse(JSON.stringify(this.item)),
          action: 'edit'
        })
      },
      toggleIsActive(e) {
        e.stopImmediatePropagation()
        if (this.activeLoading) return
        this.activeLoading = true

        this.$store.dispatch(`${this.type}/toggleActive`, {
          payload: this.item.id,
          action: 'list'
        }).then((data) => {
          this.activeLoading = false
          if (!data.success) {
            return this.setSnackbar({snackbar: true, message: data.message, color: 'red'});
          }
          this.setSnackbar({snackbar: true, message: 'Toggled successfully', color: 'success'});
        })
      },
      onConfirm() {
        if (this.deleteLoading) return
        this.deleteLoading = true

        this.$store.dispatch(`${this.type}/deleteItem`, {
          payload: this.item.id,
          action: 'list'
        }).then((data) => {
          this.deleteLoading = false
          if (!data.success) {
            return this.setSnackbar({snackbar: true, message: data.message, color: 'red'});
          }
          this.setSnackbar({snackbar: true, message: 'Deleted successfully', color: 'success'});
        })
      },
      onDeleteClick() {
        this.setModalData({
          key: 'confirm',
          value: {
            visibility: true,
            action: 'delete this item',
            callback: this.onConfirm.bind(this)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .date-font
        font-weight: 500
    .special-date-container
        border-top: 2px solid white
        border-left: 2px solid white
        border-right: 2px solid white
        border-top-left-radius: 30px
        border-top-right-radius: 30px
        padding 5px !important
    .discount-label
        position absolute
        right 0
        transform:matrix(0.66,-0.75,0.75,0.66,0,0);
        color: red
    .ribbon {
        position: absolute;
        left: 11px;
        top: 11px;
        z-index: 1;
        overflow: hidden;
        width: 75px; height: 75px;
        text-align: right;
        transform: scale(1.5)
    }
    .ribbon span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#fe7d34 0%, #de7332 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px; left: -21px;
    }
    .ribbon span::before {
        content: "";
        position: absolute; left: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid #2980b9;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;
    }
    .ribbon span::after {
        content: "";
        position: absolute; right: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #2980b9;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;
    }

    .old-price
        text-decoration line-through

    >>> .v-input--selection-controls
        margin 0 !important

    >>> .v-input__slot
        margin 0 !important
    >>> .v-messages
        display none !important
</style>
