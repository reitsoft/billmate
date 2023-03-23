<script>
	import { Button, Breadcrumb, BreadcrumbItem, Heading, Label, Input, Helper } from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import einheitSchema from "$lib/validation/einheitSchema";

	export let data;
	const { form, errors, enhance, constraints } = superForm(data.form, {
		dataType: 'json',
		validators: einheitSchema
	});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/einheiten">Einheiten</BreadcrumbItem>
	<BreadcrumbItem>Einheit bearbeiten</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Einheit bearbeiten</Heading>
</div>

<form action="?/updateEinheit" method="POST" novalidate use:enhance>
	<div class="grid mb-6 grid-cols-12">
		<div class="col-start-1 col-span-3">
			<Label for="bezeichnung" color={$errors?.vorname ? "red" : "base"} class="mb-2">Bezeichnung</Label>
			<Input
				type="text"
				id="bezeichnung"
				name="bezeichnung"
				placeholder="z.B.: Kilometer"
				color={$errors?.bezeichnung ? "red" : "base"}
				bind:value={$form.bezeichnung}
				{...$constraints.bezeichnung}
				required
			/>
			{#if $errors?.bezeichnung}
				<Helper class="mt-2" color="red">{$errors.bezeichnung}</Helper>
			{/if}
		</div>
		<div class="col-start-1 col-span-3">
			<Label for="abkuerzung" color={$errors?.vorname ? "red" : "base"} class="mt-4 mb-2">Abkürzung</Label>
			<Input
				type="text"
				id="abkuerzung"
				name="abkuerzung"
				placeholder="z.B.: km"
				color={$errors?.abkuerzung ? "red" : "base"}
				bind:value={$form.abkuerzung}
				{...$constraints.abkuerzung}
				required
			/>
			{#if $errors?.abkuerzung}
				<Helper class="mt-2" color="red">{$errors.abkuerzung}</Helper>
			{/if}
		</div>
	</div>

	<Button type="submit">Speichern</Button>
	<Button class="ml-4" color="light" href="/einheiten">Abbrechen</Button>
</form>
