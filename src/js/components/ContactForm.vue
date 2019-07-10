<template>
    <b-form class="contact-form" @submit.prevent="submit">
        <div class="message" v-bind:class="{'message_error': !success, 'message_success': success}"
             v-if="message.length && messageProgress > 0">
            <p>
                {{ message }}
            </p>
            <b-progress :value="messageProgress" :max="maxProgress" class="mb-3" :variant="success ? 'success' : 'danger'"
                        height="3px"></b-progress>
        </div>
        <b-form-group class="contact-form__field">
            <b-form-input :placeholder="nameText" v-model="form.name" class="contact-form__input"
                          autocomplete="off" :title="fillText"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-input placeholder="E-mail" type="email" v-model="form.email"
                          class="contact-form__input" autocomplete="off" :title="fillText"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-textarea v-model="form.text" :placeholder="messageText" :rows="3" :max-rows="6"
                             class="contact-form__input" autocomplete="off" :title="fillText"></b-form-textarea>
        </b-form-group>
        <b-form-group class="contact-form__field contact-form__field_left">
            <vue-recaptcha sitekey="6LfoGIkUAAAAABynlLPkWxTcUj1X9dpYWYGtF6FA" size="compact" @expired="resetCaptcha">
                <button type="submit" class="btn btn-secondary contact-form__submit">
                    <span v-bind:class="{'contact-form__submit-text': true, 'contact-form__submit-text_pale': submitted}">{{ sendText }}</span>
                    <vue-loading :active="submitted" color="#fff" spinner="ring"></vue-loading>
                </button>
            </vue-recaptcha>
        </b-form-group>
    </b-form>
</template>

<script>
    import VueLoading from 'vue-element-loading';
    import VueRecaptcha from 'vue-recaptcha';

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
            checkFields (fields) {
                for (var i = 0; i < this.requiredFields; i++) {
                    if (!fields[this.requiredFields[i]].trim().length) {
                        return false;
                    }
                }

                return true;
            },

            submit() {
                this.submitted = true;

                const $vm = this;

                var fields = this.form,
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

            clean () {
                this.resetCaptcha();

                for (var key in this.form) {
                    this.form[key] = '';
                }
            },

            resetCaptcha () {
                window.grecaptcha.reset();
            }
        },

        components: {VueLoading, VueRecaptcha}
    }
</script>

<style scoped>
    .contact-form__submit .velmld-overlay {
        background-color: transparent;
    }
</style>