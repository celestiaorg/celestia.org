import { Suspense } from "react";

export default function MammothLayout({ children }) {
	return (
		<>
			{/* No Nav component - header excluded */}
			<main id={"main-content"}>
				<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
			</main>
			{/* No Footer component - footer excluded */}
		</>
	);
}
