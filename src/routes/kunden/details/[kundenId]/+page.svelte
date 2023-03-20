<script>
	import { P, Button, Input, Label, Helper, Select } from "flowbite-svelte";

	export let data;
	$: ({ kunde } = data);
	console.log(data);
</script>

<div class="py-8">
	<div class="grid grid-cols-12 gap-0">
		<div class="col-start-1 col-span-8">
			<P size="xl" height="relaxed" class="max-w-lg" weight="semibold">Kunden Details</P>
		</div>

		<div class="col-start-9 col-span-2 grid justify-items-end">
			<Button href={`/kunden/neuesAngebot/${kunde.id}`}>Angebot erstellen</Button>
		</div>

		<div class="col-start-11 col-span-2 grid justify-items-end">
			<Button outline href={`/kunden/bearbeiten/${kunde.id}`}>Kunden bearbeiten</Button>
		</div>

		<div class="col-start-1 col-span-12">
			<P size="3xl" height="relaxed" class="max-w-lg" weight="semibold"
				>{kunde.firma || kunde.anrede + " " + kunde.vorname + " " + kunde.nachname}
			</P>
		</div>

		<div class="col-start-1 col-span-12">
			<P size="lg" height="relaxed" class="max-w-lg" weight="semibold">alle Infos...</P>
		</div>

		<div class="col-start-1 col-span-4">
			<P size="lg" height="relaxed" class="max-w-lg" weight="semibold">Erstellte Angebote</P>
		</div>

		<div class="col-start-5 col-span-4">
			<P size="lg" height="relaxed" class="max-w-lg" weight="semibold">Erstellte Rechnungen</P>
		</div>

		<div class="col-start-9 col-span-4">
			<P size="lg" height="relaxed" class="max-w-lg" weight="semibold">Bezahlte Rechnungen</P>
		</div>
	</div>
</div>
