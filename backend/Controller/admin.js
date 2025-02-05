// import { REASON } from "../Modal/reason";
const { REASON } = require("../Modal/reason");
const jwt = require("jsonwebtoken")
const { ADMIN } = require("../Modal/admin");
const bcrypt = require("bcryptjs");
const { USER } = require("../Modal/user");
/**************** Add Admin */
const addadmin = async (req, res) => {
  const emailcheck = await USER.findOne({ role: "admin" });
  if (emailcheck) {
    return res.send({
      statuscode: 400,
      message: "The Admin is already Exist",
    });
  } else {
    
    const admin = new USER({
      username:"Pawan Kumar",
      email:"pawan@gmail.com",
      password: "123",
      role:"admin",
      isValid: true
      
    });
    const haspassword = bcrypt.hashSync(admin.password, 10);
    console.log(admin.password,"ppppppppppppppppppppppppppppppppppppp");
    admin.password = haspassword;

    const data = await USER.create(admin);
    return res.send({
      status: 200,
      message: "admin is addedd !!!!",
      data: data,
    });
  }
};
/***************** Reason */
const addreason = async (req, res) => {
  const { reason,createdBy } = req.body;
  const reasondata = new REASON({
    reason,
    createdBy
  });
  const data = await reasondata.save();
  if(data){
    return res.send({
      statuscode: 200,
      message: "reason is Addedd !!!",
      data: data,
    });
  }
  else{
    return res.send({
      statuscode: 400,
      message: "Something is wrong !!!",
      data: data,
    });
  }
};

/*********************** admin LOGIN */

const login = async (req, res) => {
  const { email , password} = req.body;
 
  /********** email verify  */
  const data = await USER.findOne({role:"admin" });
  /********** password verify  */
  
  if (email != data?.email) {
    return res.send({
      statuscode: 400,
      message: "Email is not exist !!!",
    });
  } else if (!bcrypt.compareSync(password, data?.password)) {
    return res.send({
      statuscode: 400,
      message: "Wrong password !!!",
    });
  } else {
    const token =  jwt.sign({userId:data?.id},"admintoken");
    await USER.updateOne({_id:data?.id} , {$set:{token:token}})
    return res.send({
      statuscode: 200,  
      message: "Successfully Login !!!",
      data: token
     
    });
  }
};

/********************* View All user */
const ViewUser = async(req,res) => {
  const data = await USER.find({role:"user"});
  return res.send({
    statuscode:200,
    message:"Fetched All User !!",
    data:data
  })
}


/********************** View User Details */
const ViewUserDetail = async(req,res) => {
const {id} = req.params;
const data =await USER.findById({_id:id});
return res.send({
  statuscode:200,
  message:"successfully !!!",
  data:data
})
}

module.exports = { addreason, addadmin, login ,ViewUser,ViewUserDetail};
