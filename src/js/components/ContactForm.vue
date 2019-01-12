<template>
    <b-form class="contact-form" @submit.prevent="submit">
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
            <vue-recaptcha sitekey="6LfoGIkUAAAAABynlLPkWxTcUj1X9dpYWYGtF6FA" size="compact">
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

                axios.post('/mail', form)
                    .then(function(response) {

                    }, function (response) {

                    });
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