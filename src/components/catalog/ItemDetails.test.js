import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemDetails } from './ItemDetails'
import { AuthContext } from '../common/context/AuthContext'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CartContext } from '../common/context/CartContext'

import { mockItems } from '../../setupTests'

const mockItem = mockItems[0]

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockAdmin = {
    _id: 2,
    roles: ['admin']
}

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
        <MemoryRouter initialEntries={[`/catalog/${mockItem._id}`]}>
            <AuthContext.Provider value={{ user }}>
                <CartContext.Provider value={{ addToCart: () => { } }}>
                    <Routes>
                        <Route path='catalog/:itemId' element={<ItemDetails />} />
                    </Routes>
                </CartContext.Provider>
            </AuthContext.Provider>
        </MemoryRouter>
    )
}
