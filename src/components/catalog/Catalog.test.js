import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Catalog } from './Catalog'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { AuthContext } from '../common/context/AuthContext'
import { CartContext } from '../common/context/CartContext'
import { ItemDetails } from './ItemDetails'

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

        return res(ctx.json(mockItems.filter(i => i.category._id === where.category)))
    }),
    rest.get(host + `/item/:iId`, (req, res, ctx) => {
        return res(ctx.json(mockItems.find(i => i._id === req.params.iId)))
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

test('loads child categories from catalog', async () => {
    renderSkeleton(mockUser)

    const parentTitle = await screen.findByText(mockCategories[0].title)

    fireEvent.click(parentTitle)

    let childrenTitles = await Promise.all(mockCategories[0].childCategories.map(c => screen.findByText(c.title)))

    expect(childrenTitles.length).toBe(mockCategories[0].childCategories.length)
})

test('loads items', async () => {
    renderSkeleton(mockUser, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    let titles = await Promise.all(mockItems.filter(i => i.category === mockCategories[2]).map(i => screen.findByText(i.title)))

    expect(titles.length).toBe(mockItems.length)
})

test('loads items from catalog', async () => {
    renderSkeleton(mockUser, `/${mockCategories[0].title}/${mockCategories[0]._id}`)

    let categoryWithItemsTitle = await screen.findByText(mockCategories[0].childCategories[0].title)

    fireEvent.click(categoryWithItemsTitle)

    let itemsTitles = await Promise.all(mockItems.filter(i => i.category === mockCategories[2]).map(i => screen.findByText(i.title)))

    expect(itemsTitles.length).toBe(mockItems.length)
})

test('loads item details', async () => {
    const item = mockItems[0]

    renderSkeleton({}, `/${item._id}`)

    let description = await screen.findByText(item.description)

    expect(description).toBeInTheDocument()
})

test('loads item details from catalog', async () => {
    const item = mockItems[0]

    renderSkeleton({}, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    let title = await screen.findByText(mockItems[0].title)

    fireEvent.click(title)

    let description = await screen.findByText(item.description)

    expect(description).toBeInTheDocument()
})

test('shows filters for items catalog', async () => {
    renderSkeleton({}, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    let filtersTitle = await screen.findByText('Filter')

    expect(filtersTitle).toBeInTheDocument()
})

function renderSkeleton(user, route = '') {
    render(
        <MemoryRouter initialEntries={[`/catalog${route}`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1900 }}>
                <CartContext.Provider value={{ addToCart: () => { } }}>
                    <AuthContext.Provider value={{ user }}>
                        <Routes>
                            <Route path='catalog/:catTitle/:catId' element={<Catalog />} />
                            <Route path='catalog/:catTitle/:catId/:itemId' element={<ItemDetails />} />
                            <Route path='catalog/:itemId' element={<ItemDetails />} />
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