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
- [ ] Transform all remote images into inlined base64 ones (thanks GitHub for forcing images to route through `camo`, no
  one literally asked for that shitty feature)
- [ ] Support LoL and Hypixel stats.

### Resources
- Sprites, icons and API from [Wynncraft](https://wynncraft.com).
- Skin rendering API from [Visage](https://visage.surgeplay.com).
- Minecraft font from [Fontspace](https://www.fontspace.com/minecraft-font-f28180).

### Demo instance: `https://renos.andev.workers.dev`

Usage: `https://renos.andev.workers.dev/wynncraft/<username>`

[![OishiSnackTomCay](https://renos.andev.workers.dev/wynncraft/oishisnacktomcay)](https://renos.andev.workers.dev/wynncraft/oishisnacktomcay)

#### The above preview is currently broken due to GitHub blocking remote URLs (CSP), try using a SVG -> PNG converter if you want to embed this SVG.

> [!IMPORTANT]
> Caveat: This app acts as a proxy to serve static data from Wynncraft CDN and other services to avoid non-same origin blocker so the traffic can be far from expected, not sure whether this is an effective approach, but it should negotiate some restrictions of browsers lol.
