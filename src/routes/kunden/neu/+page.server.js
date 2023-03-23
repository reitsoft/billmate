import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { customAlphabet } from "nanoid";
import { superValidate } from "sveltekit-superforms/server";
import kundeSchema from "$lib/validation/kundeSchema";

export const load = async (event) => {
	const form = await superValidate(event, kundeSchema);
	return {
		form,
		kunden: await prisma.kunden.findMany({})
	};
};

export const actions = {
	createKunde: async (event) => {
		const form = await superValidate(event, kundeSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const nanoid = customAlphabet("123456789", 4);
			const nummer = nanoid() + "-" + nanoid();
			await prisma.kunden.create({
				data: { ...form.data, nummer }
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Kunde konnte nicht erstellt werden." });
		}

		throw redirect(303, "/kunden");
	}
};
