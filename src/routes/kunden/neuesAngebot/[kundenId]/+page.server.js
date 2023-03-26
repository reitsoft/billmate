import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import komponenteSchema from "$lib/validation/komponenteSchema";

export const load = async (event) => {
	return {
		form: await superValidate(event, komponenteSchema),
		kunde: await prisma.kunden.findUnique({ where: { id: Number(event.params.kundenId) } }),
		dienstleistungen: await prisma.dienstleistungen.findMany({}),
		material: await prisma.material.findMany({}),
	};
};
