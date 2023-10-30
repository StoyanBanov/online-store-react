import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemDetails } from './ItemDetails'
import { AuthContext } from '../common/context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { CartContext } from '../common/context/CartContext'
import { host } from '../../constants'

const mockItem = {
    _id: 1,
    category: 1,
    title: 'title1',
    description: 'description1',
    rating: 2,
    price: 1,
    count: 5,
    thumbnail: '',
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

const mockAdmin = {
    _id: 2,
    roles: ['admin']
}

const mockRating = {
    rating: 2,
    user: 1,
    item: 1
}

const server = setupServer(
    rest.get(host + `/item/rating`, (req, res, ctx) => {
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

test('loads details for guest', async () => {
    renderSkeleton({})

    await screen.findByText(mockItem.title)
})

test('loads details for user', async () => {
    renderSkeleton(mockUser)

    await screen.findByText(mockItem.title)
})

test('loads details for admin', async () => {
    renderSkeleton(mockAdmin)

    await screen.findByText(mockItem.title)
})

test('loads item info', async () => {
    renderSkeleton(mockAdmin)

    await screen.findByText(mockItem.title)
    await screen.findByText(mockItem.description)
    await screen.findByText('Price: ' + mockItem.price.toFixed(2) + '$')
})

test('shows item count message', async () => {
    renderSkeleton(mockAdmin)

    await screen.findByText(t => t === (mockItem.count ? 'In stock' : 'Sold out'))
})

test('loads item info for user', async () => {
    renderSkeleton(mockUser)

    const ratingStars = await screen.findAllByText('★')

    expect(ratingStars.length).toBe(mockItem.rating)
})

test('doesn\'t show rating for admin', async () => {
    renderSkeleton(mockAdmin)

    await screen.findByText(mockItem.title)

    expect(screen.queryByText(t => t.includes('Rate:'))).not.toBeInTheDocument()
})

test('shows edit/delete buttons for admin', async () => {
    renderSkeleton(mockAdmin)

    await screen.findByText('Edit')
    await screen.findByText('Delete')
})

test('does\'t show edit/delete buttons for user', async () => {
    renderSkeleton(mockUser)

    await screen.findByText(mockItem.title)

    expect(screen.queryByText(t => t.includes('Edit'))).not.toBeInTheDocument()
    expect(screen.queryByText(t => t.includes('Delete'))).not.toBeInTheDocument()
})

test('does\'t show edit/delete buttons for guest', async () => {
    renderSkeleton({})

    await screen.findByText(mockItem.title)

    expect(screen.queryByText(t => t.includes('Edit'))).not.toBeInTheDocument()
    expect(screen.queryByText(t => t.includes('Delete'))).not.toBeInTheDocument()
})


function renderSkeleton(user) {
    render(
        <AuthContext.Provider value={{ user }}>
            <CartContext.Provider value={{ addToCart: () => { } }}>
                <BrowserRouter>
                    <ItemDetails />
                </BrowserRouter>
            </CartContext.Provider>
        </AuthContext.Provider>
    )
}
