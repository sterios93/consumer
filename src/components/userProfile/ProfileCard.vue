<template>
  <v-form>
    <v-container py-0>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-model="firstName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
            label="First Name"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12  md6>
          <v-text-field
            v-model="lastName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
            label="Last Name"
            class="purple-input"
          />
        </v-flex>

        <v-flex xs12 md6 :class="{ disabled: !inEditMode }">
          <span class="label">Phone number</span>
          <CustomPhoneValidate
            :disabled="!inEditMode"
            v-model="phoneNumber"
            @validate="validatePhoneNumbebr"
          />
        </v-flex>

		<v-flex xs12 md6>
			<v-btn
              :class="{ disabled: !inEditMode }"
            	class="mx-0"
            	color="primary"
            	@click="togglePasswordView"
          		>Change Password
			</v-btn>
		</v-flex>

        <v-flex xs12 md6 v-if="showPassFields && inEditMode">
          <v-text-field
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            v-model="oldPassword"
            :type="showPassword ? 'text' : 'password'"
            :error="inEditMode"
            :rules="[rules.required,rules.min]"
            :disabled="!inEditMode"
            class="purple-input"
            label="Old Password"
            required
            @click:append="showPassword = !showPassword"
          />
        </v-flex>

        <v-flex xs12 md6 v-if="showPassFields && inEditMode">
          <v-text-field
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :error="inEditMode"
            :rules="[rules.required, rules.min]"
            :disabled="!inEditMode"
            class="purple-input"
            label="New Password"
            hint="At least 6 characters"
            required
            @click:append="showPassword = !showPassword"
          />
        </v-flex>

        <v-flex xs12 md6 v-if="showPassFields">
          <v-text-field
            :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
            v-model="passwordRepeat"
            :type="showRepeatPassword ? 'text' : 'password'"
            :error="inEditMode"
            v-if="inEditMode"
            :rules="[rules.required, rules.password, rules.min]"
            class="purple-input"
            label="Repeat New Password"
            required
            hint="At least 6 characters"
            @click:append="showRepeatPassword = !showRepeatPassword"
          />
        </v-flex>

        <v-flex xs12 text-xs-right>
          <v-btn
            class="mr-2 font-weight-light"
            color="orange"
            dark
            @click="setEditMode(true)">
            <v-icon class="mr-1">mdi-account-edit</v-icon>Edit Profile
          </v-btn>
          <v-btn
            v-if="inEditMode"
            class="mx-0 font-weight-light"
            color="success"
            @click="saveProfile"
          >Save Profile</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import CustomPhoneValidate from '../shared/CustomPhoneValidate'
import { mapState, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'ProfileCard',
  components: {
    CustomPhoneValidate
  },
  mixins: [validationMixin],
  props: {
    forceEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      passwordRepeat: null,
      oldPassword: null,
	    showPassword: false,
	    showPassFields: false,
      showRepeatPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 6) || 'Min 6 characters',
        password: value => {
          if (value !== this.password) return 'Passwords does not match'
        }
      }
    }
  },
  beforeDestroy () {
    this.setEditMode(false)
  },
  computed: {
    ...mapState({
      userInfo: state => state.userProfile,
      inEditModeStore: state => state.userProfile.inEditMode
    }),
    inEditMode () {
      return this.inEditModeStore || this.forceEdit
    },
    firstName: {
      get () {
        return this.userInfo.firstName
      },
      set (value) {
        this.setFirstName(value)
      }
    },
    lastName: {
      get () {
        return this.userInfo.lastName
      },
      set (value) {
        this.setLastName(value)
      }
    },
    phoneNumber: {
      get () {
        return this.userInfo.phoneNumber
      },
      set (value) {
        this.setPhoneNumber(value);
      }
    },
    password: {
      get () {
        return this.userInfo.password
      },
      set (value) {
        this.setPassword(value)
      }
    },
  },
  watch: {
    passwordRepeat: {
      handler (value) {

      }
    }
  },
  methods: {
    ...mapActions('userProfile', [
      'setEditMode',
      'setFirstName',
      'setLastName',
      'setEmail',
      'setPhoneNumber',
      'setPassword',
      'updateProfile'
    ]),
    ...mapActions('snackbar', ['setState']),
    validatePhoneNumbebr (e) {
      this.setProfileValid(e.isValid)
	},
	togglePasswordView() {
		this.showPassFields = !this.showPassFields
	},
    saveProfile () {
      let payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phoneNumber,
      };

      if (this.showPassFields) {
        payload.passwords = {
          oldPassword: this.oldPassword,
          newPassword: this.password,
          repeatedPassword: this.passwordRepeat,
        };
      }
      this.updateProfile(payload);
      this.setEditMode(false);
      this.togglePasswordView();
    }
  }
}
</script>

<style scoped lang="stylus">
.disabled {
  pointer-events: none;
}

.label {
  font-size: 11px;
  color: grey;
  position: absolute;
  z-index: 1;
  transform: translateY(-5px);
}
</style>
