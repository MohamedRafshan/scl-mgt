-- Website News table
CREATE TABLE public.website_news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Teachers/Faculty table
CREATE TABLE public.website_teachers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  subject TEXT NOT NULL,
  quote TEXT,
  experience TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Academic Programs table
CREATE TABLE public.website_programs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  grade_range TEXT NOT NULL,
  description TEXT NOT NULL,
  subjects TEXT[], -- Array of subjects
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website Settings table
CREATE TABLE public.website_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO public.website_settings (setting_key, setting_value) VALUES
('school_info', '{
  "name": "Excellence School",
  "motto": "Empowering students to reach their full potential",
  "description": "Quality education through innovative teaching methods and a nurturing environment",
  "established": "1990",
  "students": "1200+",
  "teachers": "80+",
  "programs": "15+",
  "success_rate": "98%"
}'::jsonb),
('contact_info', '{
  "address": "123 Education Street, Learning City, LC 12345",
  "phone": ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  "email": ["info@excellenceschool.edu", "admissions@excellenceschool.edu"],
  "office_hours": "Monday - Friday: 8:00 AM - 4:00 PM, Saturday: 9:00 AM - 1:00 PM"
}'::jsonb);

-- Enable RLS
ALTER TABLE public.website_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Everyone can view published content
CREATE POLICY "Everyone can view published news" ON public.website_news
  FOR SELECT USING (published = true);

CREATE POLICY "Everyone can view active teachers" ON public.website_teachers
  FOR SELECT USING (active = true);

CREATE POLICY "Everyone can view active programs" ON public.website_programs
  FOR SELECT USING (active = true);

CREATE POLICY "Everyone can view settings" ON public.website_settings
  FOR SELECT USING (true);

-- Admin can manage all content
CREATE POLICY "Admins can manage news" ON public.website_news
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage teachers" ON public.website_teachers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage programs" ON public.website_programs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage settings" ON public.website_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Indexes
CREATE INDEX idx_website_news_published ON public.website_news(published, published_date DESC);
CREATE INDEX idx_website_teachers_active ON public.website_teachers(active, display_order);
CREATE INDEX idx_website_programs_active ON public.website_programs(active, display_order);

-- Triggers for updated_at
CREATE TRIGGER update_website_news_updated_at BEFORE UPDATE ON public.website_news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_teachers_updated_at BEFORE UPDATE ON public.website_teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_programs_updated_at BEFORE UPDATE ON public.website_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_settings_updated_at BEFORE UPDATE ON public.website_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
