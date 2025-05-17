/*
  # Add public URL generation and campaign access

  1. New Functions
    - `set_public_url()`: Génère automatiquement une URL publique unique pour chaque campagne
  
  2. Changes
    - Ajout de la colonne `public_url` à la table `campaigns`
    - Création d'un trigger pour générer automatiquement l'URL publique
*/

-- Ajout de la colonne public_url si elle n'existe pas
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'campaigns' AND column_name = 'public_url'
  ) THEN
    ALTER TABLE campaigns ADD COLUMN public_url text;
    ALTER TABLE campaigns ADD CONSTRAINT campaigns_public_url_key UNIQUE (public_url);
  END IF;
END $$;

-- Fonction pour générer l'URL publique
CREATE OR REPLACE FUNCTION set_public_url()
RETURNS trigger AS $$
DECLARE
  base_chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER := 0;
  random_string TEXT;
BEGIN
  LOOP
    -- Générer une chaîne aléatoire de 12 caractères
    random_string := '';
    FOR i IN 1..12 LOOP
      random_string := random_string || substr(base_chars, floor(random() * length(base_chars) + 1)::integer, 1);
    END LOOP;
    
    -- Vérifier si l'URL est unique
    IF NOT EXISTS (SELECT 1 FROM campaigns WHERE public_url = random_string) THEN
      NEW.public_url := random_string;
      EXIT;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger pour générer automatiquement l'URL publique
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'ensure_campaign_public_url'
  ) THEN
    CREATE TRIGGER ensure_campaign_public_url
      BEFORE INSERT ON campaigns
      FOR EACH ROW
      EXECUTE FUNCTION set_public_url();
  END IF;
END $$;