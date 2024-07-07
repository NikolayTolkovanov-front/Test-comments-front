<template>
    <section class="form">
        <form @submit.prevent="validateForm()" class="form-list">
            <div class="form-item">
                <label class="form-item__label" for="name">Ваше имя</label>
                <input
                    v-model="name"
                    type="text"
                    class="form-item__input input"
                    id="name"
                    name="name"
                    placeholder="Например Мурадин"
                    required
                />
            </div>
            <div class="form-item">
                <label class="form-item__label" for="comment"
                    >Комментарий</label
                >
                <textarea
                    v-model="text"
                    class="form-item__textarea input"
                    id="comment"
                    name="comment"
                    rows="3"
                    placeholder="Напишите ваш комментарий"
                    required
                >
ffff</textarea
                >
            </div>
            <div class="form-item">
                <label class="form-item__label" for="date">Дата</label>
                <DatePicker
                    input-class="input"
                    id="date"
                    format="DD-MM-YYYY"
                    value-type="DD-MM-YYYY"
                    v-model="date"
                />
            </div>
            <button type="submit" class="form-btn btn">
                {{ btnSubmitText }}
            </button>
        </form>

        <ul
            v-for="error in addCommentErrors"
            :key="error.id"
            class="message-errors"
        >
            <li class="error-message">{{ error }}</li>
        </ul>
    </section>
</template>

<script>
import DatePicker from "vue2-datepicker";
import { mapState, mapActions } from "vuex";

export default {
    name: "MyForm",
    components: { DatePicker },
    data() {
        return {
            name: "",
            text: "",
            date: "",
            btnSubmitText: "Отправить",
        };
    },

    computed: {
        ...mapState(["addCommentErrors"]),
    },

    methods: {
        ...mapActions(["addComment"]),
        async validateForm() {
            if (this.name && this.text && this.date) {
                const form = {
                    name: this.name,
                    text: this.text,
                    date: this.date,
                };

                await this.addComment(form);
                return;
            }

            this.$store.commit("CLEAR_ADD_COMMENT_ERRORS");

            if (!this.name) {
                this.$store.commit("ADD_COMMENT_FAIL", "field name required");
            }

            if (!this.text) {
                this.$store.commit("ADD_COMMENT_FAIL", "field text required");
            }

            if (!this.date) {
                this.$store.commit("ADD_COMMENT_FAIL", "field date required");
            }
        },
    },
};
</script>

<style>
.form-list {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-item__textarea {
    resize: none;
}
</style>
