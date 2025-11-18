-- Step 1: Create user in Supabase Auth first (via dashboard or signUp API)
-- Step 2: Insert admin record in users table

INSERT INTO public.users (email, full_name, role, extra)
VALUES (
  'admin@school.com',
  'System Administrator',
  'admin',
  '{"employee_id": "ADM001"}'::jsonb
)
ON CONFLICT (email) DO UPDATE
SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Create sample teacher
INSERT INTO public.users (email, full_name, role, phone, extra)
VALUES (
  'teacher@school.com',
  'John Teacher',
  'teacher',
  '+1234567890',
  '{"teacher_id": "TCH001", "subject": "Mathematics"}'::jsonb
)
ON CONFLICT (email) DO UPDATE
SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Create sample student
INSERT INTO public.users (email, full_name, role, phone, extra)
VALUES (
  'student@school.com',
  'Jane Student',
  'student',
  '+1234567891',
  '{"student_id": "STU001", "grade": "10"}'::jsonb
)
ON CONFLICT (email) DO UPDATE
SET 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();
