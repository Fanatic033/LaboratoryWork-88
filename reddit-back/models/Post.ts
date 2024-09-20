import mongoose, {Schema,Types} from "mongoose";
import User from "./User";

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message:('Author not found'),
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
  image: {
        type: String,
      required: false,
  },
  datetime: {
      type: Date,
    default: Date.now,
    required: true,
  }
})

const Post = mongoose.model("Post", PostSchema);

export default Post;