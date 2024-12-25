export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          phone?: string;
          avatar_url?: string;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          avatar_url?: string;
          updated_at?: string;
          created_at?: string;
        };
      };
      deliveries: {
        Row: {
          id: string;
          user_id: string;
          status: 'pending' | 'in_progress' | 'delivered';
          recipient_name: string;
          recipient_phone: string;
          address: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: 'pending' | 'in_progress' | 'delivered';
          recipient_name: string;
          recipient_phone: string;
          address: string;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: 'pending' | 'in_progress' | 'delivered';
          recipient_name?: string;
          recipient_phone?: string;
          address?: string;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}