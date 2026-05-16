
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://cikptujrdfvxyfihwamh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpa3B0dWpyZGZ2eHlmaWh3YW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDQzOTcsImV4cCI6MjA5NDQyMDM5N30.2nNLkbI_rhXxWDVVrMsXhMW1_Zg5dj4qZKCoA7hK6nY";
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
