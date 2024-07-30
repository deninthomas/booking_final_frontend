import { Get, Post } from "../authHttpClient";

const baseName = "/billing";
const billingHistoryURL = `${baseName}/get-billing-history`
export const getBillingHistory = (request) => {
    return Post(billingHistoryURL, request);
};
