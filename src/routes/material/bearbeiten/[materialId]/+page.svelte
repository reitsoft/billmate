<script>
	import { Button, Breadcrumb, BreadcrumbItem, Heading, Label, Input, Helper, Textarea, Select } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import materialSchema from "$lib/validation/materialSchema";

	export let data;
	const { einheiten } = data;
	const einheitenSelect = einheiten.map(function ({ bezeichnung }) {
		return { value: bezeichnung, name: bezeichnung };
	});
	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: materialSchema
	});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/material">Material</BreadcrumbItem>
	<BreadcrumbItem>Material bearbeiten</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Material bearbeiten</Heading>
</div>

{#if $message}
	{$message}
{:else}
<form action="?/updateMaterial" method="POST" novalidate use:enhance>
	<div class="grid gap-x-4 mb-6 grid-cols-12">
		<div class="col-start-1 col-span-6">
			<Label for="name" color={$errors?.name ? "red" : "base"} class="mb-2">Name</Label>
			<Input
				type="text"
				id="name"
				name="name"
				placeholder="z.B.: Sack Zement"
				color={$errors?.name ? "red" : "base"}
				bind:value={$form.name}
				{...$constraints.name}
				required
			/>
			{#if $errors?.name}
				<Helper class="mt-2" color="red">{$errors.name}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-6">
			<Label for="beschreibung" color={$errors?.beschreibung ? "red" : "base"} class="mt-4 mb-2">Beschreibung</Label>
			<Textarea
				rows="4"
				type="text"
				id="beschreibung"
				name="beschreibung"
				placeholder="z.B.: Universalzement zum betonieren."
				color={$errors?.beschreibung ? "red" : "base"}
				bind:value={$form.beschreibung}
				{...$constraints.beschreibung}
				required
			/>
			{#if $errors?.beschreibung}
				<Helper class="mt-2" color="red">{$errors.beschreibung}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-2">
			<Label for="vpe" color={$errors?.vpe ? "red" : "base"} class="mt-4 mb-2">Verpackungsmenge</Label>
			<Input
				type="text"
				id="vpe"
				name="vpe"
				placeholder="z.B.: 25"
				color={$errors?.vpe ? "red" : "base"}
				bind:value={$form.vpe}
				{...$constraints.vpe}
				required
			/>
			{#if $errors?.vpe}
				<Helper class="mt-2" color="red">{$errors.vpe}</Helper>
			{/if}
		</div>
		<div class="col-start-3 col-span-2">
			<Label for="einheit" color={$errors?.einheit ? "red" : "base"} class="mt-4 mb-2">Einheit</Label>
			<Select
				id="einheit"
				name="einheit"
				items={einheitenSelect}
				placeholder="Bitte auswählen..."
				color={$errors?.einheit ? "red" : "base"}
				bind:value={$form.einheit}
				{...$constraints.einheit}
			/>
			{#if $errors?.einheit}
				<Helper class="mt-2" color="red">{$errors.einheit}</Helper>
			{/if}
		</div>
		<div class="col-start-5 col-span-2">
			<Label for="preis" color={$errors?.preis ? "red" : "base"} class="mt-4 mb-2">Preis</Label>
			<Input
				type="text"
				id="preis"
				name="preis"
				placeholder="z.B.: 33,50"
				color={$errors?.preis ? "red" : "base"}
				bind:value={$form.preis}
				{...$constraints.preis}
				required
			/>
			{#if $errors?.preis}
				<Helper class="mt-2" color="red">{$errors.preis}</Helper>
			{/if}
		</div>
	</div>

	<Button type="submit">Speichern</Button>
	<Button class="ml-4" color="light" href="/material">Abbrechen</Button>
</form>
{/if}