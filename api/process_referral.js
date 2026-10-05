export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { referrer_id, new_user } = req.body;
    
    // Grabs the Bot Token you added in Vercel Environment Variables
    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!BOT_TOKEN) {
        return res.status(500).json({ error: 'BOT_TOKEN missing on server.' });
    }

    try {
        // The message sent to the referrer
        const messageText = `🎉 <b>New Referral Joined!</b>\n\n👤 <b>${new_user.first_name || 'User'}</b> successfully registered using your link.\n\nYou will earn lifetime commission from their earnings!`;
        
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: referrer_id,
                text: messageText,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [[{ 
                        text: "👥 View Referrals", 
                        // Updated to your actual Bot Username
                        url: "https://t.me/okhygevwvanakdh_bot/TeleShortLink" 
                    }]]
                }
            })
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Referral Notification Error:", error);
        res.status(500).json({ error: error.message });
    }
}
