<template>
    <section class="pagination" v-show="paginatedComments.length">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination__btn btn">prev</button>
        <span class="pagination__page">{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination__btn btn">next</button>
    </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
    name: "Pagination",
    computed: {
        ...mapState(['currentPage']),
        ...mapGetters(['totalPages', 'paginatedComments'])
    },
    methods: {
        ...mapActions(['nextPage', 'prevPage'])
    },
};
</script>

<style>
.pagination {
    margin: 0 auto;
}
</style>
