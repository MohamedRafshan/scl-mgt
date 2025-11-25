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
  console.log("=== Sign In Start ===");
  console.log("Email:", email);
  console.log("====================");

  try {
    // First, authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("=== Auth Response ===");
    console.log("Error:", error);
    console.log("User:", data?.user?.email);
    console.log("Session:", !!data?.session);
    console.log("Access Token:", data?.session?.access_token ? "Present" : "Missing");
    console.log("====================");

    if (error) {
      console.error('Sign-in error:', error);
      throw error;
    }

    if (!data?.user) {
      throw new Error('Sign-in succeeded but no user was returned');
    }

    // Query by email instead of id since the users table uses email as reference
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('email', data.user.email)
      .maybeSingle();

    console.log("=== Profile Response ===");
    console.log("Profile:", profile);
    console.log("Profile Error:", profileError);
    console.log("=======================");

    // If profile doesn't exist, create it automatically
    if (!profile) {
      console.log("Profile not found, creating new profile...");
      
      const { data: newProfile, error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
          role: data.user.user_metadata?.role || 'admin'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Profile creation error:', insertError);
        // Don't throw error, just continue without profile
      }

      console.log("New profile created:", newProfile);

      return { 
        user: data.user, 
        session: data.session,
        userData: newProfile || { email: data.user.email, role: 'admin' }
      };
    }

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      // Don't throw, continue with basic user data
    }

    console.log("=== Sign In Complete ===");
    return { 
      user: data.user, 
      session: data.session,
      userData: profile || { email: data.user.email, role: 'admin' }
    };
  } catch (error) {
    console.error("=== Sign In Failed ===");
    console.error(error);
    throw error;
  }
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

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError);
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
    metadata: data.user.user_metadata,
    role: profile.role,
    full_name: profile.full_name,
  };
}
