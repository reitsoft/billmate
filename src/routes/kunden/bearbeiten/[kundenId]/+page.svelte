<script>
	import { Button, Input, Label, Helper, Select, Breadcrumb, BreadcrumbItem, Heading } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import kundeSchema from "$lib/validation/kundeSchema";

	let anreden = [
		{ value: "Herr", name: "Herr" },
		{ value: "Frau", name: "Frau" }
	];

	export let data;
	const { form, errors, enhance, constraints } = superForm(data.form, {
		dataType: 'json',
		validators: kundeSchema
	});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/kunden">Kunden</BreadcrumbItem>
	<BreadcrumbItem>Kundendaten bearbeiten</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Kundendaten bearbeiten</Heading>
</div>

<form action="?/updateKunde" method="POST" novalidate use:enhance>
	<div class="grid gap-6 mb-6 grid-cols-12">
		<div class="col-start-1 col-span-3">
			<Label for="firma" color={$errors?.firma ? "red" : "base"} class="mb-2">Firma</Label>
			<Input
				type="text"
				id="firma"
				name="firma"
				placeholder="z.B.: Bau GmbH"
				color={$errors?.firma ? "red" : "base"}
				bind:value={$form.firma}
				{...$constraints.firma}
			/>
			<Helper class="text-sm">Nur wenn der Kunde eine Firma ist.</Helper>
			{#if $errors?.firma}
				<Helper class="mt-2" color="red">{$errors.firma}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-3">
			<Label for="anrede" color={$errors?.anrede ? "red" : "base"}>Anrede auswählen...</Label>
			<Select
				class="mt-2"
				id="anrede"
				name="anrede"
				color={$errors?.anrede ? "red" : "base"}
				items={anreden}
				bind:value={$form.anrede}
				{...$constraints.anrede}
				required
			/>
			{#if $errors?.anrede}
				<Helper class="mt-2" color="red">{$errors.anrede}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-3">
			<Label for="vorname" color={$errors?.vorname ? "red" : "base"} class="mb-2">Vorname</Label>
			<Input
				type="text"
				id="vorname"
				name="vorname"
				placeholder="z.B.: Max"
				color={$errors?.vorname ? "red" : "base"}
				bind:value={$form.vorname}
				{...$constraints.vorname}
				required
			/>
			{#if $errors?.vorname}
				<Helper class="mt-2" color="red">{$errors.vorname}</Helper>
			{/if}
		</div>
		<div class="col-start-4 col-span-3">
			<Label for="nachname" color={$errors?.nachname ? "red" : "base"} class="mb-2">Nachname</Label>
			<Input
				type="text"
				id="nachname"
				name="nachname"
				placeholder="z.B.: Mustermann"
				color={$errors?.nachname ? "red" : "base"}
				bind:value={$form.nachname}
				{...$constraints.nachname}
				required
			/>
			{#if $errors?.nachname}
				<Helper class="mt-2" color="red">{$errors.nachname}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-3">
			<Label for="adresse" color={$errors?.adresse ? "red" : "base"} class="mb-2">Straße, Hausnr.</Label>
			<Input
				type="text"
				id="adresse"
				name="adresse"
				placeholder="z.B.: Musterstraße 1"
				color={$errors?.adresse ? "red" : "base"}
				bind:value={$form.adresse}
				{...$constraints.adresse}
				required
			/>
			{#if $errors?.adresse}
				<Helper class="mt-2" color="red">{$errors.adresse}</Helper>
			{/if}
		</div>
		<div class="col-start-4 col-span-3">
			<Label for="ort" color={$errors?.ort ? "red" : "base"} class="mb-2">PLZ Ort</Label>
			<Input
				type="text"
				id="ort"
				name="ort"
				placeholder="z.B: 12345 Musterstadt"
				color={errors?.ort ? "red" : "base"}
				bind:value={$form.ort}
				{...$constraints.ort}
				required
			/>
			{#if $errors?.ort}
				<Helper class="mt-2" color="red">{errors.ort}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-3">
			<Label for="mobil" color={$errors?.mobil ? "red" : "base"} class="mb-2">Telefon Mobil</Label>
			<Input
				type="text"
				id="mobil"
				name="mobil"
				placeholder="z.B.: +49 171 12345678"
				color={$errors?.mobil ? "red" : "base"}
				bind:value={$form.mobil}
				{...$constraints.mobil}
			/>
			{#if $errors?.mobil}
				<Helper class="mt-2" color="red">{$errors.mobil}</Helper>
			{/if}
		</div>
		<div class="col-start-4 col-span-3">
			<Label for="email" color={$errors?.email ? "red" : "base"} class="mb-2">Email</Label>
			<Input
				type="email"
				id="email"
				name="email"
				placeholder="z.B.: john.doe@company.com"
				color={$errors?.email ? "red" : "base"}
				bind:value={$form.email}
				{...$constraints.email}
				required
			/>
			{#if $errors?.email}
				<Helper class="mt-2" color="red">{$errors.email}</Helper>
			{/if}
		</div>
	</div>

	<Button type="submit">Speichern</Button>
	<Button class="ml-4" color="light" href="/kunden">Abbrechen</Button>
</form>
