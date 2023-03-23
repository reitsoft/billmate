import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import einheitSchema from "$lib/validation/einheitSchema";

export const load = async (event) => {
	const form = await superValidate(event, einheitSchema);
	return {
		form,
		einheiten: await prisma.einheiten.findMany({})
	};
};

export const actions = {
	createEinheit: async (event) => {
		const form = await superValidate(event, einheitSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await prisma.einheiten.create({
				data: form.data
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Einheit konnte nicht erstellt werden." });
		}

		throw redirect(303, "/einheiten");
	}
};
