<script>
	import {
		P,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from "flowbite-svelte";

	let searchTerm = "";
	export let data;
	$: ({ kunden } = data);

	$: filteredKunden = kunden.filter((kunde) => kunde.vorname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
</script>

<div class="py-8">
	<div class="grid grid-cols-2 gap-0">
		<div class="col-start-1 col-span-1">
			<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold">Kunden</P>
		</div>
		<div class="col-start-2 col-span-1 grid justify-items-end">
			<Button href="/kunden/neu">Neuer Kunde</Button>
		</div>
	</div>

	<TableSearch placeholder="Search ..." hoverable={false} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell>KdNr.</TableHeadCell>
			<TableHeadCell>Firma</TableHeadCell>
			<TableHeadCell>Kontakt</TableHeadCell>
			<TableHeadCell>Telefon</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Details</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each filteredKunden as kunde}
				<TableBodyRow>
					<TableBodyCell>{kunde.nummer}</TableBodyCell>
					<TableBodyCell>{kunde.firma}</TableBodyCell>
					<TableBodyCell>{`${kunde.anrede} ${kunde.vorname} ${kunde.nachname}`}</TableBodyCell>
					<TableBodyCell>{kunde.mobil}</TableBodyCell>
					<TableBodyCell>{kunde.email}</TableBodyCell>
					<TableBodyCell><Button outline size="xs" href={`/kunden/details/${kunde.id}`}>Details</Button></TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
