import { baseApi } from "../api/baseApi";
import cartSlice from "../slices/cartSlice";

export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice,
};
