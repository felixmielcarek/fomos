# FOMOS

/!\ WIP /!\

## Context

The FOMOS platform aims to offer scripts to automate the processing of music playlists. Each user can enable/disable the scripts they want and customize the script settings. Eventually, users will be able to suggest script ideas to add to FOMOS.

## Technical documentation

Stack technique Fomos :

Frontend : Next.js (framework web pour app en React)
Backend/API : Next.js (avec la fonction App Router)
Auth (connexion, déco, création compte...) : bcrypt (hash mdp) et JWT (gestion token)
Auth middleware (vérifie validité du token de connexion à chaque page) : JWT
BDD/ORM : Prisma (pour utiliser facilement Postgres en web)

Architecture :

fomos/
│
├── prisma/
│   └── schema.prisma          # Modèle de base de données
│
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Layout racine
│   │   ├── page.tsx           # Page d'accueil
│   │
│   │   ├── login/
│   │   │   └── page.tsx       # Page de connexion (front)
│   │
│   │   ├── register/
│   │   │   └── page.tsx       # Page d'inscription (front)
│   │
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Page protégée après login
│   │
│   │   └── api/
│   │       ├── login/
│   │       │   └── route.ts   # API login (POST)
│   │       ├── register/
│   │       │   └── route.ts   # API register (POST)
│   │       └── protected/
│   │           └── route.ts   # Exemple d’API protégée (GET)
│
│   ├── lib/
│   │   ├── prisma.ts          # Instance unique Prisma
│   │   ├── auth.ts            # Fonctions JWT (sign/verify)
│   │   └── hash.ts            # Bcrypt utils (optionnel)
│
│   ├── middleware.ts          # Auth middleware (JWT, cookies)
│
│   └── styles/                # Tes fichiers CSS si besoin
│       └── globals.css
│
├── .env                       # Secrets (base, JWT, etc.)
├── package.json
├── next.config.js
└── tsconfig.json

## Useful commands for development

* Lancer DB sur docker
docker run --name fomos-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres

* Générer le shema prisma depuis l'app vers la DB
npx prisma generate

* Lancer app Next.js
npm run dev

# Next.js README

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
