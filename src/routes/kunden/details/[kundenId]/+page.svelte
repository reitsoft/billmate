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
		Search,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from "flowbite-svelte";

	let modalNeuesAngebotIstOffen = false;
	import { superForm } from "sveltekit-superforms/client";
	import angebotSchema from "$lib/validation/angebotSchema";
	import ArrayFilter from "$lib/utils/arrayFilter";

	let searchAngebote = "";
	let searchRechnungen = "";
	export let data;
	const { kunde } = data;
	$: ({ angebote } = data.kunde);
	$: ({ rechnungen } = data.kunde);
	$: filteredAngebote = ArrayFilter(angebote, searchAngebote);
	$: filteredRechnungen = ArrayFilter(rechnungen, searchAngebote);
	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		dataType: "json",
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

{#if $message}
	{$message}
{:else}
	<div class="grid grid-cols-12 gap-x-4">
		<div class="col-start-1 col-span-2 mb-4">
			<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchAngebote} /></form>
		</div>
				<div class="col-start-7 col-span-2 mb-4">
			<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchRechnungen} /></form>
		</div>
		<div class="flex col-start-10 col-span-3 mb-4 justify-end">
			<Button on:click={() => (modalNeuesAngebotIstOffen = true)}>Angebot erstellen</Button>
			<Button class="ml-4" outline href={`/kunden/bearbeiten/${kunde.id}`}>Kunden bearbeiten</Button>
		</div>
		<div class="col-start-1 col-span-6">
			<Table shadow>
				<TableHead>
					<TableHeadCell>Angebote</TableHeadCell>
					<TableHeadCell>Preis</TableHeadCell>
					<TableHeadCell>Actions</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each filteredAngebote as angebot}
						<TableBodyRow>
							<TableBodyCell>{angebot.beschreibung}</TableBodyCell>
							<TableBodyCell>{angebot.angebotswert}</TableBodyCell>
							<TableBodyCell>
								<Badge href={`/kunden/details/${kunde.id}`} large>Bearbeiten</Badge>
								<Badge href={`/kunden/details/${kunde.id}`} large color="green">Abrechnen</Badge>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
		<div class="col-start-7 col-span-6">
			<Table shadow>
				<TableHead>
					<TableHeadCell>Rechnungen</TableHeadCell>
					<TableHeadCell>Preis</TableHeadCell>
					<TableHeadCell>Action</TableHeadCell>
					<TableHeadCell>Status</TableHeadCell>
				</TableHead>
				<TableBody>
					<!-- {#each filteredRechnungen as rechnung} -->
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

	<Modal
		title="Neues Angebot erstellen"
		bind:open={modalNeuesAngebotIstOffen}
		size="md"
		autoclose={false}
		class="w-full"
	>
		<form
			class="flex flex-col space-y-6"
			action={`?/createAngebot&id=${kunde.id}`}
			method="POST"
			novalidate
			use:enhance
		>
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
			<Button color="light" on:click={() => (modalNeuesAngebotIstOffen = false)}>Abbrechen</Button>
		</form>
	</Modal>
{/if}
