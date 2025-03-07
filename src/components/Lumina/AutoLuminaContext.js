import { spawnNode } from "lumina-node";
import { createContext, useEffect, useRef, useState } from "react";

export const AutoLuminaContext = createContext(null);

export function AutoLuminaContextProvider({ children }) {
	const [lumina, setLumina] = useState(null);
	const initialized = useRef(false);

	useEffect(() => {
		const init = async () => {
			const node = await spawnNode();
			setLumina(node);
		};
		if (!initialized.current) {
			initialized.current = true;
			init();
		}
	}, []);

	return <AutoLuminaContext.Provider value={lumina}>{children}</AutoLuminaContext.Provider>;
}
