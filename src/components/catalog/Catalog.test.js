import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Catalog } from './Catalog'
import { DimensionsContext } from '../common/context/DimensionsContext'
import { AuthContext } from '../common/context/AuthContext'
import { CartContext } from '../common/context/CartContext'
import { ItemDetails } from './ItemDetails'

import { mockCategories, mockItems } from './../../setupTests'

const mockUser = {
    _id: 1,
    roles: ['user']
}

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

    fireEvent.click(await screen.findByText(mockCategories[0].title))

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

    fireEvent.click(await screen.findByText(mockCategories[0].childCategories[0].title))

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

    fireEvent.click(await screen.findByText(mockItems[0].title))

    let description = await screen.findByText(item.description)

    expect(description).toBeInTheDocument()
})

test('shows filters for items catalog', async () => {
    renderSkeleton({}, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    await screen.findByText('Filter')
})

test('doesn\'t shows filters for categories catalog', async () => {
    renderSkeleton(mockUser, `/${mockCategories[0].title}/${mockCategories[0]._id}`)

    await screen.findByText(mockCategories[0].childCategories[0].title)

    expect(screen.queryByText('Filter')).not.toBeInTheDocument()
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