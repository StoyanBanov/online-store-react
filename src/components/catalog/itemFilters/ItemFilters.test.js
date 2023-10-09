import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { parseWhere } from '../testsUtil'
import { DimensionsContext } from '../../common/context/DimensionsContext'
import { CartContext } from '../../common/context/CartContext'
import { AuthContext } from '../../common/context/AuthContext'
import { Catalog } from '../Catalog'
import { host } from '../../../constants'

const mockUser = {
    _id: 1,
    roles: ['user']
}

const mockCategories = [
    {
        _id: '1',
        title: '1Cat',
        itemFields: {
            fieldCat1: 'String'
        },
        childCategories: []
    },
    {
        _id: '2',
        title: '1Cat',
        itemFields: {
            fieldCat2: 'Number'
        },
        childCategories: []
    }
]

const mockItems = [
    {
        _id: '1',
        title: '1Title',
        description: '1Description',
        price: 1,
        category: mockCategories[0],
        fieldCat1: 'fieldCat1Type1',
        images: []
    },
    {
        _id: '2',
        title: '2Title',
        description: '2Description',
        price: 3,
        category: mockCategories[0],
        fieldCat1: 'fieldCat1Type2',
        images: []
    },
    {
        _id: '3',
        title: '3Title',
        description: '3Description',
        price: 2,
        category: mockCategories[1],
        fieldCat2: 'fieldCat2Type1',
        images: []
    }
]

const server = setupServer(
    rest.get(host + `/category/:cId`, (req, res, ctx) => {
        return res(ctx.json(mockCategories.find(c => c._id === req.params.cId)))
    }),
    rest.get(host + `/item`, (req, res, ctx) => {
        let itemsToReturn = [...mockItems]

        const search = req.url.searchParams.get('search')

        if (search) {
            itemsToReturn = itemsToReturn.filter(i => i.title.includes(search) || i.description.includes(search))
        }

        const where = parseWhere(req)

        for (const [k, v] of Object.entries(where)) {
            if (k === 'category')
                itemsToReturn = itemsToReturn.filter(i => i.category._id === v)
            else
                itemsToReturn = itemsToReturn.filter(i => Array.isArray(v) ? v.includes(i[k]) : v === i[k])
        }

        const minPrice = Number(req.url.searchParams.get('minPrice'))
        const maxPrice = Number(req.url.searchParams.get('maxPrice'))
        if (minPrice || maxPrice) {
            itemsToReturn = itemsToReturn.filter(i => i.price >= (minPrice || 0) && i.price <= (maxPrice || Number.MAX_SAFE_INTEGER))
        }

        return res(ctx.json(itemsToReturn))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows filters', async () => {
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await screen.findByText(mockItems.find(i => i.category._id === cat._id).title)

    expect(screen.getByText('Filter')).toBeInTheDocument()
})

test('shows price filter', async () => {
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await screen.findByText(mockItems.find(i => i.category._id === cat._id).title)

    expect(await screen.findByText('Price')).toBeInTheDocument()
})

test('shows category specific filters', async () => {
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await Promise.all(Object.keys(cat.itemFields).map(f => screen.findByText(f)))
})

test('shows all items when no filters are selected', async () => {
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    await Promise.all(mockItems.filter(i => i.category._id === cat._id).map(i => screen.findByText(i.title)))
})

test('shows filtered items for one selected option for one filter', async () => {
    const cat = mockCategories[0]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}`)

    const filter1 = Object.keys(cat.itemFields)[0]

    await screen.findByText(filter1)

    const value1 = mockItems.find(i => i.category._id === cat._id)[filter1]

    fireEvent.click(await screen.findByText(value1))

    await waitFor(() => {
        expect(screen.queryByText(mockItems.find(i => i.category._id === cat._id && i[filter1] !== value1).title)).not.toBeInTheDocument()
    })

    await Promise.all(mockItems.filter(i => i.category._id === cat._id && i[filter1] === value1).map(i => screen.findByText(i.title)))
})

test('shows filtered items for one selected option for one filter from url', async () => {
    const cat = mockCategories[0]
    const filter1 = Object.keys(cat.itemFields)[0]
    const value1 = mockItems.find(i => i.category._id === cat._id)[filter1]

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}?${filter1}=${value1}`)

    await screen.findByText(filter1)

    await waitFor(() => {
        expect(screen.queryByText(mockItems.find(i => i.category._id === cat._id && i[filter1] !== value1).title)).not.toBeInTheDocument()
    })

    await Promise.all(mockItems.filter(i => i.category._id === cat._id && i[filter1] === value1).map(i => screen.findByText(i.title)))
})

test('shows filtered items by price from url', async () => {
    const cat = mockCategories[0]

    const sortedItems = mockItems.filter(i => i.category._id === cat._id).sort((a, b) => a.price - b.price)

    const minPrice = sortedItems[0].price + 1
    const maxPrice = sortedItems.at(-1).price

    renderSkeleton(mockUser, `/${cat.title}/${cat._id}?minPrice=${minPrice}&maxPrice=${maxPrice}`)

    await screen.findByText('Price')

    await waitFor(() => {
        expect(screen.queryByText(mockItems.find(i => i.category._id === cat._id && i.price < minPrice).title)).not.toBeInTheDocument()
    })

    await Promise.all(mockItems.filter(i => i.category._id === cat._id && i.price >= minPrice).map(i => screen.findByText(i.title)))
})

test('shows category filter when there is search filter from url', async () => {
    const search = mockItems[0].title

    renderSkeleton(mockUser, `?search=${search}`)

    await screen.findByText('category')
})

test('shows filtered items by search from url', async () => {
    const search = mockItems[0].title

    renderSkeleton(mockUser, `?search=${search}`)

    await waitFor(() => {
        expect(screen.queryByText(mockItems.find(i => !i.title.includes(search) && !i.description.includes(search)).title)).not.toBeInTheDocument()
    })

    await Promise.all(mockItems.filter(i => i.title.includes(search) || i.description.includes(search)).map(i => screen.findByText(i.title)))
})

function renderSkeleton(user, route) {
    render(
        <MemoryRouter initialEntries={[`/catalog${route}`]}>
            <DimensionsContext.Provider value={{ windowWidth: 1900 }}>
                <CartContext.Provider value={{ addToCart: () => { } }}>
                    <AuthContext.Provider value={{ user }}>
                        <Routes>
                            <Route path='catalog' element={<Catalog />} />
                            <Route path='catalog/:catTitle/:catId' element={<Catalog />} />
                        </Routes>
                    </AuthContext.Provider>
                </CartContext.Provider>
            </DimensionsContext.Provider>
        </MemoryRouter>
    )
}