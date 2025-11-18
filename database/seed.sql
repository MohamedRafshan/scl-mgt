-- Insert sample admin user (You'll need to create this user in Supabase Auth first)
-- Then link it here with the correct UUID from auth.users

-- Sample subjects
INSERT INTO public.subjects (name, code, credits) VALUES
('Mathematics', 'MATH101', 4),
('English', 'ENG101', 3),
('Science', 'SCI101', 4),
('History', 'HIST101', 3),
('Computer Science', 'CS101', 3),
('Physical Education', 'PE101', 2);

-- Sample classes
INSERT INTO public.classes (name, grade_level, section, academic_year, capacity, room_number) VALUES
('Grade 10', 10, 'A', '2024-2025', 30, '101'),
('Grade 10', 10, 'B', '2024-2025', 30, '102'),
('Grade 9', 9, 'A', '2024-2025', 35, '201'),
('Grade 11', 11, 'A', '2024-2025', 28, '301');

-- Note: To add actual users, you need to:
-- 1. Create users in Supabase Auth (via Supabase dashboard or signUp)
-- 2. Then insert corresponding records in users, students, or teachers tables
