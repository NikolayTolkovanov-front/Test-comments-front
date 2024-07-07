import Vue from "vue";
import Vuex from "vuex";
import commentsService from "../api/commentsService";

Vue.use(Vuex);

const commentsStore = new Vuex.Store({
    state() {
        return {
            comments: [],
            commentsLoading: false,
            commentsError: null,
            addCommentErrors: [],
            removeCommentError: null,
            successMessage: null,
            currentPage: 1,
            perPage: 3,
            sortKey: 'date',
            sortOrder: 'asc'
        }
    },

    actions: {
        async getComments({ commit, state }) {
            try {
                state.commentsLoading = true
                const comments = await commentsService.getComments();

                if (!comments.length) {
                    throw new Error('Список комментариев пуст')
                }

                commit("GET_COMMENTS_SUCCESS", comments);
            } catch (error) {
                commit("GET_COMMENTS_FAIL", error.message);
            }
        },

        async addComment({ commit }, form) {
            try {
                console.log('form', form);
                if (!form?.name.length || !form?.text.length || !form?.date.length) {
                    throw new Error('fields are not filled')
                }

                let savedComment = await commentsService.addComment(form.name, form.text, form.date);
                commit("ADD_COMMENT_SUCCESS", savedComment);
                commit("TOGGLE_SUCCESS_MESSAGE", "comment success added")
            } catch (error) {
                commit("ADD_COMMENT_FAIL", error.message);
            }
        },

        async removeComment({ commit, dispatch, getters }, commentId) {
            try {
                if (!Number.isInteger(commentId) || commentId <= 0) {
                    throw new Error('fields are not filled')
                }

                let removeComMessage = await commentsService.removeComment(commentId);

                commit("REMOVE_COMMENT_SUCCESS", commentId)
                commit("TOGGLE_SUCCESS_MESSAGE", removeComMessage)

                if (!getters.paginatedComments.length) {
                    dispatch('prevPage')
                }
            } catch (error) {
                commit("REMOVE_COMMENT_FAIL", error.message);
            }
        },

        toggleSort({ commit }, { key, order }) {
            commit('SET_SORT_ORDER', { key, order });
        },

        nextPage({ commit, state }) {
            if (state.currentPage * state.perPage < state.comments.length) {
                commit('SET_CURRENT_PAGE', state.currentPage + 1);
            }
        },
        prevPage({ commit, state }) {
            if (state.currentPage > 1) {
                commit('SET_CURRENT_PAGE', state.currentPage - 1);
            }
        }
    },

    mutations: {
        GET_COMMENTS_SUCCESS(state, comments) {
            state.comments = comments;

            if (state?.commentsError?.length) {
                state.commentsError = null;
            }

            state.commentsLoading = false
        },
        GET_COMMENTS_FAIL(state, error) {
            state.commentsLoading = false
            state.commentsError = error;
        },

        ADD_COMMENT_SUCCESS(state, savedComment) {
            if (state.addCommentErrors.length) {
                state.addCommentErrors = [];
            }
            state.comments = [...state.comments, savedComment]

            state.commentsLoading = false
        },
        ADD_COMMENT_FAIL(state, error) {
            state.addCommentErrors.push(error);
        },
        CLEAR_ADD_COMMENT_ERRORS(state) {
            if (state.addCommentErrors.length) {
                state.addCommentErrors = []
            }
        },

        REMOVE_COMMENT_SUCCESS(state, commentId) {
            if (state?.removeCommentError?.length) {
                state.removeCommentError = null
            }
            state.comments = state.comments.filter((comment) => comment.id !== commentId);
        },
        REMOVE_COMMENT_FAIL(state, error) {
            state.removeCommentError = error;
        },

        TOGGLE_SUCCESS_MESSAGE(state, message) {
            state.successMessage = message

            setTimeout(() => {
                state.successMessage = null
            }, 5000);

        },

        SET_SORT_ORDER(state, { key, order }) {
            state.sortKey = key;
            state.sortOrder = order;

            console.log('state.sortKey', state.sortKey);
            console.log('state.sortOrder', state.sortOrder);
        },

        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page;
        }
    },

    getters: {
        sortedComments: (state) => {
            return state.comments.sort((a, b) => {
                if (state.sortOrder === 'asc') {
                    return a[state.sortKey] > b[state.sortKey] ? 1 : -1;
                } else {
                    return a[state.sortKey] < b[state.sortKey] ? 1 : -1;
                }
            });
        },
        paginatedComments(state, getters) {
            const start = (state.currentPage - 1) * state.perPage;
            const end = start + state.perPage;
            console.log('length', getters.sortedComments.slice(start, end));
            return getters.sortedComments.slice(start, end);
        },
        totalPages(state) {
            return Math.ceil(state.comments.length / state.perPage);
        },
    }
});

export default commentsStore;
