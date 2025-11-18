# Database Schema Setup

## Setup Instructions

1. **Create Database in Supabase**

   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the `schema.sql` file

2. **Seed Sample Data (Optional)**

   - Run the `seed.sql` file to add sample subjects and classes

3. **Create Initial Admin User**
   ```sql
   -- First, create a user in Supabase Auth (via dashboard or API)
   -- Then insert into users table:
   INSERT INTO public.users (id, email, full_name, role)
   VALUES (
     'uuid-from-auth-users',
     'admin@school.com',
     'Admin User',
     'admin'
   );
   ```

## Database Structure

### Core Tables

- **users**: Base user table (extends Supabase auth)
- **students**: Student-specific information
- **teachers**: Teacher-specific information
- **classes**: Grade levels and sections
- **subjects**: Academic subjects

### Academic Tables

- **class_subjects**: Links classes with subjects and teachers
- **student_enrollments**: Student class enrollments
- **grades**: Student marks and grades
- **attendance**: Daily attendance records
- **timetable**: Class schedules

### Other Tables

- **news**: Announcements and news
- **fees**: Fee management

## Row Level Security (RLS)

All tables have RLS enabled with policies:

- **Students**: Can view own data
- **Teachers**: Can view students and manage grades
- **Admins**: Full access to all data

## Relationships

```
users (1) -> (1) students
users (1) -> (1) teachers
classes (1) -> (many) student_enrollments
students (1) -> (many) student_enrollments
students (1) -> (many) grades
subjects (1) -> (many) grades
teachers (1) -> (many) class_subjects
```
