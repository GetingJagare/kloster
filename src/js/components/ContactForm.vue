<template>
    <b-form class="contact-form" @submit.prevent="submit">
        <b-form-group class="contact-form__field">
            <b-form-input placeholder="Имя" required v-model="name" class="contact-form__input"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-input placeholder="E-mail" type="email" required v-model="email"
                          class="contact-form__input"></b-form-input>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-form-textarea v-model="text" placeholder="Ваш вопрос" :rows="3" :max-rows="6" required
                             class="contact-form__input"></b-form-textarea>
        </b-form-group>
        <b-form-group class="contact-form__field">
            <b-button type="submit" class="contact-form__submit">
                <span v-bind:class="{'contact-form__submit-text': true, 'contact-form__submit-text_pale': submitted}">Отправить</span>
                <vue-loading :active="submitted" color="#fff" spinner="ring"></vue-loading>
            </b-button>
        </b-form-group>
    </b-form>
</template>

<script>
    import VueLoading from 'vue-element-loading';

    export default {
        name: "ContactForm",

        data() {
            return {
                submitted: false,
                name: '',
                text: '',
                email: ''
            }
        },

        methods: {
            submit () {
                this.submitted = true;

                this.$http.post()
            }
        },

        components: {VueLoading}
    }
</script>

<style scoped>
    .contact-form__submit .velmld-overlay {
        background-color: transparent;
    }
</style>