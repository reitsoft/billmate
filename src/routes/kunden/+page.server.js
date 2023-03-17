import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import { customAlphabet } from "nanoid";

export const actions = {
	createKunde: async ({ request }) => {
		const { name, adresse, plz, ort } = Object.fromEntities(await request.formData());

		try {
			const nanoid = customAlphabet("1234567890", 10);
			await prisma.kunde.create({
				data: {
					nummer: nanoid(),
					name,
					adresse,
					plz,
					ort
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Kunde konnte nicht erstellt werden." });
		}
		return {
			status: 200
		};
	}
};
