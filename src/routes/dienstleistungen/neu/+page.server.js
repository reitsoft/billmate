import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import dienstleistungSchema from "$lib/validation/dienstleistungSchema";

export const load = async (event) => {
	const form = await superValidate(event, dienstleistungSchema);
	return {
		form,
		dienstleistungen: await prisma.dienstleistungen.findMany({})
	};
};

export const actions = {
	createDienstleistung: async (event) => {
		const form = await superValidate(event, dienstleistungSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.dienstleistungen.create({
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Einheit konnte nicht erstellt werden." });
		}

		throw redirect(303, "/dienstleistungen");
	}
};
