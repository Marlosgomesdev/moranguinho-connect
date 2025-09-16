export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alunos: {
        Row: {
          created_at: string
          data_nascimento: string
          foto_url: string | null
          genero: string | null
          id: string
          necessidades_especiais: string | null
          nome: string
          observacoes: string | null
          responsavel_id: string | null
          restricoes_alimentares: string | null
          status: string | null
          turma_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_nascimento: string
          foto_url?: string | null
          genero?: string | null
          id?: string
          necessidades_especiais?: string | null
          nome: string
          observacoes?: string | null
          responsavel_id?: string | null
          restricoes_alimentares?: string | null
          status?: string | null
          turma_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_nascimento?: string
          foto_url?: string | null
          genero?: string | null
          id?: string
          necessidades_especiais?: string | null
          nome?: string
          observacoes?: string | null
          responsavel_id?: string | null
          restricoes_alimentares?: string | null
          status?: string | null
          turma_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alunos_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alunos_turma_id_fkey"
            columns: ["turma_id"]
            isOneToOne: false
            referencedRelation: "turmas"
            referencedColumns: ["id"]
          },
        ]
      }
      atividades: {
        Row: {
          aluno_id: string
          created_at: string
          data_atividade: string
          descricao: string | null
          id: string
          nota: number | null
          observacao: string | null
          professor_id: string
          titulo: string
          updated_at: string
        }
        Insert: {
          aluno_id: string
          created_at?: string
          data_atividade: string
          descricao?: string | null
          id?: string
          nota?: number | null
          observacao?: string | null
          professor_id: string
          titulo: string
          updated_at?: string
        }
        Update: {
          aluno_id?: string
          created_at?: string
          data_atividade?: string
          descricao?: string | null
          id?: string
          nota?: number | null
          observacao?: string | null
          professor_id?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "atividades_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atividades_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financeiro: {
        Row: {
          aluno_id: string
          ano_referencia: number
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          id: string
          mes_referencia: string
          observacoes: string | null
          responsavel_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string
          valor: number
        }
        Insert: {
          aluno_id: string
          ano_referencia: number
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          id?: string
          mes_referencia: string
          observacoes?: string | null
          responsavel_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string
          valor: number
        }
        Update: {
          aluno_id?: string
          ano_referencia?: number
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          id?: string
          mes_referencia?: string
          observacoes?: string | null
          responsavel_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "financeiro_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financeiro_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas: {
        Row: {
          created_at: string
          data_nascimento: string
          email: string
          endereco: string | null
          id: string
          nome_crianca: string
          nome_responsavel: string
          observacoes: string | null
          processado_em: string | null
          processado_por: string | null
          status: string | null
          telefone: string
          turma_interesse: string | null
        }
        Insert: {
          created_at?: string
          data_nascimento: string
          email: string
          endereco?: string | null
          id?: string
          nome_crianca: string
          nome_responsavel: string
          observacoes?: string | null
          processado_em?: string | null
          processado_por?: string | null
          status?: string | null
          telefone: string
          turma_interesse?: string | null
        }
        Update: {
          created_at?: string
          data_nascimento?: string
          email?: string
          endereco?: string | null
          id?: string
          nome_crianca?: string
          nome_responsavel?: string
          observacoes?: string | null
          processado_em?: string | null
          processado_por?: string | null
          status?: string | null
          telefone?: string
          turma_interesse?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_processado_por_fkey"
            columns: ["processado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mensagens: {
        Row: {
          assunto: string
          created_at: string
          email: string
          id: string
          mensagem: string
          nome: string
          respondido_em: string | null
          respondido_por: string | null
          resposta: string | null
          status: string | null
          telefone: string | null
        }
        Insert: {
          assunto: string
          created_at?: string
          email: string
          id?: string
          mensagem: string
          nome: string
          respondido_em?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: string | null
          telefone?: string | null
        }
        Update: {
          assunto?: string
          created_at?: string
          email?: string
          id?: string
          mensagem?: string
          nome?: string
          respondido_em?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_respondido_por_fkey"
            columns: ["respondido_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          telefone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          telefone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      turmas: {
        Row: {
          ano_letivo: string
          capacidade_maxima: number | null
          created_at: string
          id: string
          idade_maxima: number | null
          idade_minima: number | null
          nome: string
          professor_id: string | null
          updated_at: string
        }
        Insert: {
          ano_letivo: string
          capacidade_maxima?: number | null
          created_at?: string
          id?: string
          idade_maxima?: number | null
          idade_minima?: number | null
          nome: string
          professor_id?: string | null
          updated_at?: string
        }
        Update: {
          ano_letivo?: string
          capacidade_maxima?: number | null
          created_at?: string
          id?: string
          idade_maxima?: number | null
          idade_minima?: number | null
          nome?: string
          professor_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "turmas_professor_id_fkey"
            columns: ["professor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      payment_status: "pago" | "nao_pago" | "pendente"
      user_role: "admin" | "professor" | "pai"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_status: ["pago", "nao_pago", "pendente"],
      user_role: ["admin", "professor", "pai"],
    },
  },
} as const
