import Image from "next/image";

export const ProductCoverImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<div className="hover: aspect-square overflow-hidden rounded-md border bg-slate-100 bg-slate-50">
			<Image
				width={300}
				height={300}
				alt={alt}
				src={src}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
