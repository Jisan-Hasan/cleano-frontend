import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Service {
    id: string;
    name: string;
    price: number;
}

export interface CartState {
    cartItems: Service[];
}

// // Load cart state from localStorage or use the initialState if it's not found
// const loadCartState = () => {
//     const storedState = localStorage.getItem("cartState");
//     return storedState ? JSON.parse(storedState) : { cartItems: [] };
// };

const initialState: CartState = { cartItems: [] };

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Service>) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex === -1) {
                state.cartItems.push(action.payload);
                // saveCartState(state);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            // saveCartState(state);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

// // Save the cart state to localStorage
// const saveCartState = (state: CartState) => {
//     localStorage.setItem("cartState", JSON.stringify(state));
// };
