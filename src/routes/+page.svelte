<script>
	import { Alert, P } from "flowbite-svelte";
</script>

<div class="p-8">
	<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Start</P>
	<Alert border color="blue">
		<span slot="icon"
			><svg
				aria-hidden="true"
				class="w-10 h-10"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
					clip-rule="evenodd"
				/></svg
			>
		</span>
		<span class="text-lg font-medium">Info alert! Change a few things up and try submitting again.</span>
	</Alert>
</div>
