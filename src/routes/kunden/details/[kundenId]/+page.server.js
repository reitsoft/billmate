import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import angebotSchema from "$lib/validation/angebotSchema";
import angebotNummer from "$lib/utils/angebotNummer";

export const load = async (event) => {
	return {
		form: await superValidate(event, angebotSchema),
		kunde: await prisma.kunden.findUnique({
			where: { id: Number(event.params.kundenId) },
			include: { angebote: true, rechnungen: true }
		})
	};
};

export const actions = {
	createAngebot: async (event) => {
		const form = await superValidate(event, angebotSchema);
		const id = event.url.searchParams.get("id");

		if (!id || !form.valid) {
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
			return message(form, "Etwas ist schief gelaufen.", { message: 500 });
		}

		const neuesAngebot = await prisma.angebote.findMany({ take: -1 });
		throw redirect(303, `/angebote/bearbeiten/${neuesAngebot[0].id}`);
	}
};
