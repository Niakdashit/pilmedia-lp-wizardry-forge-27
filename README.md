# Leadya Marketing Builder

This project uses Vite to build the application.

## Setup

Install dependencies:

```bash
npm ci
```

This step installs Vite and all other dependencies. It must be run at least once
before building the project.

## Testing

Install dependencies and execute the test suite:

```bash
npm ci
npm test
```

## Brandfetch API key

Some parts of the application rely on the [Brandfetch](https://brandfetch.com/)
API. To use these features you must supply a valid `VITE_BRANDFETCH_KEY` in your
environment:

1. Create a Brandfetch account and generate an API key from your dashboard.
2. Copy the key into your `.env` file under the variable name
   `VITE_BRANDFETCH_KEY`.

The `.env.example` file already includes a placeholder for this variable which
you can use as a template.

## Supabase `quiz` function

The repository includes a Supabase Edge Function named `quiz` located under
`supabase/functions/quiz`. This function relies on the OpenAI API to generate
quiz content and therefore requires an `OPENAI_API_KEY` in your environment.

1. Obtain an OpenAI API key from your account dashboard.
2. Add the key to a `.env.local` file at the project root:

   ```bash
   OPENAI_API_KEY=your_key_here
   ```

With Supabase running locally, you can trigger the function by sending a POST
request to `/api/quiz`:

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"logoUrl":"...","desktopVisualUrl":"...","mobileVisualUrl":"...","websiteUrl":"...","productName":"..."}' \
     http://localhost:54321/functions/v1/quiz
```

When deployed, the same endpoint is available at `/api/quiz` on your Supabase
project.

## Build

To create a production build, run:

```bash
npm run build
```


## License

This project is licensed under the [MIT License](LICENSE).
