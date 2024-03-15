"use client";
import React, { useState } from "react";

interface Review {
	headline: string;
	content: string;
	rating: number;
	name: string;
	email: string;
}

export const AddReviewForm: React.FC = () => {
	const [review, setReview] = useState<Review>({
		headline: "",
		content: "",
		rating: 0,
		name: "",
		email: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setReview((prevReview) => ({
			...prevReview,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setReview({
			headline: "",
			content: "",
			rating: 0,
			name: "",
			email: "",
		});
	};

	return (
		<form onSubmit={handleSubmit} data-testid="add-review-form">
			<div>
				<label htmlFor="headline">Review headline:</label>
				<input
					type="text"
					id="headline"
					name="headline"
					value={review.headline}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="content">Content:</label>
				<textarea id="content" name="content" value={review.content} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="rating">Rating:</label>
				<input
					type="number"
					id="rating"
					name="rating"
					min={1}
					max={5}
					value={review.rating}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="name">User name:</label>
				<input type="text" id="name" name="name" value={review.name} onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={review.email} onChange={handleChange} />
			</div>
			<button type="submit">Add review</button>
		</form>
	);
};
