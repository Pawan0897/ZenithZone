const { default: mongoose } = require("mongoose");
const { ADDRESS } = require("../Modal/adress");

const SaveAddress = async (req, res) => {
  const userid = req.userId;
  const { name, phone, pincode, city, state, fulladdress } = req.body;
  try {
    // const seeaddress = await ADDRESS.find();
    // console.log(seeaddress,"aeeadresss");
    const checkaddress = await ADDRESS.findOne({
      userid: new mongoose.Types.ObjectId(req.userId),
      name: name,
      phone: phone,
      pincode: pincode,
      city: city,
      state: state,
      fulladdress: fulladdress,
    });
    console.log(checkaddress, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPl");

    if (!checkaddress) {
      const newaddress = new ADDRESS({
        userid: userid,
        name: name,
        phone: phone,
        pincode: pincode,
        city: city,
        state: state,
        fulladdress: fulladdress,
      });
      await newaddress.save();
      return res.status(200).send({
        statuscode: 200,
        message: "Address Saved Successfully !!!",
        data: newaddress,
      });
    } else {
      await ADDRESS.findByIdAndDelete(checkaddress._id);
      return res.status(200).send({
        statuscode: 200,
        message: "address removed !!!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      statuscode: 200,
      message: `${error}`,
    });
  }
};

/**************** Seee the Addresss  */
const FetchAddress = async (req, res) => {
  const userid = req.userId;
  const ExistAddress = await ADDRESS.find({ userid: req.userId });
  console.log(ExistAddress, "////////////////////////////////////");

  if (ExistAddress) {
    return res.send({
      statuscode: 200,
      message: "your address !!",
      data: ExistAddress,
    });
  } else {
    return res.send({
      statuscode: 400,
      message: "Not Found  !!",
    });
  }
};

/*********************** Delete the address */
const DeleteAddress = async (req, res) => {
  const { delid } = req.params;

  const data = await ADDRESS.deleteOne({ _id: delid });
  if (data) {
    return res.status(200).send({
      statuscode: 200,
      message: "Address Will be Deleted !!",
      data: data,
    });
  } else {
    return res.status(200).send({
      statuscode: 400,
      message: "Not found !!",
    });
  }
};

/************* Update ************ */
const updateAddress = async (req, res) => {
  const {id} = req.params;
  const { name, phone, pincode, city, state, fulladdress } = req.body;

  const data = await ADDRESS.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        phone: phone,
        pincode: pincode,
        city: city,
        state: state,
        fulladdress: fulladdress,
      },
    },
    { new: true }
  );
  console.log(data,"data............");
  
  if (data) {
    return res.send({
      statuscode: 200,
      message: "Address Updated Successfully !!",
      data: data,
    });
  } else {
    return res.send({
      statuscode: 200,
      message: "Something wrong !!",
    });
  }
};
module.exports = { SaveAddress, FetchAddress, DeleteAddress, updateAddress };
