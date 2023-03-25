import { z } from "zod";

export default z.object({
	name: z
		.string({ message: "Name ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(120, { message: "Maxmimal 120 Buchstaben." })
		.trim(),
	beschreibung: z
		.string({ message: "Beschreibung ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(250, { message: "Maxmimal 250 Buchstaben." })
		.trim(),
	vpe: z
		.string({ message: "Verpackungsmenge ist erforderlich." })
		.min(1, { message: "Mindestens eine einstellige Zahl." })
		.max(6, { message: "Maxmimal eine sechsstellige Zahl." })
		.trim(),
	einheit: z
		.string({ message: "Einheit ist erforderlich." })
		.trim(),
	preis: z
		.string({ message: "Stundensatz ist erforderlich." })
		.min(1, { message: "Mindestens eine einstellige Zahl." })
		.max(7, { message: "Maxmimal siebenstellige Zahl." })
		.trim()
});
