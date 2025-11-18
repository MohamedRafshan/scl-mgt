import { supabase } from './supabaseClient';

// Add this new function
export async function signUp(email: string, password: string, fullName: string, role: string = 'student') {
  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });

  if (authError) {
    console.error('Sign-up error:', authError);
    throw authError;
  }

  // Insert user data into custom users table
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      email: email,
      full_name: fullName,
      role: role
    });

  if (insertError) {
    console.error('User insert error:', insertError);
    throw new Error('Failed to create user profile');
  }

  return { user: authData.user, session: authData.session };
}

export async function signIn(email: string, password: string) {
  console.log(email, password);

  // First, authenticate with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
  

  if (error) {
    console.error('Sign-in error:', error);
    throw error;
  }

  return { 
    user: data.user, 
    session: data.session,
    userData : {role : "admin"} // Placeholder
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}


export async function getUserRole(userId?: string) {
  // If userId not provided, get current user
  if (!userId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new Error('No authenticated user');
    
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('email', user.email)
      .single();

    if (error) throw error;
    return data?.role;
  }

  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data?.role;
}

// Helper function to check if user has specific role
export async function checkUserRole(requiredRole: string | string[]) {
  const role = await getUserRole();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(role);
}
