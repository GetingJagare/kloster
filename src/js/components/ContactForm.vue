<template>
  <form class="contact-form" @submit.prevent="submit">
    <div class="message mb-3" v-bind:class="{'message_error': !success, 'message_success': success}"
         v-if="message.length && messageProgress > 0">
      <p>
        {{ message }}
      </p>
      <div class="progress">
        <div class="progress-bar" :class="{'bg-danger': !success, 'bg-success': success}" role="progressbar"
             :aria-valuenow="messageProgress" aria-valuemin="0" :aria-valuemax="maxProgress"
             :style="{'width': `${messageProgress}%`}"></div>
      </div>
    </div>
    <div class="mb-3 contact-form__field">
      <input :placeholder="nameText" v-model="form.name" class="form-control contact-form__input" autocomplete="off"
             :title="fillText"/>
    </div>
    <div class="mb-3 contact-form__field">
      <input placeholder="E-mail" type="email" v-model="form.email" class="form-control contact-form__input"
             autocomplete="off"
             :title="fillText"/>
    </div>
    <div class="mb-3 contact-form__field">
      <textarea v-model="form.text" :placeholder="messageText" :rows="3" :max-rows="6"
                class="form-control contact-form__input"
                autocomplete="off" :title="fillText"></textarea>
    </div>
    <div class="mb-3 contact-form__field contact-form__field_left">
      <vue-recaptcha sitekey="6LdVSq4ZAAAAABiCNnPDs5ZsSz_F68BpDfilV8Rt" size="compact" @expired="resetCaptcha">
        <button type="submit" class="btn btn-secondary contact-form__submit">
        <span v-bind:class="{'contact-form__submit-text': true, 'contact-form__submit-text_pale': submitted}">
          {{ sendText }}
        </span>
          <vue-element-loading :active="submitted" color="#fff" spinner="ring"></vue-element-loading>
        </button>
      </vue-recaptcha>
    </div>
  </form>
</template>

<script>
import VueElementLoading from "vue-element-loading";
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
        email: ''
      }
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

      const $vm = this;

      let fields = this.form,
          gRecaptchaValue = document.querySelector('.contact-form').querySelector('#g-recaptcha-response').value;

      if (!this.checkFields(fields)) {
        this.showResult(0, this.fieldsNotFilled);
        return;
      }

      if (!gRecaptchaValue) {
        this.showResult(0, this.captchaNotPassed);
        return;
      }

      fields = Object.assign(
          {},
          fields,
          {'g-recaptcha-response': gRecaptchaValue}
      );

      axios.post('/mail', fields)
          .then(function (response) {
            $vm.clean();

            var message = '';
            if (response.data.errorCode) {
              switch (response.data.errorCode) {
                case 1:
                  message = $vm.captchaNotPassed;
                  break;
                case 2:
                  message = $vm.fieldsNotFilled;
                  break;
              }
            } else {
              message = $vm.messageSent;
            }

            $vm.showResult(response.data.success, message);
          }, function (response) {
            $vm.showResult(false, $vm.sendingError);
          });
    },

    showResult(success, message) {
      this.submitted = false;
      this.success = success;
      this.message = message;

      this.messageProgress = 100;
      this.startProgress();

      window.scrollTo({
        top: document.querySelector('#contacts').offsetTop,
        behavior: 'smooth'
      });
    },

    startProgress() {
      const $vm = this;

      const progress = function () {
        $vm.messageProgress -= 2;
        if ($vm.messageProgress > 0) {
          setTimeout(progress, 100);
        }
      };

      setTimeout(progress, 100);
    },

    clean() {
      this.resetCaptcha();

      for (var key in this.form) {
        this.form[key] = '';
      }
    },

    resetCaptcha() {
      window.grecaptcha.reset();
    }
  },

  components: {VueElementLoading, VueRecaptcha}
}
</script>

<style>
.contact-form .progress,
.contact-form .progress-bar {
  height: 3px;
}
.contact-form__submit .velmld-overlay {
  background-color: transparent;
}
</style>
