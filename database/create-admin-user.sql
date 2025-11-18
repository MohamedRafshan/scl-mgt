-- Insert the user into your custom users table
INSERT INTO public.users (email, full_name, role)
VALUES (
  'raf@gmail.com',
  'Raf Admin',
  'admin'
)
ON CONFLICT (email) DO UPDATE
SET 
  role = EXCLUDED.role,
  updated_at = NOW();
