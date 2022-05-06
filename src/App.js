import { Suspense, lazy } from "react";
import { Routes, Link, Route } from "react-router-dom";
import Carts from "./pages/carts";
import "./App.css";
const Orders = lazy(() => import(`./pages/orders`));

const App = () => {
  return (
    <>
      <div className="nav_bar">
        <p>hermanmiller_dev_demo</p>
        <div className="nb_items">
          <Link className="nb_items_link" to="/">
            Carts
          </Link>
          {/* <a href="/" className="nb_items_link">
            Carts
          </a> */}
          <Link className="nb_items_link" to="/orders">
            Orders
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" exact element={<Carts />} />
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
