<script>
	import { enhance } from "$app/forms";
	import { P, Card, Button, Label, Input, Modal } from "flowbite-svelte";
	let updateModal = false;
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
				{einheit.bezeichnung} - {einheit.abkuerzung}
				<Button outline size="xs" on:click={() => (updateModal = true)}
					><svg
						aria-hidden="true"
						class="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						><path
							d="M1.172,19.119A4,4,0,0,0,0,21.947V24H2.053a4,4,0,0,0,2.828-1.172L18.224,9.485,14.515,5.776Z"
						/><path
							d="M23.145.855a2.622,2.622,0,0,0-3.71,0L15.929,4.362l3.709,3.709,3.507-3.506A2.622,2.622,0,0,0,23.145.855Z"
						/></svg
					></Button
				>
				<form method="POST" action="?/deleteEinheit&id={einheit.id}" use:enhance>
					<Button outline color="red" size="xs" type="submit">
						<svg
							aria-hidden="true"
							class="w-4 h-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							><polygon
								points="24.061 2.061 21.939 -0.061 12 9.879 2.061 -0.061 -0.061 2.061 9.879 12 -0.061 21.939 2.061 24.061 12 14.121 21.939 24.061 24.061 21.939 14.121 12 24.061 2.061"
							/></svg
						>
					</Button>
				</form>
				<br />
			{/each}
		</div>
		<div class="col-span-3 col-start-10">
			<Card>
				<form class="flex flex-col space-y-6" action="?/createEinheit" method="POST" use:enhance>
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

<Modal bind:open={updateModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Einheit bearbeiten</h3>
		<Label class="space-y-2">
			<span>Bezeichnung</span>
			<Input type="text" name="bezeichnung" required value="TEst" />
		</Label>
		<Label class="space-y-2">
			<span>Abkürzung</span>
			<Input type="text" name="abkuerzung" required value="test2" />
		</Label>
		<Button type="submit" class="w-full1">Speichern</Button>
	</form>
</Modal>
