import fetch from "node-fetch";
import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

export const projectKey = process.env.REACT_APP_CTP_PROJECT_KEY;
const authMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET,
  },
  scopes: [process.env.REACT_APP_CTP_SCOPES],
  fetch,
};

const httpMiddlewareOptions = {
  host: process.env.REACT_APP_CTP_API_URL,
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
