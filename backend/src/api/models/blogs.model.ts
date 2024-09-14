import { Schema, model } from "mongoose";

const BlogsSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	}
});

export default model("Blogs", BlogsSchema);
