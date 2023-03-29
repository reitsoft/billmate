<script>
	import { P } from "flowbite-svelte";
	export let data;

	const { angebot } = data;
	console.log(angebot);
</script>

<div class="p-8">
	<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Neues Angebot</P>
</div>
{JSON.stringify(angebot)}
