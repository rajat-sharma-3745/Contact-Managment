import express from "express";
import { createContact, deleteContact, getContactById, getContacts } from "../controllers/contact.controller.js";

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(getContacts);

router.route('/:id')
  .get(getContactById)
  .delete(deleteContact);

export default router;
