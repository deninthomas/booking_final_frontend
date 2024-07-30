import {  Get, Post } from "../authHttpClient";

const baseName = "/booking";

const createBookingURL = `${baseName}/book-entity`;
const getBookingsURL = `${baseName}/get-bookings`;

export const CreateBooking = (request) => {
    return Post(createBookingURL, request );
};
export const GetBookings = (request) => {
    return Post(getBookingsURL, request );
};
