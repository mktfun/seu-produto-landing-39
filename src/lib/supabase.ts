import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase (será substituída quando conectar via MCP)
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Para formulário público, não precisa de sessão
  },
  db: {
    schema: 'public'
  }
})

// Tipos para TypeScript
export interface Lead {
  id?: number
  created_at?: string
  name: string
  phone: string
  how_did_you_hear: string
  property_type: string
  property_value: string
  main_priority: string
  budget_range: string
  recommended_plan: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  user_agent?: string
  ip_address?: string
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  notes?: string
}

// Função para salvar lead
export async function saveLead(leadData: Omit<Lead, 'id' | 'created_at'>): Promise<{ success: boolean; data?: Lead; error?: string }> {
  try {
    console.log('💾 Salvando lead no Supabase:', leadData.name);
    console.log('📋 Dados completos:', leadData);

    // Check if Supabase is properly configured
    if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
      console.warn('⚠️ Supabase não configurado. Por favor, conecte via MCP.');
      return {
        success: false,
        error: 'Supabase não está configurado. Conecte via MCP primeiro.'
      };
    }

    // Verificar se os dados estão válidos
    if (!leadData.name || !leadData.phone) {
      return {
        success: false,
        error: 'Nome e telefone são obrigatórios'
      };
    }

    const insertData = {
      ...leadData,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      // IP será capturado pelo servidor se possível
    };

    console.log('📤 Enviando para Supabase:', insertData);

    const { data, error } = await supabase
      .from('leads')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao salvar lead:', error);
      console.error('💡 Detalhes do erro:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });

      return {
        success: false,
        error: `Erro ao salvar: ${error.message} (Código: ${error.code})`
      };
    }

    console.log('✅ Lead salvo com sucesso no Supabase! ID:', data.id);
    console.log('📧 Email será enviado automaticamente pelo trigger do banco');

    return {
      success: true,
      data
    };
  } catch (error: any) {
    console.error('❌ Erro inesperado ao salvar lead:', error)

    // Se for timeout, retorna erro específico
    if (error.message.includes('Timeout')) {
      return {
        success: false,
        error: 'Timeout: Conexão lenta com banco de dados'
      }
    }

    return {
      success: false,
      error: `Erro inesperado: ${error.message}`
    }
  }
}

// Função para listar leads (para dashboard futuro)
export async function getLeads(limit = 50): Promise<{ success: boolean; data?: Lead[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Função para atualizar status do lead
export async function updateLeadStatus(
  leadId: number,
  status: Lead['status'],
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: Partial<Lead> = { status }
    if (notes) updateData.notes = notes

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Função para testar conexão com Supabase
export async function testSupabaseConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🔗 Testando conexão com Supabase...');

    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Teste de conexão falhou:', error);
      return {
        success: false,
        error: `Conexão falhou: ${error.message}`
      };
    }

    console.log('✅ Conexão com Supabase funcionando!');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Erro no teste de conexão:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
