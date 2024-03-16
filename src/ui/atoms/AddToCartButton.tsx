"use client";

export function AddToCartButton() {
	return (
		<button
			type="submit"
			className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white disabled:cursor-wait disabled:bg-slate-400"
		>
			Add to cart
		</button>
	);
}
