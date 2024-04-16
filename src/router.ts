import {Router} from 'itty-router';
import attach from './providers/wynncraft/router';

const router = Router();

// router.get('/lol/:region/:name', () => {});

attach(router);

// router.post('/hypixel/:uuid', async (request) => {
// });

router.all('*', () => new Response('Not found!', { status: 404 }));

export default router;
