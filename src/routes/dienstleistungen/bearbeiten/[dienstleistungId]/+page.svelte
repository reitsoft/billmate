<script>
	import { Button, Breadcrumb, BreadcrumbItem, Heading, Label, Input, Helper, Textarea } from "flowbite-svelte";
  import { superForm } from "sveltekit-superforms/client"
	import dienstleistungSchema from "$lib/validation/dienstleistungSchema";

	export let data;
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: dienstleistungSchema
	});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/dienstleitungen">Dienstleitungen</BreadcrumbItem>
	<BreadcrumbItem>Dienstleistung bearbeiten</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Dienstleistung bearbeiten</Heading>
</div>

<form action="?/update" method="POST" novalidate use:enhance>
	<div class="grid mb-6 grid-cols-12">
		<div class="col-start-1 col-span-6">
			<Label for="name" color={$errors?.name ? "red" : "base"} class="mb-2">Name</Label>
			<Input
				type="text"
				id="name"
				name="name"
				placeholder="z.B.: Parkettboden entfernen"
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
        rows = 4
				type="text"
				id="beschreibung"
				name="beschreibung"
				placeholder="z.B.: Bodenleisten und Bodenbelag entfernen. Material entsorgen."
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
			<Label for="stundensatz" color={$errors?.stundensatz ? "red" : "base"} class="mt-4 mb-2">Stundensatz</Label>
			<Input
				type="number"
				id="stundensatz"
				name="stundensatz"
				placeholder="z.B.: 33,50"
				color={$errors?.stundensatz ? "red" : "base"}
				bind:value={$form.stundensatz}
				{...$constraints.stundensatz}
				required
			/>
			{#if $errors?.stundensatz}
				<Helper class="mt-2" color="red">{$errors.stundensatz}</Helper>
			{/if}
		</div>
	</div>

	<Button type="submit">Speichern</Button>
	<Button class="ml-4" color="light" href="/dienstleistungen">Abbrechen</Button>
</form>
