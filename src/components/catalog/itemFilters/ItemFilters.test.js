import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { parseWhere } from '../testsUtil'
import { DimensionsContext } from '../../common/context/DimensionsContext'
import { CartContext } from '../../common/context/CartContext'
import { AuthContext } from '../../common/context/AuthContext'
import { Catalog } from '../Catalog'
import { host } from '../../../constants'

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockCategories = [
    {
        _id: '1',
        title: '1Cat',
        itemFields: {
            color: String
        },
        childCategories: []
    },
    {
        _id: '2',
        title: '1Cat',
        itemFields: {
            width: Number
        },
        childCategories: []
    }
]

const mockItems = [
    {
        _id: '1',
        title: '1Title',
        description: '1Description',
        price: 2,
        category: mockCategories[0]
    },
    {
        _id: '2',
        title: '2Title',
        description: '2Description',
        price: 2,
        category: mockCategories[1]
    },
    {
        _id: '3',
        title: '3Title',
        description: '3Description',
        price: 2,
        category: mockCategories[1]
    }
]

const server = setupServer(
    rest.get(host + `/category/:cId`, (req, res, ctx) => {
        return res(ctx.json(mockCategories.find(c => c._id === req.params.cId)))
    }),
    rest.get(host + `/item`, (req, res, ctx) => {
        let where = parseWhere(req)

        return res(ctx.json(mockItems.filter(i => i.category._id === where.category)))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows filters', async () => {
    let cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await screen.findByText(mockItems.find(i => i.category._id === cat._id).title)

    expect(screen.getByText('Filter')).toBeInTheDocument()
})

function renderSkeleton(user, route) {
    render(
        <MemoryRouter initialEntries={[`/catalog${route}`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1900 }}>
                <CartContext.Provider value={{ addToCart: () => { } }}>
                    <AuthContext.Provider value={{ user }}>
                        <Routes>
                            <Route path='catalog/:catTitle/:catId' element={<Catalog />} />
                        </Routes>
                    </AuthContext.Provider>
                </CartContext.Provider>
            </DimensionsContext.Provider>
        </MemoryRouter>
    )
}