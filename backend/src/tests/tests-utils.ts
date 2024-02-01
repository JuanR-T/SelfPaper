const mPublicationCreate = jest.fn();
const mPublicationFindOne = jest.fn();
const mPublicationFindById = jest.fn();
const mPublicationFind = jest.fn();
const mPublicationFindByIdAndUpdate = jest.fn();
jest.mock('../models/Publication', () => ({
    create: mPublicationCreate,
    findOne: mPublicationFindOne,
    findById: mPublicationFindById,
    find: mPublicationFind,
    findByIdAndUpdate: mPublicationFindByIdAndUpdate,
}));

const mPublisherCreate = jest.fn();
const mPublisherFindOne = jest.fn();
const mPublisherFindById = jest.fn();
const mPublisherFind = jest.fn();
const mPublisherUpdateOne = jest.fn();
jest.mock('../models/Publisher', () => ({
    create: mPublisherCreate,
    findOne: mPublisherFindOne,
    findById: mPublisherFindById,
    find: mPublisherFind,
    updateOne: mPublisherUpdateOne,
}));

const mThemeCreate = jest.fn();
const mThemeFindOne = jest.fn();
const mThemeFindById = jest.fn();
const mThemeFind = jest.fn();
const mThemeUpdateOne = jest.fn();
jest.mock('../models/Theme', () => ({
    create: mThemeCreate,
    findOne: mThemeFindOne,
    findById: mThemeFindById,
    find: mThemeFind,
    updateOne: mThemeUpdateOne,
}));

const mAuthorCreate = jest.fn();
const mAuthorFindOne = jest.fn();
const mAuthorFindById = jest.fn();
const mAuthorFind = jest.fn();
const mAuthorUpdateOne = jest.fn();
jest.mock('../models/Author', () => ({
    create: mAuthorCreate,
    findOne: mAuthorFindOne,
    findById: mAuthorFindById,
    find: mAuthorFind,
    updateOne: mAuthorUpdateOne,
}));

export {
    mPublicationCreate,
    mPublicationFindOne,
    mPublicationFindById,
    mPublicationFind,
    mPublicationFindByIdAndUpdate,
    mPublisherCreate,
    mPublisherFindOne,
    mPublisherFindById,
    mPublisherFind,
    mPublisherUpdateOne,
    mThemeCreate,
    mThemeFindOne,
    mThemeFindById,
    mThemeFind,
    mThemeUpdateOne,
    mAuthorCreate,
    mAuthorFindOne,
    mAuthorFindById,
    mAuthorFind,
    mAuthorUpdateOne,
};
