<script>
	import "../app.postcss";
	import { page } from "$app/stores";
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
			<NavLi href="/angebote" active={activeUrl === `/angebote`}>Angebote</NavLi>
			<NavLi href="/rechnungen" active={activeUrl === `/rechnungen`}>Rechnungen</NavLi>
			<NavLi id="kunden" class="cursor-pointer"><Chevron aligned>Kunden</Chevron></NavLi>
			<Dropdown triggeredBy="#kunden" class="w-44 z-20">
				<DropdownItem href="/kunden" active={activeUrl === `/kunden`}>Alle Kunden</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/kontakte" active={activeUrl === `/kontakte`}>Kontakte</DropdownItem>
			</Dropdown>
			<NavLi id="komponenten" class="cursor-pointer"><Chevron aligned>Komponenten</Chevron></NavLi>
			<Dropdown triggeredBy="#komponenten" class="w-44 z-20">
				<DropdownItem href="/dienstleistung" active={activeUrl === `/dienstleistung`}>Dienstleistungen</DropdownItem>
				<DropdownItem href="/material" active={activeUrl === `/material`}>Material</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/bereiche" active={activeUrl === `/bereiche`}>Bereiche</DropdownItem>
				<DropdownItem href="/einheiten" active={activeUrl === `/einheiten`}>Einheiten</DropdownItem>
				<DropdownItem href="/aufgabenarten" active={activeUrl === `/aufgabenarten`}>Aufgabenarten</DropdownItem>
			</Dropdown>
		</NavUl>
		<!-- <DarkMode /> -->
		<DarkMode btnClass={darkmodebtn} />
	</Navbar>
</div>
<slot />
