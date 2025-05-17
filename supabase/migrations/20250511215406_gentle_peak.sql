/*
  # Create storage bucket for campaign assets

  1. Storage
    - Create a new bucket 'campaign-assets' for storing campaign images
    - Make the bucket public for reading campaign images
  
  2. Security
    - Allow public access for viewing files
    - Allow authenticated users to upload image files (jpg, jpeg, png, gif)
    - Allow users to manage their own uploaded files
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES (
  'campaign-assets',
  'campaign-assets',
  true
);

-- Set up security policies for the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'campaign-assets');

CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'campaign-assets' 
  AND (LOWER(RIGHT(name, 4)) IN ('.jpg', '.png', '.gif') 
    OR LOWER(RIGHT(name, 5)) = '.jpeg')
);

CREATE POLICY "Authenticated users can update their files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'campaign-assets' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'campaign-assets' AND auth.uid() = owner);

CREATE POLICY "Authenticated users can delete their files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'campaign-assets' AND auth.uid() = owner);