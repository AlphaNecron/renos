## renos
A handy app to show off your game stats, outputs SVG by default.

### Deployment

```sh
git clone https://github.com/AlphaNecron/renos.git --depth=1
cd renos
yarn install
wrangler deploy
```

### Todos
- [ ] Enforce a more aggressive caching policy as Wynncraft API only allows 750 requests per 30 minutes.
- [ ] Transform all remote images into inlined base64 ones (thanks GitHub for forcing images to route through `camo`, no one literally asked for that shitty feature)
- [ ] Support LoL and Hypixel stats.

### Demo instance: `https://renos.andev.workers.dev`
Usage: `https://renos.andev.workers.dev/wynncraft/<username>`


[![OishiSnackTomCay](https://renos.andev.workers.dev/wynncraft/oishisnacktomcay)](https://renos.andev.workers.dev/wynncraft/oishisnacktomcay)
#### Above preview is currently broken due to GitHub blocking remote URLs (CSP), try using a SVG -> PNG converter if you want to embed this SVG.
