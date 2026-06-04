import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const POST = async () => {
	const s3 = new S3Client({
		endpoint: 'https://s3.eu-central-003.backblazeb2.com', // must match your bucket’s cluster
		region: 'eu-central-003',
		credentials: {
			accessKeyId: 'YOUR_KEY_ID', // Backblaze App Key ID
			secretAccessKey: 'YOUR_APP_KEY' // Backblaze Application Key
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
	const url = await getUploadSignedUrl('HWAC-bucket', 'uploads/avatar.png', 'image/svg');
	console.log('Upload to this URL:', url);
};
