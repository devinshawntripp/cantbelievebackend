const amazItem = require("../models/amazonItem");

const uploadImage = require("../helpers/uploadfile");

addProduct = async (req, res) => {
  try {
    const myFile = req.files.file;
    console.log(req);
    const { title, desc, amzURL, price } = req.body;

    if (!myFile || !title || !desc || !amzURL || !price) {
      return res.status(400).json({ msg: "all data was not provided" });
    }

    const imageUrl = await uploadImage(myFile);

    const newProduct = new amazItem({
      name: title,
      url: amzURL,
      desc: desc,
      imgUrl: imageUrl,
      price: price,
      saves: 0,
    });

    const saveProduct = await newProduct.save();

    res.status(200).json({
      message: "Product was added successfully",
      data: saveProduct,
    });
  } catch (error) {
    return res.status(500).json({ msg: `Internal Server Error: ${error}` });
  }
};

deleteProduct = async (req, res) => {
  try {
    const id = req.body.itemId;
    console.log(id);

    const deleteItem = await amazItem.deleteOne({ _id: id });

    console.log(deleteItem);

    return res
      .status(200)
      .json({ msg: `successfully deleted item with id: ${id}` });
  } catch (err) {
    return res.status(500).json({ msg: `Some error occured ${err}` });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
};
