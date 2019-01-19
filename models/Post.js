const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({

    title: {
        type: String,
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true
    },

    date: {
        type: String,
        default: Date.now
    },

    isSaved: {
        type: Boolean,
        default: false
    },

    comment: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;