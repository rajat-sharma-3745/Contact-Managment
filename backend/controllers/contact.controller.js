import Contact from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";

export const createContact = asyncHandler(async (req, res) => {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  
});

export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);  
});

export const deleteContact = asyncHandler(async (req, res,next) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return next(new ApiError('Contact not found',404));
    }

    res.json({ message: "Contact deleted successfully" });
});
