
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const body = await req.json();

    // Récupération et fallback propre des valeurs envoyées par le front
    const {
      logoUrl = "",
      desktopVisualUrl = "",
      mobileVisualUrl = "",
      websiteUrl = "",
      productName = "",
      manualContent = ""
    } = body || {};

    // --- PROMPT GPT-4o PERSONNALISÉ ---
    const gptPrompt = `
Tu es un expert en gamification et en génération de quiz pédagogiques pour les marques.  

OBJECTIF :
Génère pour moi un quiz interactif à choix multiples pour tester la connaissance des utilisateurs sur le site et sa marque.

INFORMATIONS DE CONTEXTE (ta base d'inspiration, à utiliser au maximum) :
- Nom du produit/marque : ${productName || "inconnu"}
- URL du site : ${websiteUrl || "non communiqué"}
- (Facultatif) Contenu ou résumé fourni par l'utilisateur :
"""
${manualContent}
"""

- Logo : ${logoUrl}
- Visuel desktop : ${desktopVisualUrl}
- Visuel mobile : ${mobileVisualUrl}

TA TÂCHE :
- Si un résumé/contenu a été fourni, utilise-le en priorité pour créer tes questions.
- Sinon, inspire-toi du nom de la marque et/ou de l’URL pour déduire la thématique et générer un quiz pertinent ou générique.
- Crée 3 à 5 questions de type QCM adaptées au public du site.
- Diversifie la difficulté et le type de questions (générales, anecdotes, infos produits/services...).
- Si certaines infos sont absentes, adapte tes questions ou propose des questions génériques pertinentes.
- Formate ta réponse EN JSON STRICT (pas de texte autour) :
{
  "intro": "Phrase d’intro motivante adaptée à la marque et à la cible.",
  "cta": "Libellé du bouton pour lancer le quiz",
  "questions": [
    {
      "question": "Texte de la question",
      "choices": ["Choix n°1", "Choix n°2", "Choix n°3", "Choix n°4"],
      "answer": "Texte du choix correct"
    }
    ...
  ],
  "errorText": "Texte positif affiché en cas de mauvaise réponse",
  "successText": "Félicitations personnalisées"
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Tu es un assistant expert en gamification.' },
          { role: 'user', content: gptPrompt }
        ],
        temperature: 0.6,
        max_tokens: 1100
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Extraction du JSON dans le texte de réponse
    const data = await response.json();
    let quizJSON = null;
    try {
      const msg = data.choices?.[0]?.message?.content || "";
      const jsonMatch = msg.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        quizJSON = JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      quizJSON = null;
    }

    return new Response(JSON.stringify(quizJSON || {
      error: "Erreur lors du parsing du quiz généré. Voici la réponse brute de GPT-4o : " + (data.choices?.[0]?.message?.content || "")
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
