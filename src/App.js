import { CreateItem } from "./components/createItem/CreateItem";
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/Nav";

import { Route, RouterProvider, Routes } from "react-router-dom"

function App() {
    return (
        <div>
            <Nav />
            <RouterProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-item" element={<CreateItem />} />
                </Routes>
            </RouterProvider>
        </div>
    );
}

export default App;
