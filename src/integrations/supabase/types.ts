export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaign_analytics: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          event_type: string
          id: string
          ip_address: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          background_image: string | null
          colors: Json | null
          created_at: string | null
          description: string | null
          end_date: string | null
          end_time: string | null
          form_fields: Json | null
          game_content: Json | null
          game_settings: Json | null
          game_style: Json | null
          game_type: string | null
          id: string
          name: string | null
          participants: number | null
          public_url: string | null
          start_date: string | null
          start_time: string | null
          status: string
          style: Json | null
          type: string | null
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          background_image?: string | null
          colors?: Json | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          form_fields?: Json | null
          game_content?: Json | null
          game_settings?: Json | null
          game_style?: Json | null
          game_type?: string | null
          id?: string
          name?: string | null
          participants?: number | null
          public_url?: string | null
          start_date?: string | null
          start_time?: string | null
          status: string
          style?: Json | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          background_image?: string | null
          colors?: Json | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          form_fields?: Json | null
          game_content?: Json | null
          game_settings?: Json | null
          game_style?: Json | null
          game_type?: string | null
          id?: string
          name?: string | null
          participants?: number | null
          public_url?: string | null
          start_date?: string | null
          start_time?: string | null
          status?: string
          style?: Json | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      content_templates: {
        Row: {
          created_at: string | null
          data: Json
          id: string
          name: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: string
          name: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      dice_settings: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          faces: string[]
          id: number
          winning_face: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          faces: string[]
          id?: never
          winning_face?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          faces?: string[]
          id?: never
          winning_face?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dice_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      form_fields: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          label: string
          options: Json | null
          placeholder: string | null
          required: boolean | null
          type: string
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          label: string
          options?: Json | null
          placeholder?: string | null
          required?: boolean | null
          type: string
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          label?: string
          options?: Json | null
          placeholder?: string | null
          required?: boolean | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      memory_settings: {
        Row: {
          campaign_id: string | null
          cards: Json
          created_at: string | null
          id: string
          pairs: string[] | null
          updated_at: string | null
          win_message: string | null
        }
        Insert: {
          campaign_id?: string | null
          cards?: Json
          created_at?: string | null
          id?: string
          pairs?: string[] | null
          updated_at?: string | null
          win_message?: string | null
        }
        Update: {
          campaign_id?: string | null
          cards?: Json
          created_at?: string | null
          id?: string
          pairs?: string[] | null
          updated_at?: string | null
          win_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memory_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      participations: {
        Row: {
          adresse: string | null
          campaign_id: string | null
          civilite: string
          code_postal: string | null
          created_at: string | null
          date_naissance: string | null
          email: string | null
          id: string
          nom: string
          pays: string | null
          prenom: string
          reglement_accepte: boolean
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          campaign_id?: string | null
          civilite: string
          code_postal?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id?: string
          nom: string
          pays?: string | null
          prenom: string
          reglement_accepte: boolean
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          campaign_id?: string | null
          civilite?: string
          code_postal?: string | null
          created_at?: string | null
          date_naissance?: string | null
          email?: string | null
          id?: string
          nom?: string
          pays?: string | null
          prenom?: string
          reglement_accepte?: boolean
          ville?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      puzzle_settings: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          grid_size: number
          id: string
          image_url: string | null
          updated_at: string | null
          win_text: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          grid_size?: number
          id?: string
          image_url?: string | null
          updated_at?: string | null
          win_text?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          grid_size?: number
          id?: string
          image_url?: string | null
          updated_at?: string | null
          win_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "puzzle_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          campaign_id: string | null
          correct_answer: string | null
          created_at: string | null
          id: string
          options: Json | null
          text: string
          type: string
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: string
          options?: Json | null
          text: string
          type: string
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          correct_answer?: string | null
          created_at?: string | null
          id?: string
          options?: Json | null
          text?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      scratch_settings: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          prize: Json
          reveal_percent: number
          reward_percent: number | null
          updated_at: string | null
          win_text: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          prize?: Json
          reveal_percent?: number
          reward_percent?: number | null
          updated_at?: string | null
          win_text?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          prize?: Json
          reveal_percent?: number
          reward_percent?: number | null
          updated_at?: string | null
          win_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scratch_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      target_settings: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          miss_text: string | null
          prize: string | null
          speed: number
          targets: number
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          miss_text?: string | null
          prize?: string | null
          speed?: number
          targets?: number
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          miss_text?: string | null
          prize?: string | null
          speed?: number
          targets?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "target_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          company: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string
          created_at?: string | null
          email: string
          full_name?: string
          id?: string
          phone?: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      wheel_settings: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          segments: Json
          updated_at: string | null
          winner_index: number | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          segments?: Json
          updated_at?: string | null
          winner_index?: number | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          segments?: Json
          updated_at?: string | null
          winner_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "wheel_settings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unique_slug: {
        Args: { name: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
