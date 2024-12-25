import { supabase } from '../lib/supabase';
import type { Parcel } from '../types/database';

export const generateTrackingNumber = () => {
  const prefix = 'SR';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

export const getParcelByTracking = async (trackingNumber: string): Promise<Parcel | null> => {
  const { data, error } = await supabase
    .from('parcels')
    .select('*')
    .eq('tracking_number', trackingNumber)
    .single();

  if (error) {
    console.error('Error fetching parcel:', error);
    return null;
  }

  return data;
};