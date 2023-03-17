<script>
	import '../app.postcss';

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
	} from 'flowbite-svelte';
</script>

<div class="relative px-8">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="RR" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				RR Baudienstleistungen
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={true}>Start</NavLi>
			<NavLi href="/angebote">Angebote</NavLi>
			<NavLi href="/rechnungen">Rechnungen</NavLi>
			<NavLi id="kunden" class="cursor-pointer"><Chevron aligned>Kunden</Chevron></NavLi>
			<Dropdown triggeredBy="#kunden" class="w-44 z-20">
				<DropdownItem href="/kunden">Alle Kunden</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/kontakte">Kontakte</DropdownItem>
			</Dropdown>
			<NavLi id="komponenten" class="cursor-pointer"><Chevron aligned>Komponenten</Chevron></NavLi>
			<Dropdown triggeredBy="#komponenten" class="w-44 z-20">
				<DropdownItem href="/dienstleistung">Dienstleistungen</DropdownItem>
				<DropdownItem href="/material">Material</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/bereiche">Bereiche</DropdownItem>
				<DropdownItem href="/einheiten">Einheiten</DropdownItem>
				<DropdownItem href="/aufgabenarten">Aufgabenarten</DropdownItem>
			</Dropdown>
		</NavUl>
		<DarkMode />
	</Navbar>
</div>
<slot />
