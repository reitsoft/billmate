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
	$: ({ kunden } = data);
	$: filteredKunden = ArrayFilter(kunden, searchTerm);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem>Kunden</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Kunden</Heading>
</div>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchTerm} /></form>
	</div>
	<div class="col-start-12 col-span-1">
		<Button href="/kunden/neu">Neuer Kunde</Button>
	</div>
	<div class="col-start-1 col-span-12">
		<Table class="table-fixed" shadow>
			<TableHead>
				<TableHeadCell class="w-40">KdNr.</TableHeadCell>
				<TableHeadCell class="w-72">Firma</TableHeadCell>
				<TableHeadCell>Kontakt</TableHeadCell>
				<TableHeadCell class="w-60">Telefon</TableHeadCell>
				<TableHeadCell class="w-60">Email</TableHeadCell>
				<TableHeadCell class="w-36"></TableHeadCell>
			</TableHead>
			<TableBody>
				{#each filteredKunden as kunde}
					<TableBodyRow>
						<TableBodyCell>{kunde.nummer}</TableBodyCell>
						<TableBodyCell>{kunde.firma}</TableBodyCell>
						<TableBodyCell>{`${kunde.anrede} ${kunde.vorname} ${kunde.nachname}`}</TableBodyCell>
						<TableBodyCell>{kunde.mobil}</TableBodyCell>
						<TableBodyCell>{kunde.email}</TableBodyCell>
						<TableBodyCell>
							<Button outline size="xs" href={`/kunden/details/${kunde.id}`}>Details</Button>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
