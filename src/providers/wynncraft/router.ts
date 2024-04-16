import {fetchData, render} from './index';
import {RouterType} from 'itty-router';

export default function attach(router: RouterType) {
	router.get('/wynncraft/:id', async ({ params }) => {
		return new Response(
			render(await fetchData(params.id)),
			{
				headers: {
					'content-type': 'image/svg+xml'
				}
			}
		)
	});

	router.get('/wynncraft/skin/:id', async ({ params}) => {
		let res = await fetch(`https://visage.surgeplay.com/full/416/${params.id}?no=shadow`, {
			headers: {
				'user-agent': 'renos/0.0.1 (https://github.com/AlphaNecron/renos)'
			}
		});
		let { readable, writable } = new TransformStream();
		if (!res.body) return new Response('Not found!', { status: 404 });
		res.body.pipeTo(writable);
		return new Response(readable, {
			status: res.status
		});
	});

	router.get('/wynncraft/resource/*', async req => {
		const url = new URL(req.url);
		const target = new URL(`/nextgen/${url.pathname.replace('/wynncraft/resource/', '')}`, 'https://cdn.wynncraft.com');
		target.search = url.search;
		let res = await fetch(target, {
			headers: {
				'user-agent': 'renos/0.0.1 (https://github.com/AlphaNecron/renos)'
			}
		});
		let { readable, writable } = new TransformStream();
		if (!res.body) return new Response('Not found!', { status: 404 });
		res.body.pipeTo(writable);
		return new Response(readable, {
			status: res.status
		});
	});
}
