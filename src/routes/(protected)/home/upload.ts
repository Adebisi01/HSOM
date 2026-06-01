import { Files } from 'files-sdk';
import { backblazeB2 } from 'files-sdk/backblaze-b2';

export const files = async () => {
	const files = new Files({
		adapter: backblazeB2({
			bucket: 'HWAC-bucket',
			region: 'us-east-005',
			accessKeyId: '005bdcfd91543ba0000000001',
			secretAccessKey: 'K005KXpmvcisD2Nfqi//HFf1aI15X1Y'
			// or "us-east-005", "eu-central-003", ...
			// accessKeyId / secretAccessKey auto-loaded from
			// B2_APPLICATION_KEY_ID / B2_APPLICATION_KEY
		})
	});
	const res = await files.upload('./favicon.svg', './favicon.svg', { contentType: 'image/svg' });
	console.log(res);
};
