<script>
	import {
		Badge,
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		Label,
		Input,
		Helper,
		Modal,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from "flowbite-svelte";

	let modalNeuesAngebotistOffen = false;
	import { superForm } from "sveltekit-superforms/client";
	import angebotSchema from "$lib/validation/angebotSchema";

	export let data;
	const { kunde } = data;
	const { form, errors, enhance, constraints } = superForm(data.form, {
		dataType: 'json',
		validators: angebotSchema
	});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/kunden">Kunden</BreadcrumbItem>
	<BreadcrumbItem>Details</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">{kunde.firma || kunde.anrede + " " + kunde.vorname + " " + kunde.nachname}</Heading>
</div>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-9 col-span-2 grid justify-items-end mb-4">
		<!-- <form method="POST" action="?/createAngebot&id={kunde.id}" use:enhance> -->
			<Button on:click={() => (modalNeuesAngebotistOffen = true)}>Angebot erstellen</Button>
		<!-- </form> -->
	</div>

	<div class="col-start-11 col-span-2 grid justify-items-end mb-4">
		<Button outline href={`/kunden/bearbeiten/${kunde.id}`}>Kunden bearbeiten</Button>
	</div>
	<div class="col-start-1 col-span-4">
		<Table shadow>
			<TableHead>
				<TableHeadCell>Angebote</TableHeadCell>
				<TableHeadCell>Preis</TableHeadCell>
				<TableHeadCell>Actions</TableHeadCell>
			</TableHead>
			<TableBody>
				<!-- {#each filteredKunden as kunde} -->
				<TableBodyRow>
					<TableBodyCell>Gartenarbeit</TableBodyCell>
					<TableBodyCell>987,45 €</TableBodyCell>
					<TableBodyCell>
						<Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge>
						<Badge href={`/kunden/details/${kunde.id}`} large color="green">Abrechnen</Badge>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Abriss</TableBodyCell>
					<TableBodyCell>123,45 €</TableBodyCell>
					<TableBodyCell>
						<Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge>
						<Badge href={`/kunden/details/${kunde.id}`} large color="green">Abrechnen</Badge>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Abdichten</TableBodyCell>
					<TableBodyCell>123,45 €</TableBodyCell>
					<TableBodyCell>
						<Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge>
						<Badge href={`/kunden/details/${kunde.id}`} large color="green">Abrechnen</Badge>
					</TableBodyCell>
				</TableBodyRow>
				<!-- {/each} -->
			</TableBody>
		</Table>
	</div>
	<div class="col-start-6 col-span-4">
		<Table shadow>
			<TableHead>
				<TableHeadCell>Rechnungen</TableHeadCell>
				<TableHeadCell>Preis</TableHeadCell>
				<TableHeadCell>Action</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
			</TableHead>
			<TableBody>
				<!-- {#each filteredKunden as kunde} -->
				<TableBodyRow>
					<TableBodyCell>Gartenarbeit</TableBodyCell>
					<TableBodyCell>987,45 €</TableBodyCell>
					<TableBodyCell><Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge></TableBodyCell>
					<TableBodyCell>
						<Badge large color="green">Bezahlt</Badge>
					</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>Abriss</TableBodyCell>
					<TableBodyCell>123,45 €</TableBodyCell>
					<TableBodyCell>
						<Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge>
					</TableBodyCell>
					<TableBodyCell>
						<Badge large color="red">Offen</Badge>
					</TableBodyCell>
				</TableBodyRow>
				<!-- {/each} -->
			</TableBody>
		</Table>
	</div>
</div>

<Modal title="Neues Angebot erstellen" bind:open={modalNeuesAngebotistOffen} size="md" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action={`?/createAngebot&id=${kunde.id}`} method="POST" novalidate use:enhance>
		<!-- <Label class="space-y-2" for="name" color={$errors?.name ? "red" : "base"}>Name</Label>
		<Input
			type="text"
			name="beschreibung"
			id="beschreibung"
			placeholder="z.B.: Boden entfernen"
			color={$errors?.name ? "red" : "base"}
			bind:value={$form.name}
			{...$constraints.name}
			required
		/>
		{#if $errors?.name}
			<Helper class="mt-2" color="red">{$errors.name}</Helper>
		{/if} -->
		<Label class="space-y-2" for="beschreibung" color={$errors?.beschreibung ? "red" : "base"}>Beschreibung</Label>
		<Input
			type="text"
			name="beschreibung"
			id="beschreibung"
			placeholder="z.B.: Parketboden in Wohnzimmer entfernen."
			color={$errors?.beschreibung ? "red" : "base"}
			bind:value={$form.beschreibung}
			{...$constraints.beschreibung}
		/>
		{#if $errors?.beschreibung}
			<Helper class="mt-2" color="red">{$errors.beschreibung}</Helper>
		{/if}
		<Button type="submit">Speichhern</Button>
		<Button color="light" on:click={() => (modalNeuesAngebotistOffen = false)}>Abbrechen</Button>
	</form>
</Modal>
