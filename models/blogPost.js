const mongoose = require("mongoose");

const Attributes = new mongoose.Schema({
  class: { type: String, required: false },
  src: { type: String, required: false },
  id: { type: String, required: false },
  altText: { type: String, required: false },
  href: { type: String, required: false },
});
const extraTags = new mongoose.Schema({
  tag: { type: String, required: true },
  attributes: Attributes,
  content: { type: mongoose.Mixed, required: false },
});

const htmlTagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  value: { type: String, required: false },
  attributes: Attributes,
  language: { type: String, required: false },
  extraInfo: [
    {
      name: { type: String, required: false },
      content: { type: String, required: false },
      required: false,
    },
  ],
  extraTags: {
    type: [
      {
        extraInnerTags: extraTags,
      },
    ],
    required: false,
  },
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  frontFacingPic: { type: String, required: true },
  summary: { type: String, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  views: { type: Number, required: false },
  author: { type: String, required: false },
  // metaContent: [
  //   {
  //     metaContentObj: htmlTagSchema,
  //   },
  // ],
  content: [
    {
      arrayOfBlogItem: htmlTagSchema,
    },
  ],
  date: { type: Date, required: false },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
// const HtmlTag = mongoose.model("htmlTag", htmlTagSchema);

module.exports = BlogPost;
