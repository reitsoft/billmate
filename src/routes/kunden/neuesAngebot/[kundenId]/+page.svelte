<script>
	import {
		P,
		Button,
		Input,
		Label,
		Helper,
		Select,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
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
	export let data;
	$: ({ kunde, material, dienstleistungen} = data);
	$: komponenten = []
	const { form, errors, enhance, constraints } = superForm(data.form, {
		validators: komponenteSchema
	});
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

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchTerm} /></form>
	</div>
	<div class="col-start-11 col-span-2">
		<Button href="/material/neu">Neues Material</Button>
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
				{#each komponenten as komponente}
					<TableBodyRow>
						<TableBodyCell>{komponente.name}</TableBodyCell>
						<TableBodyCell>{komponente.beschreibung}</TableBodyCell>
						<TableBodyCell>{komponente.preis}</TableBodyCell>
						<TableBodyCell>
							<Button outline color="blue" size="xs" href={`/kunden/bearbeiten/${komponente.id}`}>Bearbeiten</Button>
						</TableBodyCell>
						<TableBodyCell>
							<form method="POST" action="?/deleteMaterial&id={komponente.id}" use:enhance>
								<Button outline color="red" size="xs" type="submit">Löschen</Button>
							</form>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
