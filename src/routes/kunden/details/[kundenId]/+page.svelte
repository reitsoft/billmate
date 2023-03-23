<script>
	import {
		Badge,
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Heading,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from "flowbite-svelte";

	export let data;
	$: ({ kunde } = data);
	console.log(data);
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
		<Button href={`/kunden/neuesAngebot/${kunde.id}`}>Angebot erstellen</Button>
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
