import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { CartContext } from '../common/context/CartContext'
import { HOST } from '../../constants'
import { Purchase } from './Purchase'
import { CreatePurchase } from './CreatePurchase'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../common/context/AuthContext'

const mockUser = {
    _id: 1,
    fname: 'Stoyan',
    lname: 'Banov',
    phone: '12213099',
    roles: ['user']
}

const server = setupServer(
    rest.get(HOST + `/user`, (req, res, ctx) => {
        return res(ctx.json(mockUser))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders create component', async () => {
    renderSkeleton()

    await screen.findByText('First name')
    await screen.findByText('Last name')
    await screen.findByText('Phone')
    await screen.findByText('E-mail')
})

test('renders address form initially', async () => {
    renderSkeleton()

    await screen.findByText('Street')
    await screen.findByText('City')
    await screen.findByText('ZIP Code')
    await screen.findByText('County')
    await screen.findByText('Country')
})

test('renders office form on choice', async () => {
    renderSkeleton()

    fireEvent.click(await screen.findByText('office'))

    await screen.findByText('Office')
})

test('office form has correct fields', async () => {
    renderSkeleton()

    fireEvent.click(await screen.findByText('office'))

    await screen.findByText('City')
    await screen.findByText('Office')
})

test('shows user data', async () => {
    renderSkeleton()

    await waitFor(() => {
        expect(screen.getByLabelText('First name').value).toBe(mockUser.fname)
    })

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