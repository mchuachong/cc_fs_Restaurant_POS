import express from 'express'
import {getAllProducts,createProduct,getOneProduct,editProduct,deleteProduct} from '../controllers/productController.js'
import { login,addUser } from '../controllers/userController.js';
import { Authenticator } from '../middleware/authjws.js';
import {getAllTables,addTable,deleteTable,addOrderToken,clearTable} from '../controllers/tablesController.js'
import { getOrder,createOrder,editOrder,deleteOrder,getAllOrders } from '../controllers/ordersController.js';

const router = express.Router();

router.get("/products",Authenticator,getAllProducts)
router.post("/products",Authenticator,createProduct)
router.get("/products/:id",getOneProduct)
router.put("/products/:id",Authenticator,editProduct)
router.delete("/products/:id",Authenticator,deleteProduct)

router.post("/auth/login",login)
router.post("/auth/signup",addUser)

router.get("/tables",Authenticator,getAllTables)
router.post("/tables",Authenticator,addTable)
router.put("/tables",Authenticator,addOrderToken)
router.delete("/tables/:id",Authenticator,deleteTable)
router.put("/tables/:id",Authenticator,clearTable)

router.get("/orders",Authenticator,getAllOrders)

router.get("/order/:id",Authenticator,getOrder)
router.post("/order/",Authenticator,createOrder)
router.put("/order/:id",Authenticator,editOrder)
router.delete("/order/:id",Authenticator,deleteOrder)

export default router