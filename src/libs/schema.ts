export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      urls: {
        Row: {
          hit: number | null
          id: number
          inserted_at: string
          is_dynamic: number | null
          real_url: string | null
          slug: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          hit?: number | null
          id?: number
          inserted_at?: string
          is_dynamic?: number | null
          real_url?: string | null
          slug?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          hit?: number | null
          id?: number
          inserted_at?: string
          is_dynamic?: number | null
          real_url?: string | null
          slug?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'urls_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      distinct_users: {
        Row: {
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'urls_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
