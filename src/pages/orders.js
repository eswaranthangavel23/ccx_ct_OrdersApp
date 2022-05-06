import { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import moment from "moment";
import { getOrders, getCustomerById } from "../services";
const data = {
  columns: [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Payment date",
      field: "paymentdate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Amount",
      field: "amount",
      sort: "asc",
      width: 200,
    },
    {
      label: "Total Items",
      field: "count",
      sort: "asc",
      width: 100,
    },
    {
      label: "Customer",
      field: "customer",
      sort: "asc",
      width: 100,
    },
    {
      label: "Customer E-mail",
      field: "email",
      sort: "asc",
      width: 150,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 100,
    },
  ],
  rows: [],
};
const Orders = () => {
  const [gridData, setGriddata] = useState({});
  const [status, setStatus] = useState("Starting...");

  const getAllOrders = async () => {
    setStatus("Loading Orders ...");
    const result = await getOrders();
    if (result.results) {
      if (result.results.length > 0) {
        const tempRes = await matchCustomers(result.results);
        let rowCount = 1;
        for (let row of tempRes) {
          if (row.customer) {
            data.rows.push({
              id: rowCount,
              paymentdate: moment(row.createdAt).format("MM/DD/yy HH:mm:ss"),
              amount: `$${(row.totalPrice.centAmount / 100).toFixed(2)}`,
              count: getTtolatItems(row.lineItems),
              customer: row.customer.firstName,
              email: row.customer?.email,
              status: row.orderState,
            });
            rowCount++;
          }
        }
        setGriddata(data);
        setStatus("Loaded...");
      } else {
        setStatus("No Orders Found");
      }
    }
  };

  const getTtolatItems = (items) => {
    let j = 0;
    items.map((i) => (j = j + i.quantity));
    return j;
  };

  const ordersLayout = () => {
    return <MDBDataTable striped bordered small data={gridData} />;
  };

  const matchCustomers = async (carts) => {
    return Promise.all(
      carts.map(async (x) => {
        x.customer = x.customerId && (await getCustomerById(x.customerId));
        return x;
      })
    );
  };

  useEffect(() => {
    getAllOrders();
    return () => {};
  }, []);

  return (
    <div className="carts_container">
      <div className="sb_wrapper">
        <p className="sb_header">ORDERS</p>
      </div>
      <>{data.rows.length > 0 ? ordersLayout() : status}</>
    </div>
  );
};

export default Orders;
