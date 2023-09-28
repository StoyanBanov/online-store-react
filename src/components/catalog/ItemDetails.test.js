import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemDetails } from './ItemDetails'
import { AuthContext } from '../common/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { CartContext } from '../common/context/CartContext'

const mockItem = {
    _id: 1,
    category: 1,
    title: 'title1',
    rating: 2,
    price: 1,
    images: []
}

const mockCategory = {
    _id: 1,
    title: 'cat1'
}

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockRating = {
    rating: 2,
    user: 1,
    item: 1
}

const host = 'http://localhost:3030'
const server = setupServer(
    rest.get(host + `/item/rating?where=${encodeURIComponent(`item="${mockItem._id}"&_creator="${mockUser._id}"`)}`, (req, res, ctx) => {
        return res(ctx.json([mockRating]))
    }),
    rest.get(host + '/item/:id', (req, res, ctx) => {
        return res(ctx.json(mockItem))
    }),
    rest.get(host + '/category/:id', (req, res, ctx) => {
        return res(ctx.json(mockCategory))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads item info for guest', async () => {
    render(
        <AuthContext.Provider value={{ user: {} }}>
            <CartContext.Provider value={{ addToCart: () => { } }}>
                <BrowserRouter>
                    <ItemDetails />
                </BrowserRouter>
            </CartContext.Provider>
        </AuthContext.Provider>
    )

    const title = await screen.findByText(mockItem.title)

    expect(title).toBeInTheDocument()
})

test('loads item info for user', async () => {
    render(
        <AuthContext.Provider value={{ user: { _id: 1, roles: ['user'] } }}>
            <CartContext.Provider value={{ addToCart: () => { } }}>
                <BrowserRouter>
                    <ItemDetails />
                </BrowserRouter>
            </CartContext.Provider>
        </AuthContext.Provider>
    )

    const ratingStars = await screen.findAllByText('★')

    expect(ratingStars.length).toBe(mockItem.rating)
})

test('loads item info for admin', async () => {
    render(
        <AuthContext.Provider value={{ user: { _id: 2, roles: ['admin'] } }}>
            <CartContext.Provider value={{ addToCart: () => { } }}>
                <BrowserRouter>
                    <ItemDetails />
                </BrowserRouter>
            </CartContext.Provider>
        </AuthContext.Provider>
    )

    let result = true
    try {
        await screen.findAllByText('★')
    } catch (error) {
        result = false
    }

    expect(result).toBeFalsy()
})