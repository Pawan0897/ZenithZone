const { BRAND } = require("../Modal/Brand");

const AddBrand = async (req, res) => {
  const { name } = req.body;
  const createdBy = req.userId;

  const exists = await BRAND.findOne({ name: name, createdBy: createdBy });
  if (exists) {
    return res.status(400).send({
      Message: "this brand is already exist",
      statuscode: 400,
    });
  } else {
    const data = new BRAND({
      name: name,
      createdBy: createdBy,
    });
    const saveData = await data.save();
    return res.status(200).send({
      statuscode: 200,
      message: "Brand is addedd successfully !!!",
      data: saveData,
    });
  }
};

const GetBrand = async (req, res) => {
  const createdBy = req.userId;

  const data = await BRAND.find({createdBy:createdBy});
  
  if (data) {
    return res.status(200).send({
      statuscode: 200,
      message: "Your Brands !!!",
      data: data,
    });
  } else {
    return res.status(400).send({
      statuscode: 400,
      message: "Not Found !!!",
    });
  }
};

module.exports = { AddBrand , GetBrand};
