import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Delivery {
  id: string;
  status: 'pending' | 'in_progress' | 'delivered';
  address: string;
  recipientName: string;
  recipientPhone: string;
  createdAt: string;
}

interface DeliveryState {
  deliveries: Delivery[];
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  loading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setDeliveries: (state, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
      state.loading = false;
      state.error = null;
    },
    addDelivery: (state, action: PayloadAction<Delivery>) => {
      state.deliveries.push(action.payload);
    },
    updateDelivery: (state, action: PayloadAction<Delivery>) => {
      const index = state.deliveries.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.deliveries[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setDeliveries,
  addDelivery,
  updateDelivery,
  setLoading,
  setError,
} = deliverySlice.actions;
export default deliverySlice.reducer;