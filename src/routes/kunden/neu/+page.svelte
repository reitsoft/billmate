<script>
	import { enhance } from "$app/forms";
	import { P, Button, Input, Label, Helper, Select } from "flowbite-svelte";

	let selected;
	let anreden = [
		{ value: "Herr", name: "Herr" },
		{ value: "Frau", name: "Frau" }
	];

	export let form;
	console.log(form);
</script>

<div class="py-8">
	<div class="grid grid-cols-1 gap-0">
		<div class="col-start-1 col-span-1">
			<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Neuer Kunde</P>
		</div>
	</div>

	<form class="py-8" action="?/createKunde" method="POST" novalidate use:enhance>
		<div class="grid gap-6 mb-6 md:grid-cols-3">
			<div class="col-start-1 col-span-1">
				<Label for="firma" color={form?.errors?.firma ? "red" : "base"} class="mb-2">Firma</Label>
				<Input
					type="text"
					id="firma"
					name="firma"
					placeholder="Bau GmbH"
					color={form?.errors?.firma ? "red" : "base"}
					value={form?.data?.firma ?? ""}
				/>
				<Helper class="text-sm">Nur wenn der Kunde eine Firma ist.</Helper>
				{#if form?.errors?.firma}
					<Helper class="mt-2" color="red">{form?.errors?.firma[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="anrede" color={form?.errors?.anrede ? "red" : "base"}>Anrede auswählen...</Label>
				<Select class="mt-2" id="anrede" name="anrede" items={anreden} bind:value={selected} />
				{#if form?.errors?.anrede}
					<Helper class="mt-2" color="red">{form?.errors?.anrede[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="vorname" color={form?.errors?.vorname ? "red" : "base"} class="mb-2">Vorname</Label>
				<Input
					type="text"
					id="vorname"
					name="vorname"
					placeholder="Max"
					color={form?.errors?.vorname ? "red" : "base"}
					value={form?.data?.vorname ?? ""}
					required
				/>
				{#if form?.errors?.vorname}
					<Helper class="mt-2" color="red">{form?.errors?.vorname[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="nachname" color={form?.errors?.nachname ? "red" : "base"} class="mb-2">Nachname</Label>
				<Input
					type="text"
					id="nachname"
					name="nachname"
					placeholder="Mustermann"
					color={form?.errors?.nachname ? "red" : "base"}
					value={form?.data?.nachname ?? ""}
					required
				/>
				{#if form?.errors?.nachname}
					<Helper class="mt-2" color="red">{form?.errors?.nachname[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="adresse" color={form?.errors?.adresse ? "red" : "base"} class="mb-2">Straße, Hausnr.</Label>
				<Input
					type="text"
					id="adresse"
					name="adresse"
					placeholder="Musterstraße 1"
					color={form?.errors?.adresse ? "red" : "base"}
					value={form?.data?.adresse ?? ""}
					required
				/>
				{#if form?.errors?.adresse}
					<Helper class="mt-2" color="red">{form?.errors?.adresse[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="ort" color={form?.errors?.ort ? "red" : "base"} class="mb-2">PLZ Ort</Label>
				<Input
					type="text"
					id="ort"
					name="ort"
					placeholder="12345 Musterstadt"
					color={form?.errors?.ort ? "red" : "base"}
					value={form?.data?.ort ?? ""}
					required
				/>
				{#if form?.errors?.ort}
					<Helper class="mt-2" color="red">{form?.errors?.ort[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-1 col-span-1">
				<Label for="mobil" color={form?.errors?.mobil ? "red" : "base"} class="mb-2">Telefon Mobil</Label>
				<Input
					type="text"
					id="mobil"
					name="mobil"
					placeholder="+49 171 12345678"
					color={form?.errors?.mobil ? "red" : "base"}
					value={form?.data?.mobil ?? ""}
				/>
				{#if form?.errors?.mobil}
					<Helper class="mt-2" color="red">{form?.errors?.mobil[0]}</Helper>
				{/if}
			</div>
			<div class="col-start-2 col-span-1">
				<Label for="email" color={form?.errors?.email ? "red" : "base"} class="mb-2">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="john.doe@company.com"
					color={form?.errors?.email ? "red" : "base"}
					value={form?.data?.email ?? ""}
					required
				/>
				{#if form?.errors?.email}
					<Helper class="mt-2" color="red">{form?.errors?.email[0]}</Helper>
				{/if}
			</div>
		</div>

		<Button type="submit">Speichern</Button>
		<Button class="ml-4" color="light" href="/kunden">Abbrechen</Button>
	</form>
</div>
