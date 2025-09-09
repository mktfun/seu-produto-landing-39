-- Remover política restritiva de SELECT e criar uma pública
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.leads;

-- Criar política pública de SELECT
CREATE POLICY "Allow public select on leads" 
ON public.leads 
FOR SELECT 
USING (true);