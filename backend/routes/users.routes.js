
import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router=Router();
import { loginUser ,registerUser,logoutUser,refreshAccessToken} from "../controllers/user.controllers.js";
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(verifyJwt,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;