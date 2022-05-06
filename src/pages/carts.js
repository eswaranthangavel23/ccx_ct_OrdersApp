import { useEffect, useState } from "react";
import { getCarts, getCustomerById } from "../services";
import { MDBDataTable } from "mdbreact";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import moment from "moment";
const data = {
  columns: [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Items",
      field: "items",
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
      label: "CreatedDate",
      field: "created",
      sort: "asc",
      width: 100,
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
const Carts = () => {
  const [gridData, setGriddata] = useState({});
  const [status, setStatus] = useState("Starting...");

  const getAllCarts = async () => {
    setStatus("Loading Carts ...");
    const result = await getCarts();
    if (result.results) {
      if (result.results.length > 0) {
        const tempRes = await matchCustomers(result.results);
        let rowCount = 1;
        for (let row of tempRes) {
          if (row.customer) {
            data.rows.push({
              id: rowCount,
              customer: row.customer.firstName,
              items: row.lineItems.map((i, j) => `${i.name.en},`),
              amount: `$${(row.totalPrice.centAmount / 100).toFixed(2)}`,
              email: row.customer?.email,
              created: moment(row.createdAt).format("MM/DD/yy HH:mm:ss"),
              status: row.cartState,
            });
            rowCount++;
          }
        }

        setGriddata(data);
        setStatus("Loaded...");
      } else {
        setStatus("No carts Found");
      }
    }
  };

  const matchCustomers = async (carts) => {
    return Promise.all(
      carts.map(async (x) => {
        x.customer = x.customerId && (await getCustomerById(x.customerId));
        return x;
      })
    );
  };

  const cartsLayout = () => {
    return <MDBDataTable striped bordered small data={gridData} />;
  };

  useEffect(() => {
    getAllCarts();
    return () => {};
  }, []);

  return (
    <div className="mdbtable">
      <div className="carts_container">
        <div className="sb_wrapper">
          <p className="sb_header">CARTS</p>
        </div>
        <>{data.rows.length > 0 ? cartsLayout() : status}</>
      </div>
    </div>
  );
};

export default Carts;
