import apiRouter from './router';
import {getAssetFromKV} from '@cloudflare/kv-asset-handler';

// @ts-ignore
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
	async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
		try {
			return await getAssetFromKV(
				{
					request,
					waitUntil: ctx.waitUntil.bind(ctx)
				},
				{
					// @ts-ignore
					ASSET_NAMESPACE: env.__STATIC_CONTENT,
					ASSET_MANIFEST: assetManifest
				}
			);
		} catch {
			return apiRouter.handle(request);
		}
	}
};
