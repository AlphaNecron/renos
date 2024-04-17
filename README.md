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
[ ] Enforce a more aggressive caching policy as Wynncraft API only allows 750 requests per 30 minutes.  
[ ] Transform all remote images to inline base64 ones (thanks GitHub for forcing images to route through `camo`, no one literally asked)  
[ ] Support LoL and Hypixel stats.
