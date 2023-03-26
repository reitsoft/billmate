<script>
	import { enhance } from "$app/forms";
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		Search,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from "flowbite-svelte";
	let searchTerm = "";
	import ArrayFilter from "$lib/utils/arrayFilter";
	export let data;
	$: ({ dienstleistungen } = data);
	$: filteredDienstleistungen = ArrayFilter(dienstleistungen, searchTerm);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem>Dienstleistungen</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Dienstleistungen</Heading>
</div>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" placeholder="Suchen..." bind:value={searchTerm} /></form>
	</div>
	<div class="col-start-11 col-span-2">
		<Button href="/dienstleistungen/neu">Neue Dienstleiszung</Button>
	</div>
	<div class="col-start-1 col-span-12">
		<Table class="table-fixed" shadow>
			<TableHead>
				<TableHeadCell class="w-72">Name</TableHeadCell>
				<TableHeadCell>Beschreibung</TableHeadCell>
				<TableHeadCell class="w-44 text-center">Stundensatz</TableHeadCell>
				<TableHeadCell class="w-36" />
				<TableHeadCell class="w-36" />
			</TableHead>
			<TableBody>
				{#each filteredDienstleistungen as dl}
					<TableBodyRow>
						<TableBodyCell>{dl.name}</TableBodyCell>
						<TableBodyCell>{dl.beschreibung}</TableBodyCell>
						<TableBodyCell class="text-center">{dl.stundensatz}</TableBodyCell>
						<TableBodyCell>
							<Button outline color="blue" size="xs" href={`/dienstleistungen/bearbeiten/${dl.id}`}>Bearbeiten</Button>
						</TableBodyCell>
						<TableBodyCell>
							<form method="POST" action="?/deleteDienstleistung&id={dl.id}" use:enhance>
								<Button outline color="red" size="xs" type="submit">Löschen</Button>
							</form>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
