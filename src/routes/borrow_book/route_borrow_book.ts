import {Router} from "express";
import * as controller from "../../controller/controller_borrow_book";

const router = Router();
router.get("/", controller.Get_Borrow_book)
router.get("/:Borrow_ID", controller.Search_Borrow_book)
router.post("/", controller.Insert_Borrow_book)
router.put("/:Borrow_ID", controller.Edit_Borrow_book)
router.delete("/:Borrow_ID", controller.Delete_Borrow_book)

export default router;