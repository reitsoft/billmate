import { z } from "zod";

export default z.object({
	name: z
		.string({ required_error: "Komponentenname ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(64, { message: "Maxmimal 64 Buchstaben." })
		.trim(),
	beschreibung: z
		.string({ required_error: "Beschreibung ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(250, { message: "Maxmimal 250 Buchstaben." })
		.trim()
});
