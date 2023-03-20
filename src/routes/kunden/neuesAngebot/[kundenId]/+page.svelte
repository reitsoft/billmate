<script>
	import { P, Button, Input, Label, Helper, Select } from "flowbite-svelte";

	export let data;
	$: ({ kunde } = data);
</script>

<div class="py-8">
	<div class="grid grid-cols-12 gap-0">
		<div class="col-start-1 col-span-8">
			<P size="xl" height="relaxed" class="max-w-lg" weight="semibold">Neues Angebot</P>
		</div>
		{kunde.firma}
	</div>
</div>
