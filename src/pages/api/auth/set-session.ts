import { supabase } from 'libs/supabase'

export default function handler(req: any, res: any) {
  supabase.auth.api.setAuthCookie(req, res)
}
