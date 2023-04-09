<script>
	import "../app.postcss";
	import "../style.css"
	import { page } from "$app/stores";
	import { fly } from "svelte/transition"
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Chevron,
		DropdownDivider
	} from "flowbite-svelte";

	export let data

	$: activeUrl = $page.url.pathname;
	let darkmodebtn =
		"text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-2 top-12  md:top-3 md:right-2 z-50";
</script>

<div class="relative px-8">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="RR" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> RR Baudienstleistungen </span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={activeUrl === `/`}>Start</NavLi>
			<NavLi href="/kunden" active={activeUrl === `/kunden`}>Kunden</NavLi>
			<NavLi href="/angebote" active={activeUrl === `/angebote`}>Angebote</NavLi>
			<NavLi href="/rechnungen" active={activeUrl === `/rechnungen`}>Rechnungen</NavLi>
			<NavLi id="komponenten" class="cursor-pointer"><Chevron aligned>Komponenten</Chevron></NavLi>
			<Dropdown triggeredBy="#komponenten" class="w-44 z-20">
				<DropdownItem href="/dienstleistungen" active={activeUrl === `/dienstleistung`}>Dienstleistungen</DropdownItem>
				<DropdownItem href="/material" active={activeUrl === `/material`}>Material</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/einheiten" active={activeUrl === `/einheiten`}>Einheiten</DropdownItem>
			</Dropdown>
		</NavUl>
		<!-- <DarkMode /> -->
		<DarkMode btnClass={darkmodebtn} />
	</Navbar>
</div>

<div class="container mx-auto px-sm">
	{#key data.url}
	<div in:fly={{ x: -200, duration: 200, delay: 200 }} out:fly={{ x: 200, duration: 200}}>
		<slot />
	</div>
	{/key}
</div>
