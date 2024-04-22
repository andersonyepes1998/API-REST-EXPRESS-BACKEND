import { Router } from "express";
import { getLinks, getLinkId, createLinks, removeLinkId } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

// GET              /Links          all links
// GET              /Links/:id      single link
// POST             /Links          create link
// PATCH/PUT        /Links/:id      update link
// DELETE           /Links/:id      remove link
 
router.get('/', requireToken, getLinks)
router.get('/:id', requireToken, getLinkId)
router.post('/', requireToken, bodyLinkValidator, createLinks)
router.delete('/:id', requireToken, paramLinkValidator, removeLinkId)


export default router;