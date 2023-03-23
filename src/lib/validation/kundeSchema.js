import { z } from "zod";

export default z.object({
	firma: z.string().max(48, { message: "Maxmimal 48 Buchstaben." }).trim(),
	anrede: z.enum(["Herr", "Frau"], {
		errorMap: () => ({ message: "Bitte die Anrede auswählen." }) 
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
	mobil: z.string().trim(),
	email: z
		.string({ required_error: "Email Adresse ist erforderlich." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.email({ message: "Gültige Email Adresse ist erforderlich." })
});
