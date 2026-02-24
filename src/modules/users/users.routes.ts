import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser, getCountAll, getCountAllAdmin, getCountAllCustomer, getCountAllSeller, getRecentCustomers, getRecentSellers, getUserByEmail, getUsers, updateUser } from "./users.controllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)
router.get('/', verifyToken, getUsers)

router.get("/count", verifyToken, getCountAll)
router.get("/count/customer", verifyToken, getCountAllCustomer)
router.get("/count/seller", verifyToken, getCountAllSeller)
router.get("/count/admin", verifyToken, getCountAllAdmin)

router.get('/recent-customers', verifyToken, getRecentCustomers)
router.get('/recent-sellers', verifyToken, getRecentSellers)

router.get('/:email', verifyToken, getUserByEmail)

router.patch('/update/:id', verifyToken, updateUser)

export const usersRoutes = router