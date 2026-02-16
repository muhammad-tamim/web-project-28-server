import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser, getUserByEmail, getUsers } from "./users.controllers.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)
router.post('/', getUsers)

router.get('/:email', getUserByEmail)

export const usersRoutes = router