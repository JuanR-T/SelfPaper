import { Request } from 'express';
import mongoose from 'mongoose';
import Publisher from '../models/Publisher';

interface PublisherRequestBody {
    _id: string;
    service: string;
}

export const checkPublisherService = async (req: Request): Promise<boolean> => {
    try {
        const publishers = await Publisher.find({});

        if (!publishers || publishers.length === 0) {
            throw new Error(
                'Publisher not found. Cannot create publication. Try to create a publisher first',
            );
        }

        let requestPublishers: PublisherRequestBody;
        if (typeof req.body.publisher === 'string' || typeof req.body.bookPublisher === 'string') {
            requestPublishers = JSON.parse(req.body.publisher || req.body.bookPublisher);
        } else {
            requestPublishers = req.body.publisher || req.body.bookPublisher;
        }
        if (!requestPublishers) {
            console.error('Publisher data missing in request body');
            return false;
        }
        const hasSameService = publishers.some((publisher) => {
            const requestPublisherId = new mongoose.Types.ObjectId(requestPublishers._id);
            return (
                publisher._id.equals(requestPublisherId) &&
                publisher.services.some(
                    (service) =>
                        service.toLowerCase() ===
                        requestPublishers.service.toLowerCase(),
                )
            );
        });

        return hasSameService;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
