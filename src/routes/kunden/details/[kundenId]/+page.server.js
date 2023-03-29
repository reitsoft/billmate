import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import angebotSchema from "$lib/validation/angebotSchema";
import angebotNummer from "$lib/utils/angebotNummer";

export const load = async (event) => {
	const form = await superValidate(event, angebotSchema);
	return {
		form,
		kunde: await prisma.kunden.findUnique({ where: { id: Number(event.params.kundenId) } })
	};
};

export const actions = {
	createAngebot: async (event) => {
		const form = await superValidate(event, angebotSchema);
		const id = event.url.searchParams.get("id");
		console.log({ id });

		if (!id || !form.valid) {
			console.log("Keine ID oder keine Form Daten.");
			return fail(404, { message: "Kunde nicht gefunden." });
		}

		try {
			await prisma.angebote.create({
				data: {
					...form.data,
					kundeId: Number(id),
					nummer: await angebotNummer()
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: "Etwas ist schief gelaufen." });
		}

		const neuesAngebot = await prisma.angebote.findMany({ take: -1 });
		throw redirect(303, `/angebote/neu/${neuesAngebot[0].id}`);
	}
};
