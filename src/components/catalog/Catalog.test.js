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

    await Promise.all(parentCategories.map(c => screen.findByText(c.title)))
})

test('loads child categories', async () => {
    renderSkeleton(mockUser, `/${mockCategories[0].title}/${mockCategories[0]._id}`)

    await Promise.all(mockCategories[0].childCategories.map(c => screen.findByText(c.title)))
})

test('loads child categories from catalog', async () => {
    renderSkeleton(mockUser)

    fireEvent.click(await screen.findByText(mockCategories[0].title))

    await Promise.all(mockCategories[0].childCategories.map(c => screen.findByText(c.title)))
})

test('loads items', async () => {
    renderSkeleton(mockUser, `/${mockCategories[2].title}/${mockCategories[2]._id}`)

    await Promise.all(mockItems.filter(i => i.category === mockCategories[2]).map(i => screen.findByText(i.title)))
})

test('loads items from catalog', async () => {
    const cat = mockCategories[0]
    const childCat = cat.childCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    fireEvent.click(await screen.findByText(childCat.title))

    await Promise.all(mockItems.filter(i => i.category === childCat).map(i => screen.findByText(i.title)))
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
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await screen.findByText(cat.childCategories[0].title)

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