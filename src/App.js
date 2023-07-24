import { Login } from "./components/auth/Login";
import { Logout } from "./components/auth/Logout";
import { NonVerified } from "./components/auth/NonVerified";
import { Register } from "./components/auth/Register";
import { Catalog } from "./components/catalog/Catalog";
import { AuthContextProvider } from "./components/common/context/AuthContext";
import { GuestUserRouteGuard } from "./components/common/guards/GuestUserRouteGuard";
import { UnverifiedUserRouteGuard } from "./components/common/guards/UnverifiedUserRouteGuard";
import { VerifiedUserRouteGuard } from "./components/common/guards/VerifiedUserRouteGuard";
import { CreateCategory } from "./components/createCategory/CreateCategory";
import { CreateItem } from "./components/createItem/CreateItem";
import { ItemDetails } from "./components/catalog/ItemDetails";
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/Nav";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Search } from "./components/search/Search";
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";
import { CartContextProvider } from "./components/common/context/CartContext";
import { useCallback, useRef } from "react";

import style from './style.module.css'

function App() {
    const navigate = useNavigate()

    const cartDiv = useRef()

    const cartClickHandler = useCallback(() => {
        navigate('/cart')
    }, [navigate])

    const cartHoverHandler = useCallback(e => {
        if (e.type === 'mouseover') {
            cartDiv.current.style.display = 'block'
        } else {
            cartDiv.current.style.display = 'none'
        }
    }, [])

    return (
        <div>
            <AuthContextProvider>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{ color: 'red', display: 'inline' }}><span style={{ fontSize: 30, fontWeight: 'bold' }}>ne</span><span style={{ fontSize: 21.5, fontWeight: 'bolder' }}>MAG</span></p>
                    <Search />
                </div>
                <Nav />

                <CartContextProvider>
                    <div className={style.cartDiv}>
                        <button
                            onClick={cartClickHandler}
                            onMouseOver={cartHoverHandler}
                            onMouseOut={cartHoverHandler}
                        >
                            Cart
                        </button>
                        <div
                            onMouseOver={cartHoverHandler}
                            onMouseOut={cartHoverHandler}
                            ref={cartDiv}
                            style={{ display: 'none' }}
                        >
                            <h1>cart</h1>
                            <ShoppingCart />
                        </div>
                    </div>
                    <main>
                        <Routes>
                            <Route path="/non-verified" element={<NonVerified />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<UnverifiedUserRouteGuard />}>
                                <Route path="/" element={<Home />} />

                                <Route path="/catalog">
                                    <Route index={true} element={<Catalog />} />
                                    <Route path=":itemId" element={<ItemDetails />} />
                                </Route>

                                <Route element={<VerifiedUserRouteGuard />}>
                                    <Route path="/create">
                                        <Route index={true} element={<Navigate to={'/create/item'} />} replace={true} />
                                        <Route path="item" element={<CreateItem />} />
                                        <Route path="category" element={<CreateCategory />} />
                                    </Route>
                                </Route>

                                <Route element={<GuestUserRouteGuard />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Route>
                            </Route>
                        </Routes>
                    </main>
                </CartContextProvider>

            </AuthContextProvider>
        </div >
    );
}

export default App;
