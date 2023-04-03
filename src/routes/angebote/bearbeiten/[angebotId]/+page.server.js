import { prisma } from "$lib/server/prisma";
// import { fail, redirect } from "@sveltejs/kit";
// import { superValidate } from "sveltekit-superforms/server";

export const load = async (event) => {
	// const form = await superValidate(event, angebotSchema);
	const angebot = await prisma.angebote.findUnique({
		where: { id: Number(event.params.angebotId) },
		include: { Kunden: true }
	});
	return { angebot };
};
