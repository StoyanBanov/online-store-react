// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from 'msw/lib/node';
import { HOST } from './constants';
import { rest } from 'msw';
import { parseWhere } from './components/catalog/testsUtil';

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockCategories = [
    {
        _id: '1',
        title: 'clickMe',
        parentCategory: null,
        childCategories: [
            {
                _id: '3',
                parentCategory: '1',
                title: 'a1cat'
            }, {
                _id: '4',
                parentCategory: '1',
                title: 'a2cat'
            }
        ]
    }, {
        _id: '2',
        title: 'b',
        parentCategory: null,
        childCategories: []
    }, {
        _id: '3',
        parentCategory: '1',
        title: 'a1cat',
        childCategories: []
    }, {
        _id: '4',
        parentCategory: '1',
        title: 'a2cat',
        childCategories: []
    }
]

const mockItems = [
    {
        _id: '1',
        category: mockCategories[2],
        title: 'title1',
        description: 'someDesc',
        rating: 2,
        price: 1,
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
        let where = parseWhere(req)

        return res(ctx.json(mockItems.filter(i => i.category._id === where.category)))
    }),
    rest.get(HOST + `/item/:iId`, (req, res, ctx) => {
        return res(ctx.json(mockItems.find(i => i._id === req.params.iId)))
    })
)