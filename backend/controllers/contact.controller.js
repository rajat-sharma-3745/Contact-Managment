import Contact from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";

export const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, email, and phone number'
        });
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        message: message || ''
    });

    res.status(201).json({
        success: true,
        message: 'Contact created successfully',
        contact
    });

});

export const getContacts = asyncHandler(async (req, res) => {
    const { sort = '-createdAt', limit = 100 } = req.query;

    const contacts = await Contact.find()
        .sort(sort)
        .limit(parseInt(limit));

    res.status(200).json({
        success: true,
        count: contacts.length,
        contacts
    });
});

export const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params?.id);

    if (!contact) {
        return res.status(404).json({
            success: false,
            message: 'Contact not found'
        });
    }

    res.status(200).json({
        success: true,
        contact
    });
})

export const deleteContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        return next(new ApiError('Contact not found', 404));
    }

    res.json({success: true, message: "Contact deleted successfully" });
});
