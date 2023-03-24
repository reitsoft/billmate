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
	stundensatz: z
		.string({ message: "Stundensatz ist erforderlich." })
		.min(1, { message: "Mindestens eine einstellige Zahl." })
		.max(7, { message: "Maxmimal siebenstellige Zahl." })
		.trim()
});
