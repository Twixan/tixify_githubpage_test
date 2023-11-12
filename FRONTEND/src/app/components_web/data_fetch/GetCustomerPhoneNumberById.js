import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://lvrpwceetvgdwpzjidxm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cnB3Y2VldHZnZHdwemppZHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NTUyMTksImV4cCI6MjAxNDMzMTIxOX0.rQFoU3Nxz_MXQz9qr0RvHKqQj3eQvjYcRzC6D349iqs'

const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY)

export async function GetCustomerPhoneNumberById(id) {
    console.log(id)
    const { data, error } = await supabase
    .from('active_tickets')
    .select('ticket_phone_number')
    .eq('ticket_event', id)

    if ( error ) throw error
    return data[0].ticket_phone_number
}