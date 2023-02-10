const User = require("../models/user");
const BlogPost = require("../models/blogPost");

const addBlogPost = async (req, res) => {
  try {
    const { title, author, metaContent, content } = req.body;

    const newBlogPost = new BlogPost({
      title: title,
      author: author,
      metaContent: metaContent,
      content: content,
      date: new Date(),
    });

    newBlogPost.save((error) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ msg: "error while saving", error: error.message });
      } else {
        console.log("Blog post saved!");
        res.status(200).json({
          msg:
            "you have successfully saved the blogpost at id: " +
            newBlogPost._id,
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

getBlogPostById = async (req, res) => {
  try {
    console.log("HEY THERE");
    console.log(req);
    const { id } = req.params;
    console.log(id);

    const post = await BlogPost.findOne({ _id: id });
    console.log(post);

    if (!post) {
      return res
        .status(500)
        .json({ msg: "the request resource was not found in the database" });
    }

    console.log(post);

    return res
      .status(200)
      .json({ msg: "Got the blog post successfully", post: post });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const getBlogPostsByQuery = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

editBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findOne({ _id: id });

    if (!post) {
      return res
        .status(500)
        .json({ msg: "the request resource was not found in the database" });
    }

    const { title, author, metaContent, content } = req.body;

    // content.map((con) => {
    //   console.log(con);
    //   console.log(con.tag);
    //   console.log(con.class);
    //   con.tag.extraTags.map((tag) => {
    //     console.log(tag);
    //     tag.tag.extraTags.map((extraTag) => {
    //       console.log(extraTag);
    //     });
    //   });
    // });

    console.log("A REQUEST WAS SENT");

    if (title && title !== "") {
      post.title = title;
    }
    if (author && author !== "") {
      post.author = author;
    }
    if (metaContent) {
      post.metaContent = metaContent;
    }
    if (content) {
      post.content = null;
      post.content = content;
      console.log("ADDED SOME CONTENT");
    }

    console.log(post);

    post.content.map((con) => {
      console.log(con);
      console.log(con.tag);
      console.log(con.class);
      con.tag.extraTags.map((tag) => {
        console.log(tag);
        tag.tag.extraTags.map((extraTag) => {
          console.log(extraTag);
        });
      });
    });

    post
      .save()
      .then()
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          msg: "Some error occurred during saving the document",
          error: err.message,
        });
      });

    console.log("ADDING THE DESCRIPTION");

    return res.status(200).json({ msg: `Saved the id ${post.id}` });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

deleteBlogPostById = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addBlogPost,
  getBlogPostById,
  getBlogPostsByQuery,
  editBlogPostById,
  deleteBlogPostById,
};
