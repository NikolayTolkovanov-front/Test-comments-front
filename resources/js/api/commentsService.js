import axios from "axios";

class commentsService {
    #baseURL;
    constructor() {
        this.#baseURL = new URL("http://localhost/api/comments");
    }

    #validateError(error) {
        if (error.response) {
            console.error("Error response:", error.response.data);
            throw new Error(
                "Server error: " +
                    (error.response.data.message || error.response.statusText)
            );
        } else if (error.request) {
            console.error("Error request:", error.request);
            throw new Error("Network error: No response received");
        } else {
            console.error("Error message:", error.message);
            throw new Error(error.message);
        }
    }

    async getComments() {
        try {
            const response = await axios.get(this.#baseURL);

            if (
                !response.data ||
                !Array.isArray(response.data)
            ) {
                throw new Error("No comments found");
            }

            if (!response.data.length) {
                return []
            }

            return response.data;
        } catch (error) {
            return this.#validateError(error)
        }
    }

    async addComment(name, text, date) {
        try {
            const response = await axios.post(this.#baseURL, {
                name,
                text,
                date,
            });

            if (!response.data || typeof response.data !== 'object' ) {
                throw new Error("Comment not saved, no data");
            }
            return response.data;
        } catch (error) {
            return this.#validateError(error)
        }
    }

    async removeComment(commentId) {
        try {
            const newURL = new URL(`comments/${commentId}`, this.#baseURL)
            const response = await axios.delete(newURL);

            if (!response.data || typeof response.data !== 'string' ) {
                throw new Error("Comment not removed, no data");
            }
            return response.data;
        } catch (error) {
            return this.#validateError(error)
        }
    }
}

export default new commentsService();
