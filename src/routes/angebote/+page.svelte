<script>
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		Search,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Table
	} from "flowbite-svelte";
	import ArrayFilter from "$lib/utils/arrayFilter";

	let searchTerm = "";
	export let data;
	$: ({ angebote } = data);
	$: filteredAngebote = ArrayFilter(angebote, searchTerm);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem>Angebote</BreadcrumbItem>
</Breadcrumb>

<div class="flex mb-8">
	<Heading tag="h2">Angebote</Heading>
</div>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchTerm} /></form>
	</div>
	<!-- <div class="col-start-12 col-span-1">
		<Button href="/kunden/neu">Neuer Kunde</Button>
	</div> -->
	<div class="col-start-1 col-span-12">
		<Table class="table-fixed" shadow>
			<TableHead>
				<TableHeadCell class="w-32">Nummer</TableHeadCell>
				<TableHeadCell class="w-60">Firma</TableHeadCell>
				<TableHeadCell class="w-52">Kontakt</TableHeadCell>
				<TableHeadCell>Beschreibung</TableHeadCell>
				<TableHeadCell class="w-60">angebotswert</TableHeadCell>
				<TableHeadCell class="w-36" />
			</TableHead>
			<TableBody>
				{#each filteredAngebote as angebot}
					<TableBodyRow>
						<TableBodyCell>{angebot.nummer}</TableBodyCell>
						<TableBodyCell>{angebot.Kunden.firma}</TableBodyCell>
						<TableBodyCell>{`${angebot.Kunden.vorname} ${angebot.Kunden.nachname}`}</TableBodyCell>
						<TableBodyCell>{angebot.beschreibung}</TableBodyCell>
						<TableBodyCell>{angebot.angebotswert}</TableBodyCell>
						<TableBodyCell>
							<Button outline size="xs" href={`/angebote/details/${angebot.id}`}>Details</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
