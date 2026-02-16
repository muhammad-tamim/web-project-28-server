import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser, getUsers } from "./users.controllers.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)
router.post('/', getUsers)

export const usersRoutes = router