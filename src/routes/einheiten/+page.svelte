<script>
	import { P, Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
	export let data;
	$: ({ einheiten } = data);
</script>

<div class="p-8">
	<div class="grid grid-cols-12 gap-0">
		<div class="col-start-1 col-span-12">
			<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Einheiten</P>
		</div>
		<div class="col-start-1 col-span-8">
			{#each einheiten as einheit}
				{einheit.bezeichnung} - {einheit.abkuerzung} <br />
			{/each}
		</div>
		<div class="col-span-3 col-start-10">
			<Card>
				<form class="flex flex-col space-y-6" action="?/createEinheit" method="POST">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Neue Einheit hinzufügen</h3>
					<Label class="space-y-2">
						<span>Bezeichnung</span>
						<Input type="text" name="bezeichnung" placeholder="Kilogramm" required />
					</Label>
					<Label class="space-y-2">
						<span>Abkürzung</span>
						<Input type="text" name="abkuerzung" placeholder="kg" required />
					</Label>
					<Button type="submit" class="w-full">Speichern</Button>
				</form>
			</Card>
		</div>
	</div>
</div>
