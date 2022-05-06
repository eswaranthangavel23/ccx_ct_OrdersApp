import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Carts from "./pages/carts";
import "./App.css";
const Orders = lazy(() => import(`./pages/orders`));

const App = () => {
  return (
    <>
      <div className="nav_bar">
        <p>hermanmiller_dev_demo</p>
        <div className="nb_items">
          <a href="/carts" className="nb_items_link">
            Carts
          </a>
          <a href="/orders" className="nb_items_link">
            Orders
          </a>
        </div>
      </div>
      <Routes>
        <Route path="/" exact element={<Carts />} />
        <Route path="/carts" exact element={<Carts />} />
        <Route
          path="orders"
          exact
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <Orders />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
