const amazItem = require("../models/amazonItem");
const User = require("../models/user");

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

    //check if the item has already been added before adding

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

saveProductToUser = async (req, res) => {
  try {
    const id = req.body.itemId;

    const userId = req.body.userId;

    const userFound = await User.findById(userId);

    const amzItem = await amazItem.findById(id);

    console.log("SAVES: ", amzItem.saves, " SAVED IDS: ", userFound.idsSaved);

    // guard statement
    if (!userFound) {
      return res
        .status(500)
        .json({ msg: `Some error occurred while saving a product:` });
    }

    if (!amzItem) {
      return res
        .status(500)
        .json({ msg: `Some error occurred while looking for item ` });
    }

    // console.log(userFound);
    // console.log(amzItem);

    console.log(Array.isArray(userFound.idsSaved));
    var amzIds = userFound.idsSaved;
    var foundBool = false;

    if (amzIds == null || amzIds.length == 0) {
      amzIds.push(id);
      amzItem.saves += 1;
      // userFound.idsSaved = amzIds;
    } else {
      for (var i = 0; i < amzIds.length; i++) {
        if (amzIds[i] == amzItem._id) {
          amzIds.splice(i, 1);
          amzItem.saves--;
          foundBool = true;
          break;
        }
      }

      if (!foundBool) {
        //add the item
        amzIds.push(id);
        amzItem.saves++;
        // userFound.idsSaved = amzIds;
      }
    }

    userFound.idsSaved = amzIds;

    console.log(userFound.idsSaved);

    userFound
      .save()
      .then()
      .catch((err) => {
        console.log(err);
      });

    amzItem
      .save()
      .then()
      .catch((err) => {
        console.log(err);
      });

    return res
      .status(200)
      .json({ msg: `Saved the ids ${amzIds}`, found: foundBool });

    //check if the userid is already here in that case delete it
    // amzIds.map(amzId => {

    // })

    // check if this user has already saved the id
    // User.findById(userId, async (e, user) => {
    //   console.log(user);
    // });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: `Some error occurred while saving a product: ${err}` });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  saveProductToUser,
};
