<template>
    <v-card color="white darken-2 text-xs-center">

        <v-card-actions v-if="isEditable">
            <v-spacer></v-spacer>
            <v-btn icon @click="onEditClick">
                <v-icon color="grey">edit</v-icon>
            </v-btn>
            <v-btn
                    icon
                    @click="onDeleteClick"
                    :loading="deleteLoading"
                    :disabled="deleteLoading"
            >
                <v-icon color="grey">delete</v-icon>
            </v-btn>
        </v-card-actions>

        <v-layout py-1 align-center justify-space-between row wrap fill-height>

            <v-flex xs12 sm3>
                <v-img
                    :src="item.image"
                    height="125px"
                    contain
                ></v-img>
            </v-flex>

            <v-flex xs12 sm7>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{item.name}}</div>
                        <div>{{item.description}}</div>
                    </div>
                </v-card-title>
            </v-flex>

            <v-flex xs12 sm2>
                <div class="headline">{{item.price | formatCurrency}}</div>
            </v-flex>
        </v-layout>

        <v-divider light></v-divider>

        <v-card-actions
                v-if="isSpecial"
                class="pa-3">
            <v-btn
                    color="green"
                    @click="readMore"
            >
                Read more
            </v-btn>
            <v-spacer></v-spacer>
            <div class="body-2 red--text">EXPIRES AT: {{item.endDate}}</div>
        </v-card-actions>

    </v-card>
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
      }
    },
    data() {
      return {
        deleteLoading: false,
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

</style>
