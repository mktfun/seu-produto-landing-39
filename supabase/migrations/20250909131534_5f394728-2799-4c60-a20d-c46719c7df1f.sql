-- Criar política RLS para permitir inserção pública na tabela leads
CREATE POLICY "Allow public insert on leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Permitir SELECT público também para possível consulta
CREATE POLICY "Allow public select on leads" 
ON public.leads 
FOR SELECT 
USING (true);