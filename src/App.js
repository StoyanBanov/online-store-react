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

import { Navigate, Route, Routes } from "react-router-dom"
import { Search } from "./components/search/Search";
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";
import { CartContextProvider } from "./components/common/context/CartContext";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <Nav />
                <Search />

                <CartContextProvider>
                    <ShoppingCart />

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

                </CartContextProvider>

            </AuthContextProvider>
        </div >
    );
}

export default App;
