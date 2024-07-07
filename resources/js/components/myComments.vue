<template>
    <section class="comments" id="comments-section">
        <article
            class="comments-item"
            v-for="comment in paginatedComments"
            :key="comment.id"
        >
            <div class="comments-item__body">
                <p class="comments-item__title">{{ comment.name }}</p>
                <date class="comments-item__date">{{ comment.date }}</date>
                <p class="comments-item__text">{{ comment.text }}</p>
                <button
                    @click="removeComment(comment.id)"
                    class="comments-item__btn-remove btn"
                >
                    {{ btnRemoveText }}
                </button>
            </div>
        </article>
        <p v-if="commentsLoading" class="comments-loading">{{ commentsLoadingText }}</p>
        <p v-if="commentsError?.length" class="comments__error error-message">
            {{ commentsError }}
        </p>
        <p
            v-if="removeCommentError?.length"
            class="comments__error error-message"
        >
            {{ removeCommentError }}
        </p>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "MyComments",
    data() {
        return {
            btnRemoveText: "Удалить",
            commentsLoadingText: "Загрузка комментариев"
        };
    },
    computed: {
        ...mapState([
            "commentsLoading",
            "commentsError",
            "removeCommentError",
        ]),
        ...mapGetters(['paginatedComments'])
    },
    methods: {
        ...mapActions(["getComments", "removeComment"]),
    },
    async mounted() {
        await this.getComments();
    },
};
</script>

<style>
.comments {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.comments-item {
    padding: 20px;
    border-radius: 15px;
    background-color: #004cff;
}

.comments-item__body {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.comments-item__title,
.comments-item__date,
.comments-item__text {
    color: white;
}

.comments-item__btn-remove {
    align-self: center;
}
</style>
