
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://cikptujrdfvxyfihwamh.supabase.co";
const SUPABASE_KEY = "sb_publishable_seQaFKa8TwHg7fVTK0GHIg_T0wT93_B";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSchema() {
    console.log("Checking table 'invitations'...");
    const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error fetching data:", error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log("Columns found in 'invitations':", Object.keys(data[0]));
    } else {
        console.log("Table is empty or no columns returned.");
    }
}

checkSchema();
