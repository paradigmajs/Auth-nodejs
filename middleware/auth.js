const Auth = require("../model/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registration  = async(req, res)=>{
    try {
        const { name, email, pass } = req.body;
        if (!(email && pass && name)) {
          res.status(400).send("Enter all input");
        }
        password = await bcrypt.hash(pass, 10);
        user = await Auth.create({
          name,
          email,
          hash_pass: password,
        });
        const token = jwt.sign(
          {
            _id: user._id,
            email,
          },
          "Rest"
        );
        user.token = token;
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

const authorization = async(req,res)=>{
    try {
        const { email, pass } = req.body;
        if (!(email && pass)) {
          res.status(400).send("Enter all input");
        }
        const user = await Auth.findOne({ email });
        if (user && (await bcrypt.compare(pass, user.hash_pass))) {
          const token = jwt.sign(
            {
              _id: user._id,
              email,
            },
            "Rest"
          );
          user.token = token;
          res.status(200).send(user);
        }else{
          res.status(400).send("Invalid credentials");
        }
      } catch (err) {
        console.log(err);
      }
}


module.exports={
    reg:registration,
    auth:authorization
}