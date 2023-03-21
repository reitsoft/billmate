import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { customAlphabet } from "nanoid";
import kundeSchema from "$lib/validation/kundeSchema"

export const actions = {
	createKunde: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = kundeSchema.parse(formData);
			console.log(result);
			const { firma, anrede, vorname, nachname, adresse, ort, mobil, email } = formData;
			const nanoid = customAlphabet("123456789", 4);
			await prisma.kunden.create({
				data: {
					nummer: nanoid() + "-" + nanoid(),
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
			console.log({error})
			const { fieldErrors: errors } = error.flatten();
			return {
				data: formData,
				errors
			};
		}
		
		throw redirect(303, "/kunden");
	}
};
