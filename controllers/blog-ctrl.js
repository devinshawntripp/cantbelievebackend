const User = require("../models/user");
const BlogPost = require("../models/blogPost");

const uploadImage = require("../helpers/uploadfile");

const addBlogPost = async (req, res) => {
  try {
    // title: { type: String, required: true },
    // frontFacingPic: { type: String, required: true },
    // summary: { type: String, required: true },
    // likes: { type: Number, required: false },
    // dislikes: { type: Number, required: false },
    // views: { type: Number, required: false },
    // author: { type: String, required: false },
    // metaContent: [
    //   {
    //     metaContentObj: htmlTagSchema,
    //   },
    // ],
    // content: [
    //   {
    //     arrayOfBlogItem: htmlTagSchema,
    //   },
    // ],
    // date: { type: Date, required: false },
    const { title, summary, likes, dislikes, views, author } = req.body;

    console.log(req.files.frontFacingPic);

    const arrayOfBlogItems = JSON.parse(req.body.arrayOfBlogItems);
    console.log("ARRAY OF BLOG ITEMS: ", arrayOfBlogItems);

    const imageUrl = await uploadImage(req.files.frontFacingPic);

    const newBlogPost = new BlogPost({
      title: title,
      frontFacingPic: imageUrl,
      summary: summary,
      likes: likes,
      dislikes: dislikes,
      views: views,
      author: author,
      content: arrayOfBlogItems,
      date: new Date(),
    });

    return newBlogPost.save((error) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Error while saving", error: error.message });
      } else {
        console.log("Blog post saved! at: " + newBlogPost._id);
        return res.status(200).json({
          msg: "successfully saved the blog post with id: " + newBlogPost._id,
        });
      }
    });

    // return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

getAll = async (req, res) => {
  try {
    console.log("HI I AM HERE");
    const blogs = await BlogPost.find({});
    console.log("BLOGS: ", blogs);

    res.status(200).json({
      blogs: blogs,
      msg: "successfully got the blogs",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "some error happened" });
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

addPhoto = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.files.pic);
    return res.status(200).json({
      msg: "successfully uploaded a photo to the google database",
      src: imageUrl,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "uploading unsuccessful", reason: error });
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
  getAll,
  addPhoto,
};
