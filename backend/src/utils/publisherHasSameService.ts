// publisherUtils.ts

import { Request } from 'express';
import Publisher from '../models/Publisher';

interface PublisherRequestBody {
    _id: string;
    service: string;
}

export const checkPublisherService = async (req: Request): Promise<boolean> => {
    try {
        const publishers = await Publisher.find({});

        if (!publishers) {
            throw new Error(
                'Publisher not found. Cannot create publication. Try to create a publisher first',
            );
        }

        const requestPublishers: PublisherRequestBody =
            req.body.publisher || [];
        const hasSameService = publishers.some((publisher) => {
            return (
                publisher._id.equals(requestPublishers._id) &&
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
