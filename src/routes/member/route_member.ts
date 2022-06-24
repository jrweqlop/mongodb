import {Router} from "express";
import * as controller from "../../controller/controller_member";

const router = Router();
router.get("/",controller.Get_Member)
router.get("/:Member_ID",controller.Search_Member)
router.post("/",controller.Insert_Member)
router.put("/:Member_ID",controller.Edit_Member)
router.delete("/:Member_ID",controller.Delete_Member)

export default router;