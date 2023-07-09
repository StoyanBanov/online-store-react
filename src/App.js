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
                    <Route path="category" element={<CreateItem />} />
                </Route>
            </Routes>
        </div >
    );
}

export default App;
