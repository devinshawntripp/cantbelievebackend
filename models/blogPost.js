const mongoose = require("mongoose");

const extraTags = new mongoose.Schema({
  tag: { type: String, required: true },
  class: { type: String, required: false },
  name: { type: String, required: false },
  content: { type: String, required: false },
  id: { type: String, required: false },
  src: { type: String, required: false },
  href: { type: String, required: false },
});

const htmlTagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  class: { type: String, required: false },
  name: { type: String, required: false },
  content: { type: String, required: false },
  id: { type: String, required: false },
  src: { type: String, required: false },
  href: { type: String, required: false },
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
        tag: extraTags,
        text: { type: String, required: false },
      },
    ],
    required: false,
  },
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: false },
  author: { type: String, required: false },
  metaContent: [
    {
      tag: htmlTagSchema,
    },
  ],
  content: [
    {
      tag: htmlTagSchema,
      text: { type: String, required: false },
    },
  ],
  date: { type: Date, required: false },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
// const HtmlTag = mongoose.model("htmlTag", htmlTagSchema);

module.exports = BlogPost;
