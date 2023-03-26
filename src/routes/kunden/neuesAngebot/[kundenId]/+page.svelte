<script>
	import {
		P,
		Button,
		Card,
		Input,
		Label,
		Helper,
		Select,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		Modal,
		Table,
		TableHead,
		TableHeadCell,
		Search,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from "flowbite-svelte";
	import { superForm } from "sveltekit-superforms/client";
	import komponenteSchema from "$lib/validation/komponenteSchema";

	let searchTerm = "";
	let modalPositionHinzufuegen = {
		name: "",
		beschreibung: "",
		istOffen: false
	};
	export let data;
	$: ({ kunde, material, dienstleistungen } = data);
	$: positionen = [];
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: komponenteSchema
	});

	const addPosition = () => {
		console.log(positionen.length)
		let position = {
			angebotId: "",
			nummer: positionen.length = 0 ? 10 : positionen.length + 10,
			name: modalPositionHinzufuegen.name,
			beschreibung: modalPositionHinzufuegen.beschreibung,
			preis: "0"
		};
		positionen.push(position);
		modalPositionHinzufuegen.name = "";
		modalPositionHinzufuegen.beschreibung = "";
		console.log(positionen);
		modalPositionHinzufuegen.istOffen = false;
	};
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/kunden">Kunden</BreadcrumbItem>
	<BreadcrumbItem href={`/kunden/details/${kunde.id}`}
		>{`${kunde.firma || kunde.vorname + " " + kunde.nachname}`}</BreadcrumbItem
	>
	<BreadcrumbItem>Neues Angebot</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Neues Angebot</Heading>
</div>

<Card class="mb-10">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{`${kunde.firma || kunde.vorname + " " + kunde.nachname}`}
	</h5>

	{#if kunde.firma}
		<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{`${kunde.anrede + " " + kunde.vorname + " " + kunde.nachname}`}
		</p>
	{/if}
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{kunde.adresse}</p>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{kunde.ort}</p>
</Card>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchTerm} /></form>
	</div>
	<div class="col-start-11 col-span-2">
		<Button on:click={() => (modalPositionHinzufuegen.istOffen = true)}>Position hinzufügen</Button>
	</div>
	<div class="col-start-1 col-span-12">
		<Table shadow>
			<TableHead>
				<TableHeadCell>Name</TableHeadCell>
				<TableHeadCell>Beschreibung</TableHeadCell>
				<TableHeadCell>Preis</TableHeadCell>
				<TableHeadCell />
				<TableHeadCell />
			</TableHead>
			<TableBody>
				{#each positionen as position}
					<TableBodyRow>
						<TableBodyCell>{position.name}</TableBodyCell>
						<TableBodyCell>{position.beschreibung}</TableBodyCell>
						<TableBodyCell>{position.preis}</TableBodyCell>
						<TableBodyCell>
							<Button outline color="blue" size="xs" href={`/kunden/bearbeiten/${position.id}`}>Bearbeiten</Button>
						</TableBodyCell>
						<TableBodyCell>
							<form method="POST" action="?/deleteMaterial&id={position.id}" use:enhance>
								<Button outline color="red" size="xs" type="submit">Löschen</Button>
							</form>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>

<Modal
	title="Position hinzufügen"
	bind:open={modalPositionHinzufuegen.istOffen}
	size="md"
	autoclose={false}
	class="w-full"
>
	<form class="flex flex-col space-y-6" action="#">
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="beschreibung"
				placeholder="z.B.: Boden entfernen"
				required
				bind:value={modalPositionHinzufuegen.name}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Beschreibung</span>
			<Input
				type="text"
				name="beschreibung"
				placeholder="z.B.: Parketboden in Wohnzimmer entfernen."
				bind:value={modalPositionHinzufuegen.beschreibung}
			/>
		</Label>
	</form>
	<svelte:fragment slot="footer">
		<Button type="submit" on:click={(event) => addPosition(event)}>Speichhern</Button>
		<Button color="light" on:click={() => (modalPositionHinzufuegen.istOffen = false)}>Abbrechen</Button>
	</svelte:fragment>
</Modal>
