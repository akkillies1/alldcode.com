# 🚨 Supabase Auth "Database error querying schema" - Fix Guide

## Problem
- PIN validation works ✅
- Email/password login fails with "Database error querying schema" ❌
- Error: `pbospdlhrabxlstoawaq.supabase.co/auth/v1/token?grant_type=password:1 Failed to load resource: the server responded with a status of 500`

## Root Causes
This error typically means your Supabase project's database schema is corrupted or not properly initialized.

## 🔧 Step-by-Step Fix

### Step 1: Check Supabase Project Status
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `pbospdlhrabxlstoawaq`
3. Check **Project Settings** → **General**
   - Status should be **"Active"** (not paused)
   - Database should be **"Healthy"**

### Step 2: Reset Database (⚠️ DELETES ALL DATA)
**This will delete all your data - backup if needed!**

1. Go to **Settings** → **Database**
2. Scroll to **Danger Zone**
3. Click **"Reset Database"** (red button)
4. Wait for completion (5-10 minutes)
5. **Don't close the tab**

### Step 3: Reinitialize Database
After reset completes:

1. Go to **SQL Editor**
2. Copy the entire contents of `supabase_complete_schema.sql`
3. Paste into SQL Editor
4. Click **"Run"**

This will recreate:
- ✅ All tables (gallery_images, testimonials, blog_posts, leads)
- ✅ RLS policies
- ✅ Storage buckets
- ✅ Functions

### Step 4: Recreate Admin User
Run this SQL:

```sql
DO $$
DECLARE
    new_user_id UUID;
BEGIN
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_user_meta_data
    ) VALUES (
        '00000000-0000-0000-0000-000000000000'::uuid,
        gen_random_uuid(), 'authenticated', 'authenticated',
        'dcodeakhil@gmail.com',
        crypt('Koovackal@26', gen_salt('bf')),
        NOW(), NOW(), NOW(),
        '{"is_admin": true}'::jsonb
    )
    RETURNING id INTO new_user_id;
END $$;

-- Verify
SELECT id, email, raw_user_meta_data FROM auth.users
WHERE email = 'dcodeakhil@gmail.com';
```

### Step 5: Set Edge Function Secrets
Go to **Edge Functions** → **Secrets**:

```
ADMIN_ACCESS_PIN = [your PIN, e.g., 1234]
BREVO_API_KEY = [your Brevo API key]
BREVO_SENDER_EMAIL = dcodeakhil@gmail.com
CONTACT_FORM_RECIPIENT = dcodeakhil@gmail.com
```

### Step 6: Disable JWT Verification
For each Edge Function:
1. Click the function
2. Settings → Turn **"Verify JWT"** **OFF**
3. Save

### Step 7: Test Everything

1. **Admin Login:**
   - URL: `https://your-domain.vercel.app/admin/login`
   - PIN: `[your PIN]`
   - Email: `dcodeakhil@gmail.com`
   - Password: `Koovackal@26`

2. **Contact Form:**
   - Should save to database
   - Should send email

## 🆘 Alternative: Check Current Database State

Run this SQL first to diagnose:

```sql
-- Check database health
SELECT 'Database OK' as status;

-- Check auth schema
SELECT COUNT(*) as users FROM auth.users;

-- Check your tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Check your admin user
SELECT email, raw_user_meta_data FROM auth.users
WHERE email = 'dcodeakhil@gmail.com';
```

If these queries work, the database is OK. The issue might be:
- Environment variables in Vercel
- Browser cache
- Supabase service issues

## 🚨 Emergency Fix

If nothing works, create a **new Supabase project**:
1. Create new project
2. Update environment variables
3. Run the schema
4. Create admin user
5. Deploy

## 📞 Need Help?

After trying these steps, share:
1. Results of the diagnostic SQL queries
2. Supabase project status
3. Vercel deployment logs
4. Exact error messages

The database reset + schema re-run should fix this! 🔧</contents>
</xai:function_call<parameter name="file_path">SUPABASE_AUTH_FIX.md
