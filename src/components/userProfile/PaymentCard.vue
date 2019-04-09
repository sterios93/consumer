<template>
    <v-form>
        <v-container py-0>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                            label="Card Number"
                            class="purple-input"
                            :value="paymentInfo.cardNumber"/>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="BIC Number"
                            class="purple-input"
                            :value="paymentInfo.bic"/>
                </v-flex>

                <v-flex xs12 text-xs-right >
                    <v-btn
                            class="mr-2 font-weight-light"
                            color="orange"
                            dark
                    >
                        <v-icon class="mr-1">
                            mdi-account-edit
                        </v-icon>
                        Edit Payment
                    </v-btn>
                    <v-btn
                            class="mx-0 font-weight-light"
                            color="success"
                    >
                        Save Payment
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    import {mapState} from 'vuex'

    // TODO :: Hide the card number ?
    // TODO :: Add edit logic and validation
    
    export default {
      name: 'payment-card',
      data() {
        return {}
      },
      computed: {
        ...mapState({
          paymentInfo: (state) => state.payInfo,
        })
      }
    }

</script>

<style scoped lang="stylus"></style>
