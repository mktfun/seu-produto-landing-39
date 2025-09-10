-- Adicionar coluna conversao na tabela leads
ALTER TABLE public.leads 
ADD COLUMN conversao text DEFAULT 'simulador_residencial' NOT NULL;