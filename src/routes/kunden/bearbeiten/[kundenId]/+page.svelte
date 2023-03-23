<script>
	import { enhance } from "$app/forms";
	import { P, Button, Input, Label, Helper, Select } from "flowbite-svelte";

	let selected;
	let anreden = [
		{ value: "Herr", name: "Herr" },
		{ value: "Frau", name: "Frau" }
	];

	export let data;
	$: ({ kunde } = data);
</script>

<div class="py-8">
	<div class="grid grid-cols-1 gap-0">
		<div class="col-start-1 col-span-1">
			<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Kundendaten bearbeiten</P>
		</div>
	</div>

	<form class="py-8" action="?/updateKunde" method="POST" use:enhance>
		<div class="grid gap-6 mb-6 md:grid-cols-3">
			<div class="col-start-1 col-span-1">
				<Label for="firma" class="mb-2">Firma</Label>
				<Input type="text" id="firma" name="firma" placeholder="Bau GmbH" value={kunde.firma} />
				<Helper class="text-sm">Nur wenn der Kunde eine Firma ist.</Helper>
			</div>
			<div class="col-start-1 col-span-1">
				<Label
					>Anrede auswählen...
					<Select class="mt-2" name="anrede" items={anreden} bind:value={kunde.anrede} />
				</Label>
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="vorname" class="mb-2">Vorname</Label>
				<Input type="text" id="vorname" name="vorname" placeholder="Max" value={kunde.vorname} required />
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="nachname" class="mb-2">Nachname</Label>
				<Input type="text" id="nachname" name="nachname" placeholder="Mustermann" value={kunde.nachname} required />
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="adresse" class="mb-2">Straße</Label>
				<Input type="text" id="adresse" name="adresse" placeholder="Musterstraße 1" value={kunde.adresse} required />
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="ort" class="mb-2">PLZ Ort</Label>
				<Input type="text" id="ort" name="ort" placeholder="12345 Musterstadt" value={kunde.ort} required />
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="mobil" class="mb-2">Telefon Mobil</Label>
				<Input type="text" id="mobil" name="mobil" placeholder="+49 171 12345678" value={kunde.mobil} />
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="email" class="mb-2">Email</Label>
				<Input type="email" id="email" name="email" placeholder="john.doe@company.com" value={kunde.email} required />
			</div>
		</div>

		<Button type="submit">Speichern</Button>
		<Button class="ml-4" color="light" href={`/kunden/details/${kunde.id}`}>Abbrechen</Button>
	</form>
</div>
