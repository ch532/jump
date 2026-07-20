// Import the client
const supabase = require('./db');

// The tracking function
async function trackEvent(id, type) {
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
        console.log(`${type} updated for ad ${id}`);
    }
}

// Export functions so other parts of your site can use them
module.exports = { trackEvent };
