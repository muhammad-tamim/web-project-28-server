import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser, getCountAll, getCountAllAdmin, getCountAllCustomer, getCountAllSeller, getRecentCustomers, getRecentSellers, getUserByEmail, getUsers, updateUser } from "./users.controllers.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)
router.get('/', getUsers)

router.get("/count", getCountAll)
router.get("/count/customer", getCountAllCustomer)
router.get("/count/seller", getCountAllSeller)
router.get("/count/admin", getCountAllAdmin)

router.get('/recent-customers', getRecentCustomers)
router.get('/recent-sellers', getRecentSellers)

router.get('/:email', getUserByEmail)

router.patch('/update/:id', updateUser)

export const usersRoutes = router