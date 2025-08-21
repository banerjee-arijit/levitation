import { Router } from "express";
import Userrouter from "./user.route.js";
import Productrouter from "./product.routes.js";

const router = Router();

router.use(Userrouter);
router.use(Productrouter);

export default router;
