import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { customAlphabet } from "nanoid";
import { z } from "zod";

const userSchema = z.object({
	firma: z.string().max(48, { message: "Maxmimal 48 Buchstaben." }).trim(),
	anrede: z.enum(["Herr", "Frau", "Familie", "Herr und Frau"], {
		required_error: "Bitte die Anrede wählen."
	}),
	vorname: z
		.string({ required_error: "Vorname ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.trim(),
	nachname: z
		.string({ required_error: "Nachname ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.trim(),
	adresse: z
		.string({ required_error: "Adresse ist erforderlich." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.trim(),
	ort: z
		.string({ required_error: "Postleitzahl und Ort sind erforderlich." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.trim(),
	mobil: z.string().max(12).trim(),
	email: z
		.string({ required_error: "Email Adresse ist erforderlich." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.email({ message: "Gültige Email Adresse ist erforderlich." })
});

export const actions = {
	createKunde: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = userSchema.parse(formData);
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
			const { fieldErrors: errors } = error.flatten();
			// return fail(500, { message: "Kunde konnte nicht erstellt werden." });
			return {
				data: formData,
				errors
			};
		}
		throw redirect(303, "/kunden");
		// return {
		// 	status: 201
		// };
	}
};
