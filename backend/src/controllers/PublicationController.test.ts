const mCheckPublisherService = jest.fn();
jest.mock('../utils/publisherHasSameService', () => ({
    checkPublisherService: mCheckPublisherService,
}));

import { Request, Response } from 'express';
import {
    mPublicationCreate,
    mPublicationFind,
    mPublicationFindByIdAndUpdate,
} from '../tests/tests-utils';
import { checkPublisherService } from '../utils/publisherHasSameService';
import {
    createPublication,
    getPublication,
    updatePublication,
} from './PublicationController';

describe('createPublication', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should create a new publication if publisher service is valid', async () => {
        (
            checkPublisherService as jest.MockedFunction<
                typeof checkPublisherService
            >
        ).mockResolvedValue(true);

        const req = {
            body: {
                title: 'Parentalité dans la vie',
                description: 'Un article',
                type: ['article', 'podcast'],
                excerpt: 'Voici un article',
                publication_date: '2024-01-29T08:30:00.000Z',
                publisher: [
                    { _id: '5fa7c647d62f021552d173cd', service: 'service1' },
                ],
            },
        } as unknown as Request;

        const mJson = jest.fn();
        const mStatus = jest.fn(() => ({ json: mJson }));
        const res = { status: mStatus } as unknown as Response;
        const newPublication = {
            _id: 'newId',
        };
        mPublicationCreate.mockResolvedValueOnce(newPublication);
        await createPublication(req, res);

        expect(mPublicationCreate).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledWith(200);
        expect(mJson).toHaveBeenCalledTimes(1);
        expect(mJson).toHaveBeenCalledWith({
            data: { created: true, newPublication },
        });
    });

    it('should return an error if publisher service is false', async () => {
        (
            checkPublisherService as jest.MockedFunction<
                typeof checkPublisherService
            >
        ).mockResolvedValue(false);

        const req = {
            body: {
                title: 'Parentalité dans la vie',
                description: 'un article 2',
                type: ['article', 'podcast'],
                excerpt: 'Voici un article',
                publication_date: '2024-01-29T08:30:00.000Z',
                publisher: [
                    { _id: '5fa7c647d62f021552d173cd', service: 'service1' },
                ],
            },
        } as unknown as Request;

        const mJson = jest.fn();
        const mStatus = jest.fn(() => ({ json: mJson }));
        const res = { status: mStatus } as unknown as Response;
        const newPublication = {
            _id: 'newId',
        };
        mPublicationCreate.mockResolvedValueOnce(newPublication);
        await createPublication(req, res);

        expect(mPublicationCreate).toHaveBeenCalledTimes(0);
        expect(mStatus).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledWith(500);
        expect(mJson).toHaveBeenCalledTimes(1);
        expect(mJson).toHaveBeenCalledWith({
            error: 'Publisher service from request does not match existing publisher service',
        });
    });
});

describe('getPublication', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should get all publications', async () => {
        const req = { query: {} } as unknown as Request;
        const mJson = jest.fn();
        const mStatus = jest.fn(() => ({ json: mJson }));
        const res = { status: mStatus } as unknown as Response;
        const publication = {
            title: 'Parentalité dans la kvienre',
            description: 'Cet article de la vie de mon mec',
            type: ['article', 'podcast'],
            theme: [],
            excerpt: 'Voici un article',
            publication_date: '2024-01-29T08:30:00.000Z',
            publisher: [
                {
                    _id: '65ba6c0c0a9f1ffc953293de',
                    service: 'Sport',
                },
            ],
            author: [],
            _id: '65baeff',
        };
        mPublicationFind.mockResolvedValueOnce(publication);

        await getPublication(req, res);

        expect(mPublicationFind).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledWith(200);
        expect(mJson).toHaveBeenCalledTimes(1);
        expect(mJson).toHaveBeenCalledWith({
            data: { found: true, publication },
        });
    });

    it('should return an error if there is no publications', async () => {
        const req = { query: {} } as unknown as Request;
        const mJson = jest.fn();
        const mStatus = jest.fn(() => ({ json: mJson }));
        const res = { status: mStatus } as unknown as Response;

        await getPublication(req, res);

        expect(mStatus).toHaveBeenCalledTimes(1);
        expect(mStatus).toHaveBeenCalledWith(500);
        expect(mJson).toHaveBeenCalledTimes(1);
        expect(mJson).toHaveBeenCalledWith({
            error: "Couldn't find any publications",
        });
    });
});

describe('updatePublication', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should update a given publication', async () => {
        const req = {
            params: { id: 'test123' },
            body: { publisher: [{ _id: '8712', service: 'Société' }] },
        } as unknown as Request;
        mCheckPublisherService.mockResolvedValue(true);
        const mJson = jest.fn();
        const mStatus = jest.fn(() => ({ json: mJson }));
        const res = { status: mStatus } as unknown as Response;
        const updatedPublication = {
            id: 'test123',
            publisher: [{ _id: '8712', service: 'Société' }],
        };
        mPublicationFindByIdAndUpdate.mockResolvedValue(updatedPublication);

        await updatePublication(req, res);

        expect(mPublicationFindByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(mPublicationFindByIdAndUpdate).toHaveBeenCalledWith('test123', {
            publisher: [{ _id: '8712', service: 'Société' }],
        });
        expect(mStatus).toHaveBeenCalledWith(200);
        expect(mJson).toHaveBeenCalledTimes(1);
        expect(mJson).toHaveBeenCalledWith({
            data: { updated: true, updatedPublication },
        });
    });
});
