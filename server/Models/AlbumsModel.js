import mongoose from "mongoose";

const albumSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    releaseDate: {
      type: String,
      required: [true, "Please add a release date"],
    },
    genre: {
      type: String,
      required: [true, "Please add a genre"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Album", albumSchema);
