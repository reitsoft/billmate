<script>
	import { P, Button, Input, Label, Helper, Select, Breadcrumb, BreadcrumbItem, Heading } from "flowbite-svelte";

	export let data;
	$: ({ kunde } = data);
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/kunden">Kunden</BreadcrumbItem>
	<BreadcrumbItem href={`/kunden/details/${kunde.id}`}>{`Details: ${kunde.firma || kunde.vorname + " " + kunde.nachname}`}</BreadcrumbItem>
	<BreadcrumbItem>Neues Angebot</BreadcrumbItem>
</Breadcrumb>
<div class="flex mb-8">
	<Heading tag="h2">Neues Angebot</Heading>
</div>

{kunde.firma}
