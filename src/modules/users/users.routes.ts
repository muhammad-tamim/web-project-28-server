import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser, getUserByEmail, getUsers, updateUser } from "./users.controllers.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)
router.post('/', getUsers)

router.get('/:email', getUserByEmail)

router.patch('/:id', updateUser)

export const usersRoutes = router