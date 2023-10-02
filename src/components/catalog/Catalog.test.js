import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
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
        title: 'clickMe',
        childCategories: [
            {
                _id: 1,
                parentCategory: 1,
                title: 'a1cat'
            }, {
                _id: 2,
                parentCategory: 1,
                title: 'a2cat'
            }
        ]
    }, {
        _id: 2,
        title: 'b'
    }
]

const host = 'http://localhost:3030'
const server = setupServer(
    rest.get(host + `/category/:id`, (req, res, ctx) => {
        return res(ctx.json(mockParentCategories[0]))
    }),
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

test('loads child categories', async () => {
    renderSkeleton(mockUser, `/${mockParentCategories[0].title}/${mockParentCategories[0]._id}`)

    let titles = await Promise.all(mockParentCategories[0].childCategories.map(c => screen.findByText(c.title)))

    expect(titles.length).toBe(mockParentCategories[0].childCategories.length)
})

function renderSkeleton(user, route = '') {
    render(
        <MemoryRouter initialEntries={[`/catalog${route}`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1000 }}>
                <AuthContext.Provider value={{ user }}>
                    <Routes>
                        <Route path='catalog/:catTitle/:catId' element={<Catalog />} />
                        <Route path='catalog' element={<Catalog />} />
                    </Routes>
                </AuthContext.Provider>
            </DimensionsContext.Provider>
        </MemoryRouter>
    )
}