import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating").min(0).max(5),
});

const songValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a song name")
    .max(50, "Song name should be less than 50 characters"),
  genre: yup.string().required("Please enter a song genre"),
  language: yup.string().required("Please enter a language"),
  year: yup.string().required("Please enter year of release"),
  album: yup.string().required("Please enter album name"),
  desc: yup
    .string()
    .required("Please enter a description")
    .max(300, "Description should be less than 300 characters"),
});

export { ReviewValidation, songValidation };
