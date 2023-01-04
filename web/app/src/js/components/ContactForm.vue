<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="message" v-bind:class="{'message_error': !success, 'message_success': success}"
         v-if="message.length && messageProgress > 0">
      <p>
        {{ message }}
      </p>
      <div class="progress mb-3" style="height: 3px;">
        <div class="progress-bar" role="progressbar" :style="progressBarStyles" :class="progressBarClass"></div>
      </div>
    </div>
    <fieldset class="form-group contact-form__field">
      <div>
        <input class="form-control contact-form__input" type="text" :placeholder="nameText" v-model="form.name"
               autocomplete="off" :title="fillText">
      </div>
    </fieldset>
    <fieldset class="form-group contact-form__field">
      <div>
        <input class="form-control contact-form__input" placeholder="E-mail" type="email" v-model="form.email"
               autocomplete="off" :title="fillText">
      </div>
    </fieldset>
    <fieldset class="form-group contact-form__field">
      <div>
        <textarea class="form-control contact-form__input" v-model="form.text" :placeholder="messageText" rows="5"
                  autocomplete="off" :title="fillText" style="resize: none;"></textarea>
      </div>
    </fieldset>
    <fieldset class="form-group contact-form__field contact-form__field_left">
      <div>
        <vue-recaptcha sitekey="6LdVSq4ZAAAAABiCNnPDs5ZsSz_F68BpDfilV8Rt" size="compact"
                       @verify="captchaVerified" @expired="resetCaptcha" ref="captcha">
          <button type="submit" class="btn btn-secondary contact-form__submit">
          <span v-bind:class="{'contact-form__submit-text': true, 'contact-form__submit-text_pale': submitted}">
            {{ sendText }}
          </span>
            <vue-loading :active="submitted" color="#fff" spinner="ring"></vue-loading>
          </button>
        </vue-recaptcha>
      </div>
    </fieldset>
  </form>
</template>

<script>
import VueLoading from 'vue-element-loading';
import {VueRecaptcha} from 'vue-recaptcha';
import axios from 'axios';

export default {
  name: "ContactForm",

  data() {
    return {
      submitted: false,
      success: false,
      messageProgress: 0,
      maxProgress: 100,
      requiredFields: ['name', 'text', 'email'],
      message: '',
      form: {
        name: '',
        text: '',
        email: '',
      },
      captcha: false,
    }
  },
  props: ['nameText', 'messageText', 'sendText', 'fillText', 'captchaNotPassed', 'fieldsNotFilled', 'messageSent', 'sendingError'],
  methods: {
    checkFields(fields) {
      for (let i = 0; i < this.requiredFields.length; i++) {
        if (!fields[this.requiredFields[i]].trim()) {
          return false;
        }
      }

      return true;
    },
    submit() {
      this.submitted = true;
      let fields = this.form;

      if (!this.checkFields(fields)) {
        this.showResult(0, this.fieldsNotFilled);
        return;
      }

      if (!this.captcha && !this.isDev) {
        this.showResult(0, this.captchaNotPassed);
        return;
      }

      axios.post('/mail', fields)
          .then((response) => {
            this.clean();

            let message = '';
            if (response.data.errorCode) {
              switch (response.data.errorCode) {
                case 1:
                  message = this.fieldsNotFilled;
                  break;
              }
            } else {
              message = this.messageSent;
            }

            this.showResult(response.data.success, message);
          }, (response) => {
            this.showResult(false, this.sendingError);
          });
    },
    showResult(success, message) {
      this.submitted = false;
      this.success = success;
      this.message = message;

      this.messageProgress = 100;
      this.startProgress();

      window.scrollTo({
        top: this.$parent.$el.offsetTop,
        behavior: 'smooth',
      });
    },
    startProgress() {
      const progress = () => {
        this.messageProgress -= 2;
        if (this.messageProgress > 0) {
          setTimeout(progress, 100);
        }
      };

      setTimeout(progress, 100);
    },
    clean() {
      this.resetCaptcha();

      for (let key in this.form) {
        this.form[key] = '';
      }
    },
    resetCaptcha() {
      this.$refs.captcha.reset();
      this.captcha = false;
    },
    captchaVerified(response) {
      this.captcha = response;
    }
  },
  computed: {
    isDev() {
      return window.location.host !== 'vsv-kloster.ru';
    },
    progressBarStyles() {
      return {
        'height': '3px',
        'width': `${this.messageProgress}%`,
      }
    },
    progressBarClass() {
      return {
        'bg-danger': !this.success,
        'bg-success': this.success,
      }
    }
  },
  components: {VueLoading, VueRecaptcha}
}
</script>

<style>
.contact-form__submit .velmld-overlay {
  background-color: transparent;
  border-radius: 0.2rem;
}
</style>
