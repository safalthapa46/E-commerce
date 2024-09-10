const { CreateUser, GetAllUser, updateUser, login, getUserById, deleteUSer, confirmUser, forgotPassword, resetPassword, resendConfirmation, deleteUser, getAllUser, logIn } = require("../Controller/userController")
const express = require("express");
const { jwtMiddleware } = require("../middleware/Middleware");


const router = express.Router();

router.post('/register', CreateUser);
router.get('/users', jwtMiddleware, getAllUser);
router.put('/update/:id', jwtMiddleware, updateUser);
router.post('/login', logIn);
router.get('/getUser/:id', jwtMiddleware, getUserById);
router.get('/deleteUser/:id', jwtMiddleware, deleteUser);
router.get('/confirm-Email/:token', confirmUser);
router.post('/forgot-password/', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/resend-email/', resendConfirmation);

module.exports = router;