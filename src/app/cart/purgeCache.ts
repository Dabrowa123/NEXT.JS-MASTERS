"use server";

import { revalidatePath } from "next/cache";

export const purgeCache = () => {
	revalidatePath("/cart");
	return null;
};
