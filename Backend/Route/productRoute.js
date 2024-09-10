const express = require("express");
const { addProduct, getAllProduct, deleteProduct, updateProduct, relatedProduct, findProduct } = require("../Controller/productController");
const upload = require("../utils/upload");
// const { jwtMiddleware } = require("../middleware/Middleware");
const router = express.Router();

router.post('/addProduct', upload.single("productImage"), addProduct);
router.get('/getproduct', getAllProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', upload.single('productImage'), updateProduct);
router.get('/relatedProduct/:id', relatedProduct);
router.get('/findProduct/:id', findProduct);




module.exports = router;
