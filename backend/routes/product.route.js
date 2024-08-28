const {Router} = require('express')
const { createProduct, getProductDetails, getAllProducts} = require('../controllers/product.controller')
const {verifyJWT} = require('../middlewares/auth.middleware')
const {upload} = require('../middlewares/multer.middleware')

const router = Router()

router.route("/create").post(upload.array('images', 5), createProduct)
router.route("/:productId").get(getProductDetails)
router.route("/").get(getAllProducts)


module.exports = router