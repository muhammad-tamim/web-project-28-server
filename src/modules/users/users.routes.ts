import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createUserSchema } from "./users.validations.js";
import { createUser } from "./users.controllers.js";

const router = Router()

router.post('/', validate(createUserSchema), createUser)

export const usersRoutes = router