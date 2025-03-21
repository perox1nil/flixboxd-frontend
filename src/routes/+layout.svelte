<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<Toaster />

<QueryClientProvider client={queryClient}>
	<ModeWatcher />

	{@render children()}
	<SvelteQueryDevtools />
</QueryClientProvider>
