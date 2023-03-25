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
	$: ({ material } = data);
	$: filteredMaterial = ArrayFilter(material, searchTerm);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem>Material</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Material</Heading>
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
				<TableHeadCell>VPE</TableHeadCell>

				<TableHeadCell>Preis</TableHeadCell>
				<TableHeadCell />
				<TableHeadCell />
			</TableHead>
			<TableBody>
				{#each filteredMaterial as mat}
					<TableBodyRow>
						<TableBodyCell>{mat.name}</TableBodyCell>
						<TableBodyCell>{mat.beschreibung}</TableBodyCell>
						<TableBodyCell>{`${mat.vpe} ${mat.einheit}`}</TableBodyCell>

						<TableBodyCell>{mat.preis}</TableBodyCell>
						<TableBodyCell>
							<Button outline color="blue" size="xs" href={`/material/bearbeiten/${mat.id}`}>Bearbeiten</Button>
						</TableBodyCell>
						<TableBodyCell>
							<form method="POST" action="?/deleteMaterial&id={mat.id}" use:enhance>
								<Button outline color="red" size="xs" type="submit">Löschen</Button>
							</form>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
