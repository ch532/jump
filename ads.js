// Ensure you have initialized your supabase client (imported from db.js)
const supabase = require('./db'); 

async function trackEvent(id, type) {
    // Fetch current count and update it
    const { data, error } = await supabase
        .from('ad_data')
        .select(type)
        .eq('id', id)
        .single();

    if (!error) {
        const newCount = data[type] + 1;
        await supabase
            .from('ad_data')
            .update({ [type]: newCount })
            .eq('id', id);
    }
}
