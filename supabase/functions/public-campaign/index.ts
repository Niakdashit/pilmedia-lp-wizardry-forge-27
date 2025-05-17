import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.pathname.split('/').pop();
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';

    if (!slug) {
      throw new Error('Campaign slug is required');
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Record analytics event
    const recordAnalytics = async (campaignId: string, eventType: string) => {
      const { error } = await supabase
        .from('campaign_analytics')
        .insert({
          campaign_id: campaignId,
          event_type: eventType,
          ip_address: clientIP
        });

      if (error) throw error;
    };

    // Handle GET request
    if (req.method === 'GET') {
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .select(`
          *,
          questions (*),
          form_fields (*)
        `)
        .eq('public_url', slug)
        .single();

      if (campaignError) throw campaignError;
      if (!campaign) throw new Error('Campaign not found');

      // Record page view
      await recordAnalytics(campaign.id, 'view');

      // Return campaign data
      return new Response(
        JSON.stringify(campaign),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Handle POST request for form submissions
    if (req.method === 'POST') {
      const { campaignId, formData, eventType } = await req.json();
      
      if (!campaignId) {
        throw new Error('Campaign ID is required');
      }

      // Record analytics event
      await recordAnalytics(campaignId, eventType || 'participation');

      // If form data is provided, save participation
      if (formData) {
        const { error: participationError } = await supabase
          .from('participations')
          .insert({
            campaign_id: campaignId,
            ...formData
          });

        if (participationError) throw participationError;

        // Update campaign participants count
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({ 
            participants: supabase.sql`participants + 1`,
            updated_at: new Date().toISOString()
          })
          .eq('id', campaignId);

        if (updateError) throw updateError;
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    throw new Error('Method not allowed');
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: error.message === 'Campaign not found' ? 404 : 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});