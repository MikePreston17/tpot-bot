## To deploy with vercel

Place the following in package.json > scripts
```
"deploy": "vercel --prod",
"start": "vercel dev"

```

## To deploy with Heroku

1. Remove the vercel start and deploy scripts
2. Add script "start": "node index.js" to package.json
3. `git push heroku master` in the CLI.