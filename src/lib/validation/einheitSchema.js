import { z } from "zod";

export default z.object({
	bezeichnung: z
		.string({ required_error: "Bezeichnung ist erforderlich." })
		.min(2, { message: "Mindestens zwei Buchstaben." })
		.max(48, { message: "Maxmimal 48 Buchstaben." })
		.trim(),
	abkuerzung: z
		.string({ required_error: "Abkürzung ist erforderlich." })
		.min(1, { message: "Mindestens ein Buchstabe." })
		.max(12, { message: "Maxmimal 12 Buchstaben." })
		.trim()
});
