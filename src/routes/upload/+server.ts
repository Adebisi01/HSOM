import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const POST = async () => {
	try {
		const s3 = new S3Client({
			endpoint: 'https://s3.us-east-005.backblazeb2.com', // your bucket's endpoint
			region: 'us-east-005', // 2nd segment of endpoint
			credentials: {
				accessKeyId: 'bdcfd91543ba', // Backblaze App Key ID
				secretAccessKey: '0052d2bbc74b6443b402b465ab4cc2aeb382f045d4' // Backblaze Application Key
			}
		});

		async function getUploadSignedUrl(bucketName: string, fileName: string, contentType: string) {
			const command = new PutObjectCommand({
				Bucket: bucketName,
				Key: fileName,
				ContentType: contentType
			});

			const signedUrl = await getSignedUrl(s3, command, {
				expiresIn: 3600 // URL valid for 1 hour (max is 604800 = 1 week)
			});

			return signedUrl;
		}

		// Example usage
		const url = await getUploadSignedUrl('HWAC-bucket', 'favicon.svg', 'image/svg');
		console.log('Upload to this URL:', url);
		return Response.json({ url });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
};
