import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Catalog } from './Catalog'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { AuthContext } from '../common/context/AuthContext'
import { CartContext } from '../common/context/CartContext'

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
        category: '3',
        title: 'title1',
        rating: 2,
        price: 1,
        images: []
    }
]

const host = 'http://localhost:3030'
const server = setupServer(
    rest.get(host + `/category/:cId`, (req, res, ctx) => {
        return res(ctx.json(mockCategories.find(c => c._id === req.params.cId)))
    }),
    rest.get(host + `/category`, (req, res, ctx) => {
        let where = parseWhere(req)

        return res(ctx.json(mockCategories.filter(c => c.parentCategory === where.parentCategory)))
    }),
    rest.get(host + `/item`, (req, res, ctx) => {
        let where = parseWhere(req)

        return res(ctx.json(mockItems.filter(i => i.category === where.category)))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads parent categories', async () => {
    renderSkeleton(mockUser)

    let parentCategories = mockCategories.filter(c => c.parentCategory == null)

    const titles = await Promise.all(parentCategories.map(c => screen.findByText(c.title)))

    expect(titles.length).toBe(parentCategories.length)
})

test('loads child categories', async () => {
    renderSkeleton(mockUser, `/${mockCategories[0].title}/${mockCategories[0]._id}`)

    let titles = await Promise.all(mockCategories[0].childCategories.map(c => screen.findByText(c.title)))

    expect(titles.length).toBe(mockCategories[0].childCategories.length)
})

test('loads items', async () => {
    renderSkeleton(mockUser, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    let titles = await Promise.all(mockItems.map(c => screen.findByText(c.title)))

    expect(titles.length).toBe(mockItems.length)
})

function renderSkeleton(user, route = '') {
    render(
        <MemoryRouter initialEntries={[`/catalog${route}`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1000 }}>
                <CartContext.Provider value={{ addToCart: () => { } }}>
                    <AuthContext.Provider value={{ user }}>
                        <Routes>
                            <Route path='catalog/:catTitle/:catId' element={<Catalog />} />
                            <Route path='catalog' element={<Catalog />} />
                        </Routes>
                    </AuthContext.Provider>
                </CartContext.Provider>
            </DimensionsContext.Provider>
        </MemoryRouter>
    )
}

function parseWhere(req) {
    return Object.fromEntries(req.url.searchParams.get('where').split('&').map(q => q.split('=').map((a, i) => i === 1 ? JSON.parse(a) : a)))
}