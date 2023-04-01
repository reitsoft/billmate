<script>
	import { Breadcrumb, BreadcrumbItem, Heading, Card } from "flowbite-svelte";
	export let data;

	const { angebot } = data;
	const { Kunden: kunde } = data.angebot;
	console.log({kunde});
</script>

<Breadcrumb class="mt-8 mb-4">
	<BreadcrumbItem href="/" home>Start</BreadcrumbItem>
	<BreadcrumbItem href="/angebote">Angebote</BreadcrumbItem>
	<BreadcrumbItem>Neues Angebot</BreadcrumbItem>
</Breadcrumb>

<div class="flex mb-8">
	<Heading tag="h2">Neues Angebot</Heading>
</div>

<Card class="mb-10">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{#if kunde.firma}
			{`${kunde.firma}`}
		{:else}
			{`${kunde.vorname + " " + kunde.nachname}`}
		{/if}
	</h5>

	{#if kunde.firma}
		<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{`${kunde.anrede + " " + kunde.vorname + " " + kunde.nachname}`}
		</p>
	{/if}
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{kunde.adresse}</p>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{kunde.ort}</p>
</Card>


{JSON.stringify(angebot)}
