<script>
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	/** @type {HTMLInputElement | undefined} */
	let fileInputEl = $state(undefined);
	let uploading = $state(false);
	let uploadStatus = $state('');
	let listing = $state(false);
	/** @type {{ prefix: string; count: number; keys: { key: string; size: number }[] } | null} */
	let driveList = $state(null);

	async function refreshDriveList() {
		listing = true;
		driveList = null;
		try {
			const res = await fetch(resolve('/drive/list?prefix=uploads/&limit=50'));
			const body = await res.json().catch(() => ({}));
			if (!res.ok) {
				toast.error(typeof body?.error === 'string' ? body.error : `List failed (${res.status})`);
				return;
			}
			driveList = {
				prefix: body.prefix ?? '',
				count: body.count ?? 0,
				keys: Array.isArray(body.keys) ? body.keys : []
			};
			toast.success(`B2 list: ${driveList.count} object(s) under prefix`);
		} catch (e) {
			toast.error('List failed');
			console.error(e);
		} finally {
			listing = false;
		}
	}

	async function uploadSelectedFile() {
		const input = fileInputEl;
		if (!input?.files?.length) {
			toast.error('Choose a file first');
			return;
		}
		const file = input.files[0];
		uploading = true;
		uploadStatus = '';
		try {
			const safeName = file.name.replace(/[^\w.-]+/g, '_');
			const key = `uploads/${Date.now()}-${safeName}`;
			const fd = new FormData();
			fd.append('file', file);
			fd.append('key', key);
			const res = await fetch(resolve('/upload/direct'), { method: 'POST', body: fd });
			const body = await res.json().catch(() => ({}));
			if (!res.ok) {
				const msg = typeof body?.error === 'string' ? body.error : `Upload failed (${res.status})`;
				toast.error(msg);
				uploadStatus = msg;
			} else {
				toast.success(`Uploaded: ${body.key}`);
				uploadStatus = `Uploaded: ${body.key}`;
				input.value = '';
				await refreshDriveList();
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			toast.error('Upload failed');
			uploadStatus = msg;
		} finally {
			uploading = false;
		}
	}
</script>

<div class="flex max-w-lg flex-col gap-6 p-4">
	<div class="flex flex-wrap gap-2">
		<Button
			onclick={async () => {
				const res = await authClient.signOut();
				console.log(res);
				invalidateAll();
			}}
		>
			Sign Out
		</Button>
		<Button
			variant="outline"
			onclick={async () => {
				try {
					const svg = '<svg xmlns="http://www.w3.org/2000/svg"/>';
					const blob = new Blob([svg], { type: 'image/svg+xml' });
					const fd = new FormData();
					fd.append('file', blob, 'favicon.svg');
					fd.append('key', 'favicon.svg');
					const res = await fetch(resolve('/upload/direct'), {
						method: 'POST',
						body: fd
					});
					const body = await res.json().catch(() => ({}));
					if (!res.ok) {
						toast.error(typeof body?.error === 'string' ? body.error : `Quick test failed (${res.status})`);
					} else {
						toast.success(`Quick test OK: ${body.key}`);
					}
				} catch (error) {
					toast.error('Quick test failed');
					console.log(error);
				}
			}}
		>
			Quick SVG test
		</Button>
		<Button
			variant="secondary"
			onclick={async () => {
				const res = await fetch('/send', {
					method: 'POST',
					body: JSON.stringify({
						to: 'oluwafemiadebisi01@gmail.com',
						subject: 'Verify your email 😁',
						html: `<p>Click <a href="https://www.google.com">here</a> to verify your email.</p>`
					})
				});
				console.log(res);
			}}>Send mail</Button
		>
	</div>

	<h1 class="text-xl font-semibold">Home</h1>

	<div class="flex flex-col gap-3 rounded-lg border border-dashed border-muted-foreground/40 bg-muted/20 p-4">
		<h2 class="text-sm font-medium text-foreground">Heph Drive upload</h2>
		<p class="text-xs text-muted-foreground">
			Files go to your B2 bucket under <code class="rounded bg-muted px-1">uploads/&lt;timestamp&gt;-&lt;filename&gt;</code> via
			<code class="rounded bg-muted px-1">/upload/direct</code>.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<input
				bind:this={fileInputEl}
				type="file"
				class="max-w-full cursor-pointer text-sm file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
			/>
			<Button onclick={uploadSelectedFile} disabled={uploading}>
				{uploading ? 'Uploading…' : 'Upload to drive'}
			</Button>
		</div>
		{#if uploadStatus}
			<p class="break-all text-xs text-muted-foreground">{uploadStatus}</p>
		{/if}
		<div class="flex flex-col gap-2 border-t border-border pt-3">
			<p class="text-xs text-muted-foreground">
				Confirms objects in your Backblaze bucket via the same SDK as upload (not the browser).
			</p>
			<Button variant="outline" size="sm" class="w-fit" onclick={refreshDriveList} disabled={listing}>
				{listing ? 'Listing…' : 'List uploads/ in B2'}
			</Button>
			{#if driveList}
				<p class="text-xs font-medium text-foreground">
					Prefix <code class="rounded bg-muted px-1">{driveList.prefix || '(root)'}</code> — {driveList.count} shown
				</p>
				<ul class="max-h-48 list-inside list-disc overflow-y-auto text-xs text-muted-foreground">
					{#each driveList.keys as row}
						<li class="break-all"><span class="font-mono text-foreground">{row.key}</span> ({row.size} bytes)</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
