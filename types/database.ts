export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string
          name: string
          email: string
          specialty: string
          qualifications: string
          bio: string
          profile_image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          specialty: string
          qualifications: string
          bio: string
          profile_image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          specialty?: string
          qualifications?: string
          bio?: string
          profile_image_url?: string | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          doctor_id: string
          name: string
          description: string | null
          duration_minutes: number
          price: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          name: string
          description?: string | null
          duration_minutes: number
          price: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          name?: string
          description?: string | null
          duration_minutes?: number
          price?: number
          is_active?: boolean
          created_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_reference: string
          doctor_id: string
          service_id: string
          patient_name: string
          patient_email: string
          patient_phone: string
          patient_address: string | null
          patient_city: string | null
          patient_state: string | null
          patient_pincode: string | null
          main_concern: string
          comments: string | null
          appointment_datetime: string
          timezone: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_reference: string
          doctor_id: string
          service_id: string
          patient_name: string
          patient_email: string
          patient_phone: string
          patient_address?: string | null
          patient_city?: string | null
          patient_state?: string | null
          patient_pincode?: string | null
          main_concern: string
          comments?: string | null
          appointment_datetime: string
          timezone?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_reference?: string
          doctor_id?: string
          service_id?: string
          patient_name?: string
          patient_email?: string
          patient_phone?: string
          patient_address?: string | null
          patient_city?: string | null
          patient_state?: string | null
          patient_pincode?: string | null
          main_concern?: string
          comments?: string | null
          appointment_datetime?: string
          timezone?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
