import {Router} from "express";
import * as controller from "../../controller/controller_book";

const router = Router();
router.get("/", controller.Get_Book)
router.get("/:Book_ID", controller.Search_Book)
router.post("/", controller.Insert_Book)
router.put("/:Book_ID", controller.Edit_Book)
router.delete("/:Book_ID", controller.Delete_Book)

export default router;