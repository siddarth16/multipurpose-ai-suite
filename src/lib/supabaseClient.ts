// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zthwutukjuswyjwhuiqf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0aHd1dHVranVzd3lqd2h1aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDg4NDQsImV4cCI6MjA2NTk4NDg0NH0.pyMaMOMvJxGJWmTRH2tEQi2zpAVgne1X-vdRoNUDOkM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper type
export type UserSignupData = {
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string
  country: string
}

// src/pages/auth/signup.tsx
import { useState } from 'react'
import { supabase, UserSignupData } from '@/lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const [formData, setFormData] = useState<UserSignupData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    country: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async () => {
    setError('')
    const { email, password, ...meta } = formData
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) return setError(error.message)

    // Save metadata in user_data
    const userId = data.user?.id
    if (userId) {
      const { error: metaError } = await supabase.from('user_data').insert([
        {
          user_id: userId,
          ...meta,
        },
      ])
      if (metaError) return setError(metaError.message)
    }

    navigate('/tools')
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <input name="first_name" onChange={handleChange} value={formData.first_name} placeholder="First Name" className="input" />
      <input name="last_name" onChange={handleChange} value={formData.last_name} placeholder="Last Name" className="input" />
      <input name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="input" />
      <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" className="input" />
      <input name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone Number" className="input" />
      <input name="country" onChange={handleChange} value={formData.country} placeholder="Country" className="input" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSignup} className="btn">Create Account</button>
    </div>
  )
}

// src/pages/auth/login.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    navigate('/tools')
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="input" />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin} className="btn">Sign In</button>
    </div>
  )
}
