import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import OpenAI from 'npm:openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { logoUrl, desktopVisualUrl, mobileVisualUrl, websiteUrl, productName } = await req.json();

    const prompt = `G\u00e9n\u00e8re un jeu concours de type "Quiz Interactif" 100% pr\u00eat \u00e0 l'emploi, pour la marque suivante:\n- Nom du produit: ${productName}\n- Logo: ${logoUrl}\n- Visuel desktop: ${desktopVisualUrl}\n- Visuel mobile: ${mobileVisualUrl || '(utilise le desktop si vide)'}\n- URL du site: ${websiteUrl}\n\nContraintes:\n- G\u00e9n\u00e8re 5 questions quiz pertinentes (avec r\u00e9ponses) en lien avec la marque/produit (utilise le site si fourni)\n- G\u00e9n\u00e8re wording d'intro, description courte, CTA, textes erreur/succ\u00e8s, tout en gardant un ton marketing/conversion\n- Format JSON structuré :\n{\n  "intro": "",\n  "cta": "",\n  "questions": [\n    { "question": "", "choices": ["", "", ""], "answer": "" }\n  ],\n  "errorText": "",\n  "successText": ""\n}\n- N'invente pas de visuel ou d'image, utilise uniquement ce qui a \u00e9t\u00e9 upload\u00e9\n- Ne cr\u00e9e jamais de champ de texte libre pour l'utilisateur final, ni de prompt \u00e0 compl\u00e9ter.`;

    const openai = new OpenAI({ apiKey: Deno.env.get('OPENAI_API_KEY') });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const content = completion.choices[0].message?.content || '{}';
    const data = JSON.parse(content);

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
