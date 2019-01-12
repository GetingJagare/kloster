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
            <b-form-input placeholder="Имя" required v-model="form.name" class="contact-form__input"
                          autocomplete="off"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-input placeholder="E-mail" type="email" required v-model="form.email"
                          class="contact-form__input" autocomplete="off"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-textarea v-model="form.text" placeholder="Ваш вопрос" :rows="3" :max-rows="6" required
                             class="contact-form__input" autocomplete="off"></b-form-textarea>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <vue-recaptcha sitekey="6LfoGIkUAAAAABynlLPkWxTcUj1X9dpYWYGtF6FA" size="compact" @expired="$emit('reset');">
                <button type="submit" class="btn btn-secondary contact-form__submit">
                    <span v-bind:class="{'contact-form__submit-text': true, 'contact-form__submit-text_pale': submitted}">Отправить</span>
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
                message: '',
                form: {
                    name: '',
                    text: '',
                    email: ''
                }
            }
        },

        methods: {
            submit() {
                this.submitted = true;

                const $vm = this;

                var fields = this.form;

                fields = Object.assign(
                        {},
                        fields,
                        {'g-recaptcha-response': document.querySelector('.contact-form').querySelector('#g-recaptcha-response').value}
                    );

                axios.post('/mail', fields)
                    .then(function (response) {
                        $vm.clean();
                        $vm.showResult(response.data.success, response.data.message)
                    }, function (response) {
                        $vm.showResult(false, 'Произошла ошибка при отправке');
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
                for (var key in this.form) {
                    this.form[key] = '';
                }
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