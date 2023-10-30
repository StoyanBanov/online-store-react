import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { CartContext } from '../common/context/CartContext'
import { host } from '../../constants'
import { Purchase } from './Purchase'
import { CreatePurchase } from './CreatePurchase'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../common/context/AuthContext'

const mockUser = {
    _id: 1,
    fname: 'Stoyan',
    lname: 'Banov',
    phone: '12213099',
    roles: ['user']
}

const server = setupServer(
    rest.get(host + `/user`, (req, res, ctx) => {
        return res(mockUser)
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders create component', async () => {
    renderSkeleton()

    await screen.findByText('First name')
})

test('shows user data', async () => {
    renderSkeleton()

    await screen.findByText('First name')

    await screen.findByText(mockUser.fname)
})

function renderSkeleton() {
    render(
        <MemoryRouter initialEntries={[`/purchase/create`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1900 }}>
                <AuthContext.Provider value={{ user: mockUser }}>
                    <CartContext.Provider value={{ cart: {} }}>
                        <Routes>
                            <Route path="/purchase" element={<Purchase />}>
                                <Route path="create" element={<CreatePurchase />} />
                            </Route>
                        </Routes>
                    </CartContext.Provider>
                </AuthContext.Provider>
            </DimensionsContext.Provider>
        </MemoryRouter>
    )
}