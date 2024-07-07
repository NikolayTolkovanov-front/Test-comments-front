<template>
    <section class="container">
        <h1 class="h1">Comments</h1>

        <!-- successMessage -->
        <SuccessMessage />
        <!-- Sorting -->
        <MySorting />
        <!-- Comments -->
        <MyComments />
        <!-- Pagination -->
        <MyPagination />
        <!-- Form -->
        <MyForm />
    </section>
</template>
<script>
import MySorting from "../components/mySorting.vue";
import MyComments from "../components/myComments.vue";
import MyPagination from "../components/myPagination.vue";
import MyForm from "../components/myForm.vue";
import SuccessMessage from '../components/successMessage.vue';

const default_layout = "default";

export default {
    name: "App",
    components: { MySorting, MyComments, MyPagination, MyForm, SuccessMessage },

    data() {
        return {
            message: "Hello world",
        };
    },
    methods: {
    },
    async mounted() {
    }
};
</script>
<style>
.container {
    max-width: 75rem;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: Tahoma, Geneva, sans-serif;
    max-width: 500px;
    background-color: #00b4ff;
    border-radius: 15px;
    margin-top: 30px;
}
</style>
