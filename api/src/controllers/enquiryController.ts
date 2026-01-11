import { Request, Response } from 'express';
import Enquiry from '../models/Enquiry';

/**
 * @desc    Create a new enquiry
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, email, message } = req.body;

        // Basic validation
        if (!name || !phone || !message) {
            res.status(400).json({ success: false, message: 'Please provide all required fields' });
            return;
        }

        const enquiry = await Enquiry.create({
            name,
            phone,
            email,
            message,
        });

        res.status(201).json({
            success: true,
            data: enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: (error as Error).message,
        });
    }
};

/**
 * @desc    Get all enquiries
 * @route   GET /api/enquiries
 * @access  Admin (Public for now)
 */
export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: (error as Error).message,
        });
    }
};

/**
 * @desc    Update enquiry status
 * @route   PATCH /api/enquiries/:id
 * @access  Admin (Public for now)
 */
export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;

        if (!['Pending', 'Read'].includes(status)) {
            res.status(400).json({ success: false, message: 'Invalid status' });
            return;
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            res.status(404).json({ success: false, message: 'Enquiry not found' });
            return;
        }

        res.status(200).json({
            success: true,
            data: enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: (error as Error).message,
        });
    }
};
