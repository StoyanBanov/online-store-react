// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from 'msw/lib/node';
import { HOST } from './constants';
import { rest } from 'msw';
import { parseWhere } from './components/catalog/testsUtil';

export const mockUser = {
    _id: 1,
    roles: ['user']
}

export const mockCategories = [
    {
        _id: '0',
        title: 'clickMe',
        parentCategory: null,
        childCategories: ['1', '2']
    }, {
        _id: '1',
        title: 'b',
        parentCategory: '0',
        childCategories: [],
        itemFields: {
            fieldCat1: 'String'
        },
    }, {
        _id: '2',
        parentCategory: '0',
        title: 'a1cat',
        childCategories: [],
        itemFields: {
            fieldCat2: 'Number'
        }
    }, {
        _id: '3',
        parentCategory: null,
        title: 'a3cat',
        childCategories: [],
        itemFields: {
            fieldCat3: 'Number'
        }
    }
]
mockCategories[0].childCategories = [mockCategories[1], mockCategories[2]]

const mockRatings = [
    {
        rating: 2,
        user: 1,
        item: '1'
    }
]

export const mockItems = [
    {
        _id: '1',
        category: mockCategories[2],
        fieldCat2: 21,
        title: 'title1',
        description: 'someDesc',
        count: 3,
        rating: 2,
        price: 1,
        images: []
    },
    {
        _id: '2',
        title: '2Title',
        description: '1Description',
        count: 12,
        rating: 5,
        price: 1,
        category: mockCategories[1],
        fieldCat1: 'fieldCat1Type1',
        images: []
    },
    {
        _id: '3',
        title: '3Title',
        description: '3Description',
        count: 1,
        rating: 1,
        price: 3,
        category: mockCategories[1],
        fieldCat1: 'fieldCat1Type2',
        images: []
    },
    {
        _id: '4',
        title: '4Title',
        description: '3Description',
        count: 100,
        rating: 3,
        price: 2,
        category: mockCategories[2],
        fieldCat2: 3,
        images: []
    }
]

const server = setupServer(
    rest.get(HOST + `/category/:cId`, (req, res, ctx) => {
        return res(ctx.json(mockCategories.find(c => c._id === req.params.cId)))
    }),
    rest.get(HOST + `/category`, (req, res, ctx) => {
        let where = parseWhere(req)

        return res(ctx.json(mockCategories.filter(c => c.parentCategory === where.parentCategory)))
    }),
    rest.get(HOST + `/item`, (req, res, ctx) => {
        let itemsToReturn = [...mockItems]

        const search = req.url.searchParams.get('search')

        if (search) {
            itemsToReturn = itemsToReturn.filter(i => i.title.includes(search) || i.description.includes(search))
        }

        const where = parseWhere(req)

        for (const [k, v] of Object.entries(where)) {
            if (k === 'category')
                itemsToReturn = itemsToReturn.filter(i => i.category._id === v)
            else
                itemsToReturn = itemsToReturn.filter(i => Array.isArray(v) ? v.includes(i[k]) : v === i[k])
        }

        const minPrice = Number(req.url.searchParams.get('minPrice'))
        const maxPrice = Number(req.url.searchParams.get('maxPrice'))
        if (minPrice || maxPrice) {
            itemsToReturn = itemsToReturn.filter(i => i.price >= (minPrice || 0) && i.price <= (maxPrice || Number.MAX_SAFE_INTEGER))
        }

        return res(ctx.json(itemsToReturn))
    }),
    rest.get(HOST + `/item/rating`, (req, res, ctx) => {
        let where = parseWhere(req)

        return res(ctx.json(mockRatings.filter(r => r.user === where.user && r.item === where.item)))
    }),
    rest.get(HOST + `/item/:iId`, (req, res, ctx) => {
        return res(ctx.json(mockItems.find(i => i._id === req.params.iId)))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())