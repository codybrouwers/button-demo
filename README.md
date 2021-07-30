# FlipGive's Web Monorepo

## Apps

- FlipGive Budget (/projects/budget)
- FlipGive Funding (/projects/funding)
- FlipGive App (/projects/app)
- FlipGive Marketing (/projects/marketing)
- FlipGive Auth (/projects/auth)
- FlipGive @shared (/projects/@shared)

### Vercel Ignore Build Step command

`git diff HEAD^ HEAD --quiet -- '../../*.js' '../../*.lock' '.' '../@shared' ':!*.stories.tsx'`

## Authenticating Locally

If you'd like to skip the typical auth flow, visiting `/api/auth/loginas?user_id=10` on Budget, Funding, and App will authenticate you as that user without having to use the Auth app. This only works in `development` and `staging` environments.

If you add `DEVELOPMENT_USER_ID="10"` to your local env file you can avoid passing `?user_id=10` to the URL.
