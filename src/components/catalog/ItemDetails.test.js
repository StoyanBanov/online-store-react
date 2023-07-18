import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ItemDetails } from './ItemDetails'
import { AuthContext } from '../common/context/AuthContext'

const mockItem = {
    _id: 1,
    title: 'title1',
    rating: 2
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
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads item info for guest', async () => {
    render(
        <AuthContext.Provider value={{ user: {} }}>
            <ItemDetails />
        </AuthContext.Provider>
    )

    const title = await screen.findByText(mockItem.title)

    expect(title).toBeInTheDocument()
})

test('loads item info for user', async () => {
    render(
        <AuthContext.Provider value={{ user: mockUser }}>
            <ItemDetails />
        </AuthContext.Provider>
    )

    const title = await screen.findAllByText('★')

    expect(title.length).toBe(2)
})