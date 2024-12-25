export type ParcelStatus = 'pending' | 'in_transit' | 'delivered';
export type VehicleType = 'small' | 'medium' | 'large';
export type RouteStatus = 'active' | 'inactive';

export interface Customer {
  id: string;
  user_id: string;
  customer_code: string;
  full_name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  name: string;
  description: string | null;
  status: RouteStatus;
  created_at: string;
  updated_at: string;
}

export interface Parcel {
  id: string;
  tracking_number: string;
  sender_id: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_address: string;
  route_id: string;
  status: ParcelStatus;
  weight: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  vehicle_number: string;
  vehicle_type: VehicleType;
  capacity: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryPersonnel {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  route_id: string;
  vehicle_id: string;
  created_at: string;
  updated_at: string;
}