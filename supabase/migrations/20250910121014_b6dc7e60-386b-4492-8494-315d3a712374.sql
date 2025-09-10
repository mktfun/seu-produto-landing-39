-- Add email column to leads table
ALTER TABLE public.leads 
ADD COLUMN email TEXT NOT NULL DEFAULT '';

-- Update existing records to have empty email (temporary)
UPDATE public.leads SET email = '' WHERE email IS NULL;

-- Remove the default after updating existing records
ALTER TABLE public.leads ALTER COLUMN email DROP DEFAULT;