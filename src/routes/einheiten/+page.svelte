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
	export let data;
	$: ({ einheiten } = data);
	$: filteredEinheiten = einheiten.filter(
		(einheit) => einheit.bezeichnung.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/einheiiten">Einheiten</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Einheiten</Heading>
</div>

<div class="grid grid-cols-12 gap-0">
	<div class="col-start-1 col-span-2 mb-4">
		<form class="flex gap-2"><Search size="md" bind:value={searchTerm} /></form>
	</div>
	<div class="col-start-6 col-span-1">
		<Button href="/einheiten/neu">Neue Einheit</Button>
	</div>
	<div class="col-start-1 col-span-6">
		<Table shadow>
			<TableHead>
				<TableHeadCell>Bezeichnung</TableHeadCell>
				<TableHeadCell>Abkürzung</TableHeadCell>
				<TableHeadCell />
				<TableHeadCell />
			</TableHead>
			<TableBody>
				{#each filteredEinheiten as einheit}
					<TableBodyRow>
						<TableBodyCell>{einheit.bezeichnung}</TableBodyCell>
						<TableBodyCell>{einheit.abkuerzung}</TableBodyCell>
						<TableBodyCell>
							<Button outline color="blue" size="xs" href={`/einheiten/bearbeiten/${einheit.id}`}>Bearbeiten</Button>
						</TableBodyCell>
						<TableBodyCell>
							<form method="POST" action="?/deleteEinheit&id={einheit.id}" use:enhance>
								<Button outline color="red" size="xs" type="submit">Löschen</Button>
							</form>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
