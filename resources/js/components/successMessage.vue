<template>
    <div v-if="successMessage?.length" class="message-success">
        <p class="message-success__text">
            {{ successMessage }}
        </p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["successMessage"]),
    },
};
</script>
<style>
.message-success {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 200px;
    padding: 20px;
    background-color: #004cff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.message-success__text {
    color: white;
}
</style>
