import { Login } from "./components/auth/Login";
import { Logout } from "./components/auth/Logout";
import { NonVerified } from "./components/auth/NonVerified";
import { Register } from "./components/auth/Register";
import { Catalog } from "./components/catalog/Catalog";
import { AuthContextProvider } from "./components/common/context/AuthContext";
import { CreateCategory } from "./components/admin/category/CreateCategory";
import { EditCategory } from "./components/admin/category/EditCategory";
import { CreateItem } from "./components/admin/item/CreateItem";
import { EditItem } from "./components/admin/item/EditItem";
import { ItemDetails } from "./components/catalog/ItemDetails";
import { Home } from "./components/home/Home";

import { GuestUserRouteGuard } from "./components/common/guards/GuestUserRouteGuard";
import { VerifiedUserOrGuestRouteGuard } from "./components/common/guards/VerifiedUserOrGuestRouteGuard";
import { AdminUserRouteGuard } from "./components/common/guards/AdminUserRouteGuard";

import { Navigate, Route, Routes } from "react-router-dom"
import { CartContextProvider } from "./components/common/context/CartContext";
import { Header } from "./components/header/Header";

import style from './style.module.css'
import { ShoppingCart } from "./components/shoppingCart/ShoppingCart";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <CartContextProvider>
                    <Header />

                    <main>
                        <Routes>
                            <Route path="/non-verified" element={<NonVerified />} />
                            <Route path="/logout" element={<Logout />} />

                            <Route element={<VerifiedUserOrGuestRouteGuard />}>
                                <Route path="/" element={<Home />} />

                                <Route path="/cart" element={<ShoppingCart />} />

                                <Route path="/catalog">
                                    <Route index={true} element={<Catalog />} />

                                    <Route path=":catTitle/:catId">
                                        <Route index={true} element={<Catalog />} />
                                        <Route path=":itemId" element={<ItemDetails />} />
                                    </Route>
                                </Route>

                                <Route element={<AdminUserRouteGuard />}>
                                    <Route path="/admin">
                                        <Route path="create">
                                            <Route index={true} element={<Navigate to={'/create/item'} />} replace={true} />
                                            <Route path="item" element={<CreateItem />} />
                                            <Route path="category" element={<CreateCategory />} />
                                        </Route>

                                        <Route path="edit">
                                            <Route path="category/:catId" element={<EditCategory />} />
                                            <Route path="item/:itemId" element={<EditItem />} />
                                        </Route>
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
