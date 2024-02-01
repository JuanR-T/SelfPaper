// publisherUtils.ts

import { Request } from 'express';
import Publisher from '../models/Publisher';

interface PublisherRequestBody {
    _id: string;
    service: any;
}

export const checkPublisherService = async (req: Request): Promise<boolean> => {
    try {
        const publishers = await Publisher.find({});

        if (!publishers) {
            throw new Error(
                'Publisher not found. Cannot create publication. Try to create a publisher first',
            );
        }

        const requestPublishers =
            (req.body.publisher as PublisherRequestBody[]) || [];

        const hasSameService = publishers.some((publisher) => {
            return requestPublishers.some(
                (requestPublisher) =>
                    publisher._id.equals(requestPublisher._id) &&
                    publisher.services.some(
                        (service) =>
                            service.toLowerCase() ===
                            requestPublisher.service.toLowerCase(),
                    ),
            );
        });

        return hasSameService;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};
