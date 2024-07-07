<template>
    <section class="sorting-btns" v-show="paginatedComments.length">
        <button class="sorting-btns__btn btn" @click="toggleSorting('id')">
            {{ sortIdBtnText }}
            <span
                v-if="sortKey === 'id'"
                class="sorting-btns__indicator"
                :class="{
                    asc: sortOrder === 'asc',
                    desc: sortOrder === 'desc',
                }"
            ></span>
        </button>
        <button class="sorting-btns__btn btn" @click="toggleSorting('date')">
            {{ sortDateBtnText }}
            <span
                v-if="sortKey === 'date'"
                class="sorting-btns__indicator"
                :class="{
                    asc: sortOrder === 'asc',
                    desc: sortOrder === 'desc',
                }"
            ></span>
        </button>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "MySorting",
    data() {
        return {
            sortIdBtnText: "Sort by ID",
            sortDateBtnText: "Sort by date",
        };
    },

    computed: {
        ...mapState(['sortKey', 'sortOrder']),
        ...mapGetters(['paginatedComments'])
    },

    methods: {
        ...mapActions(['toggleSort']),
        toggleSorting(key) {
            const newOrder = (this.sortKey === key && this.sortOrder === 'asc') ? 'desc' : 'asc'
            this.toggleSort({key, order: newOrder})
        },
    },
};
</script>

<style>
.sorting-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.sorting-btns__indicator {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
}

.asc {
    transform: rotate(180deg)
}

.desc {
    transform: rotate(0deg)
}
</style>
