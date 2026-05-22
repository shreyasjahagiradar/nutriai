import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhmtszivlfmfrpoabcms.supabase.co'
const supabaseKey = 'sb_publishable_AjOr-K1JzyO0A80QwhRXOw_7GuZcOL3'

export const supabase = createClient(supabaseUrl, supabaseKey)