const { Router } = require("express");
let router = Router();
const auth =require('../middleware/auth')
const verify = require('../middleware/verify')


router
  .post("/reg", async (req, res) => {
    auth.reg(req,res)
  })
  .post("/sign-in", async (req, res) => {
    auth.auth(req,res)
  })
  .get('/home', verify, (req,res)=>{
    res.status(200).send('Welocme!!!')
  })

module.exports = router;
