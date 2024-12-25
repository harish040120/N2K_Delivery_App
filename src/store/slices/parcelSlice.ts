import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import type { Parcel } from '../../types/database';
import { notifyParcelStatus } from '../../utils/sms';

interface ParcelState {
  parcels: Parcel[];
  loading: boolean;
  error: string | null;
}

const initialState: ParcelState = {
  parcels: [],
  loading: false,
  error: null,
};

export const fetchParcels = createAsyncThunk(
  'parcels/fetchParcels',
  async () => {
    const { data, error } = await supabase
      .from('parcels')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const updateParcelStatus = createAsyncThunk(
  'parcels/updateStatus',
  async ({ parcelId, status }: { parcelId: string; status: Parcel['status'] }) => {
    const { data, error } = await supabase
      .from('parcels')
      .update({ status })
      .eq('id', parcelId)
      .select()
      .single();

    if (error) throw error;
    
    if (status === 'in_transit' || status === 'delivered') {
      await notifyParcelStatus(
        data.sender_phone,
        data.receiver_phone,
        data.tracking_number,
        status === 'in_transit' ? 'dispatched' : 'delivered'
      );
    }

    return data;
  }
);

const parcelSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch parcels';
      })
      .addCase(updateParcelStatus.fulfilled, (state, action) => {
        const index = state.parcels.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      });
  },
});

export default parcelSlice.reducer;