import {Router} from "express";
import * as controller from "../../controller/controller_borrow_detail";

const router = Router();
router.get("/", controller.Get_Borrow_detail)
router.get("/:Borrow_ID", controller.Search_Borrow_detail)
router.post("/", controller.Insert_Borrow_detail)

export default router;