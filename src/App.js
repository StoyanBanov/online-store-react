import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { CreateCategory } from "./components/createCategory/CreateCategory";
import { CreateItem } from "./components/createItem/CreateItem";
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/Nav";

import { Navigate, Route, Routes } from "react-router-dom"

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create">
                    <Route index={true} element={<Navigate to={'/create/item'} />} replace={true} />
                    <Route path="item" element={<CreateItem />} />
                    <Route path="category" element={<CreateCategory />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div >
    );
}

export default App;
