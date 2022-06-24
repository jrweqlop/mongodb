import {Router} from "express";
import * as controller from "../../controller/controller_librarian";

const router = Router();
router.get("/",controller.Get_Librarian)
router.get("/:librarian_ID",controller.Search_Librarian)
router.post("/",controller.Insert_Librarian)
router.put("/:librarian_ID",controller.Edit_Librarian)
router.delete("/:librarian_ID",controller.Delete_Librarian)

export default router;