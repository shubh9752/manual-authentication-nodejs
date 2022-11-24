const express=require("express");
const router=express.Router();

const UserController = require("../controllers/User_contr");

router.get("/profile",UserController.profile);
router.get("/sign-up",UserController.signUp);
router.get("/sign-in",UserController.signIn);
router.post("/userCreated",UserController.userCreated);
router.post("/userSignedIn",UserController.userSignedIN);
module.exports=router;