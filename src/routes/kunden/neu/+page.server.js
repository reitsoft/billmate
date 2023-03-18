import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import { customAlphabet } from "nanoid";

export const actions = {
	createKunde: async ({ request }) => {
		const { firma, anrede, vorname, nachname, adresse, ort, mobil, email } = Object.fromEntries(
			await request.formData()
		);

		try {
			const nanoid = customAlphabet("123456789", 10);
			await prisma.kunde.create({
				data: {
					nummer: nanoid(),
					firma: firma ? firma : "",
					anrede,
					vorname,
					nachname,
					mobil,
					email,
					adresse,
					ort
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: "Kunde konnte nicht erstellt werden." });
		}
		return {
			status: 201
		};
	}
};
