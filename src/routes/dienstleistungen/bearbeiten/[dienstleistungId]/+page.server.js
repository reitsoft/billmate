import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import dienstleistungSchema from "$lib/validation/dienstleistungSchema";

export const load = async (event) => {
	let form = await superValidate(event, dienstleistungSchema);
	const get = async () => {
		
		const dienstleistung = await prisma.dienstleistungen.findUnique({ where: { id: Number(event.params.dienstleistungId) } });

		if (!dienstleistung) {
			return fail(404, "Einheit nicht gefunden.");
		}
		return { dienstleistung };
	};
	const { dienstleistung } = await get();
	form.data = dienstleistung;
	return { form };
};

export const actions = {
	update: async (event) => {
		const form = await superValidate(event, dienstleistungSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.dienstleistungen.update({
				where: { id: Number(event.params.dienstleistungId) },
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Einheit konnte nicht aktualisiert werden." });
		}

		throw redirect(303, "/dienstleistungen");
	}
};
