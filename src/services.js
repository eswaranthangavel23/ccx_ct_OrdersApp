import { getApiRoot, projectKey } from "./BuildClient";
export const getProdcuts = async () => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .productProjections()
    .get({
      queryArgs: {
        limit: 500,
      },
    })
    .execute()
    .then((res) => res.body)
    .catch((err) => err);
};

export const getCarts = async () => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .carts()
    .get({
      queryArgs: {
        limit: 500,
      },
    })
    .execute()
    .then((res) => res.body)
    .catch((err) => err);
};

export const getOrders = async () => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .orders()
    .get({
      queryArgs: {
        limit: 500,
      },
    })
    .execute()
    .then((res) => res.body)
    .catch((err) => err);
};

export const getCustomerById = async (customerID) => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID: customerID })
    .get()
    .execute()
    .then((res) => res.body)
    .catch((err) => err);
};
