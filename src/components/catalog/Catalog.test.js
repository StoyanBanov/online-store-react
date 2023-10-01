import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Catalog } from './Catalog'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { AuthContext } from '../common/context/AuthContext'

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockParentCategories = [
    {
        _id: 1,
        title: 'a'
    }, {
        _id: 2,
        title: 'b'
    }
]

const host = 'http://localhost:3030'
const server = setupServer(
    rest.get(host + `/category?where=${encodeURIComponent('parentCategory=null')}`, (req, res, ctx) => {
        return res(ctx.json(mockParentCategories))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads parent categories', async () => {
    renderSkeleton(mockUser)

    const titles = await Promise.all(mockParentCategories.map(c => screen.findByText(c.title)))

    expect(titles.length).toBe(mockParentCategories.length)
})

function renderSkeleton(user) {
    render(
        <BrowserRouter>
            <DimensionsContext.Provider value={{ windowWidth: 1000 }}>
                <AuthContext.Provider value={{ user }}>
                    <Catalog />
                </AuthContext.Provider>
            </DimensionsContext.Provider>
        </BrowserRouter>
    )
}