"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import type { Route } from "next";

export function SearchBox() {
	const router = useRouter();

	const debounced = useDebounceCallback((characters: string) => {
		if (characters) {
			router.push(`search?query=${characters}` as Route);
		} else {
			router.push("/" as Route);
		}
	}, 500);

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			debounced((event.target as HTMLInputElement).value);
			if (!(event.target as HTMLInputElement).value.trim()) {
				event.preventDefault();
			}
		}
	};

	return (
		<form>
			<input
				placeholder="Search product"
				type="searchbox"
				role="searchbox"
				name="searchbox"
				onKeyPress={handleKeyPress}
				onChange={(event) => {
					debounced(event.target.value);
				}}
			/>
		</form>
	);
}
