import { supabase } from '../lib/supabaseClient';

async function createAdmin() {
  const email = 'raf@gmail.com';
  const password = '2001'; // Change to a stronger password in production
  
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined, // Skip email confirmation
    }
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }

  console.log('User created in Auth:', authData.user?.id);

  // 2. Insert into custom users table
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      email: email,
      full_name: 'Raf Admin',
      role: 'admin'
    });

  if (insertError) {
    console.error('Insert error:', insertError);
    return;
  }

  console.log('✅ Admin user created successfully!');
  console.log('Email:', email);
  console.log('Password:', password);
}

createAdmin();
