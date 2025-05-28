# Lumina Light Node Start/Stop Feature Implementation Guide

## 📋 **Feature Overview**

Added manual start/stop control for Lumina light node sync with visual buttons and proper state management. Users must now click "Start" to begin syncing and can stop during sync process.

## 🎯 **Key Changes Summary**

### **1. New SVG Components Created**

-   `src/macros/SVGs/LuminaStartSVG.jsx` - Green play button icon
-   `src/macros/SVGs/LuminaStopSVG.jsx` - Red stop button with X icon

### **2. Context Provider Updates**

-   `src/components/Lumina/AutoLuminaContext.js` - Modified for manual control instead of auto-initialization

### **3. Hook Updates**

-   `src/components/Lumina/hooks/useLuminaNode.js` - Added manual start/stop functionality and idle state

### **4. UI Component Updates**

-   `src/components/Lumina/DynamicBlockNumberDisplay.jsx` - Added start/stop buttons and idle state handling
-   `src/components/Lumina/BlockNumberDisplay.jsx` - Removed auto-initialization logic

## 📁 **Files to Create/Modify**

### **File 1: `src/macros/SVGs/LuminaStartSVG.jsx`** (NEW)

```jsx
const LuminaStartSVG = () => {
	return (
		<svg width='12' height='14' viewBox='0 0 12 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M1 1L11 7L1 13V1Z' stroke='#0F8702' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

export default LuminaStartSVG;
```

### **File 2: `src/macros/SVGs/LuminaStopSVG.jsx`** (NEW)

```jsx
const LuminaStopSVG = () => {
	return (
		<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M10.1 5.9L5.9 10.1M5.9 5.9L10.1 10.1M1.4102 11.3082C1.14763 11.0457 1.00008 10.6897 1 10.3184V5.6816C1.00008 5.31033 1.14763 4.95429 1.4102 4.6918L4.6918 1.4102C4.95429 1.14763 5.31033 1.00008 5.6816 1H10.3184C10.6897 1.00008 11.0457 1.14763 11.3082 1.4102L14.5898 4.6918C14.8524 4.95429 14.9999 5.31033 15 5.6816V10.3184C14.9999 10.6897 14.8524 11.0457 14.5898 11.3082L11.3082 14.5898C11.0457 14.8524 10.6897 14.9999 10.3184 15H5.6816C5.31033 14.9999 4.95429 14.8524 4.6918 14.5898L1.4102 11.3082Z'
				stroke='#F63E58'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default LuminaStopSVG;
```

### **File 3: `src/components/Lumina/AutoLuminaContext.js`** (MODIFY)

**Key Changes:**

-   Remove `shouldInitialize` prop
-   Add `isNodeStarted` state
-   Add `startNode` and `stopNode` functions
-   Change context value to object with `{ node, isNodeStarted, startNode, stopNode, initError }`
-   Only spawn node, don't auto-start sync

**Critical Functions to Add:**

```jsx
const startNode = useCallback(async () => {
	if (!lumina || isNodeStarted) return false;
	try {
		console.log("Starting Lumina node sync...");
		setIsNodeStarted(true);
		return true;
	} catch (error) {
		console.error("Failed to start node:", error);
		setIsNodeStarted(false);
		return false;
	}
}, [lumina, isNodeStarted]);

const stopNode = useCallback(async () => {
	if (!lumina || !isNodeStarted) return false;
	try {
		console.log("Stopping Lumina node sync...");
		setIsNodeStarted(false);
		return true;
	} catch (error) {
		console.error("Failed to stop node:", error);
		return false;
	}
}, [lumina, isNodeStarted]);
```

**Updated Provider:**

```jsx
export function AutoLuminaContextProvider({ children }) {
	const [lumina, setLumina] = useState(null);
	const [isNodeStarted, setIsNodeStarted] = useState(false);
	// ... other state

	const contextValue = {
		node: lumina,
		isNodeStarted,
		startNode,
		stopNode,
		initError,
	};

	return <AutoLuminaContext.Provider value={contextValue}>{children}</AutoLuminaContext.Provider>;
}
```

### **File 4: `src/components/Lumina/hooks/useLuminaNode.js`** (MODIFY)

**Key Changes:**

-   Change initial status from `"initializing"` to `"idle"`
-   Update context usage: `const context = useContext(AutoLuminaContext); const node = context?.node;`
-   Add new state properties: `isNodeStarted`, `startNodeFn`, `stopNodeFn`
-   Add manual start/stop functions
-   Update effects to only run when `isNodeStarted` is true
-   Add cleanup effect when node is stopped
-   Update return object with new properties

**Updated Hook Structure:**

```jsx
export const useLuminaNode = () => {
	const context = useContext(AutoLuminaContext);
	const node = context?.node;
	const isNodeStarted = context?.isNodeStarted;
	const startNodeFn = context?.startNode;
	const stopNodeFn = context?.stopNode;

	const [status, setStatus] = useState("idle"); // Start with idle status
	// ... other state

	// Start node function
	const startNode = useCallback(async () => {
		if (!startNodeFn) return false;
		const success = await startNodeFn();
		if (success) {
			setStatus("initializing");
		}
		return success;
	}, [startNodeFn]);

	// Stop node function
	const stopNode = useCallback(async () => {
		if (!stopNodeFn) return false;

		// Clean up event listeners and polling
		if (eventsRef.current) {
			console.log("Closing event channel");
			eventsRef.current.close();
			eventsRef.current = null;
		}

		// Reset all state
		nodeActuallyStartedRef.current = false;
		isPollingRef.current = false;
		minSyncTimeRef.current = null;
		setStatus("idle");
		setBlockNumber(null);
		setSyncProgress(0);
		setDisplayProgress(0);
		setConnectedPeers([]);
		setError(null);

		const success = await stopNodeFn();
		return success;
	}, [stopNodeFn]);

	// ... rest of hook logic
};
```

**Critical Return Properties:**

```jsx
return {
	status,
	blockNumber,
	error,
	syncProgress: displayProgress,
	actualSyncProgress: syncProgress,
	connectedPeers,
	isConnected: status === "connected",
	isSyncing: status === "syncing",
	isInitializing: status === "initializing",
	isIdle: status === "idle",
	hasError: status === "error",
	syncInfo: statsRef.current.syncInfo,
	startNode,
	stopNode,
	canStart: node && !isNodeStarted,
	canStop: node && isNodeStarted && status !== "connected",
};
```

### **File 5: `src/components/Lumina/DynamicBlockNumberDisplay.jsx`** (MODIFY)

**Key Changes:**

1. **Add new imports:**

```jsx
import LuminaStartSVG from "@/macros/SVGs/LuminaStartSVG";
import LuminaStopSVG from "@/macros/SVGs/LuminaStopSVG";
```

2. **Update hook usage:**

```jsx
const { status, blockNumber, error, isConnected, syncInfo, startNode, stopNode, canStart, canStop, isIdle } = useLuminaNode();
```

3. **Update `getStatusIcon()` function:**

```jsx
const getStatusIcon = () => {
	// Show checkmark if sync is complete or we have a block number and are forced connected
	if (syncComplete || (blockNumber && forceConnected)) return <LuminaCheckmarkSVG />;

	switch (status) {
		case "idle":
			return null; // No icon when idle - user hasn't started yet
		case "initializing":
		case "syncing":
			return <LuminaGradientCircleSVG />;
		case "error":
			return <LuminaErrorSVG />;
		case "connected":
			return <LuminaCheckmarkSVG />;
		default:
			return null; // No icon for unknown states
	}
};
```

4. **Update `getStatusText()` function:**

```jsx
const getStatusText = () => {
	// If sync is complete, always show "Block number"
	if (syncComplete) {
		return "Block number";
	}

	if (forceConnected) return "Block number";

	if (status === "idle") return isMobile ? "Start Light Node" : "Start Light Node";
	if (status === "error") return isMobile ? `Error` : `Error: ${error || "Unknown error"}`;
	if (status === "initializing") return isMobile ? "Initializing" : "Initializing connection";
	if (status === "syncing") return isMobile ? "Syncing" : "Syncing Light Node";
	if (status === "connected") return "Block number";
	return isMobile ? "Start Light Node" : "Start Light Node";
};
```

5. **Update width calculations:**

```jsx
const getTargetWidth = () => {
	if (isMobile) {
		if (syncComplete && blockNumber) return "120px"; // Increased width for block number on mobile
		if (status === "syncing") return "104px"; // Increased width for percentage on mobile
		if (status === "idle") return "180px"; // Increased width for idle state with start button on mobile (no icon)
		return "110px"; // Width without block number on mobile
	} else {
		if (syncComplete && blockNumber) return "320px"; // Width with block number on desktop
		if (status === "syncing") return "380px"; // Increased width for percentage + stop button on desktop
		if (status === "idle") return "320px"; // Increased width for idle state with start button on desktop (no icon)
		return "230px"; // Width without block number on desktop
	}
};
```

6. **Update container className:**

```jsx
className={`flex items-center gap-x-2 sm:gap-x-3 h-[40px] sm:h-[44px] bg-[#1A191B] rounded-full ${
	status === "idle" ? "pl-4 sm:pl-6" : "pl-[10px]"
} ${
	showStartButton ? "pr-1.5 sm:pr-1.5" : showStopButton ? "pr-1.5 sm:pr-1.5" : "pr-4 sm:pr-[5px]"
} py-0.5 sm:py-1 text-white overflow-hidden`}
```

7. **Update icon rendering:**

```jsx
{
	/* Status Icon */
}
{
	getStatusIcon() && getStatusIcon();
}
```

8. **Add button logic:**

```jsx
// Add these variables
const showStartButton = showContent && canStart && status === "idle";
const showStopButton = showContent && canStop && (status === "syncing" || status === "initializing");

// Add these handlers
const handleStart = useCallback(async () => {
	await startNode();
}, [startNode]);

const handleStop = useCallback(async () => {
	await stopNode();
}, [stopNode]);
```

9. **Update margin calculation:**

```jsx
animate={{
	marginRight: showStartButton ? "50px" : showStopButton ? "46px" : showButton ? "46px" : "10px",
}}
```

10. **Add button components in control buttons section:**

```jsx
{
	/* Control Buttons - Absolutely positioned */
}
<div className='absolute right-0 top-0 bottom-0 flex items-center'>
	<AnimatePresence mode='wait'>
		{/* Start Button */}
		{showStartButton && (
			<motion.button
				key='start-button'
				initial={{ opacity: 0, scale: 0.9, x: 50 }}
				animate={{ opacity: 1, scale: 1, x: 0 }}
				exit={{ opacity: 0, scale: 0.9, x: 30 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					mass: 1,
					duration: 0.7,
				}}
				onClick={handleStart}
				className='hidden sm:flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#0F870229] hover:bg-[#0F87024D] overflow-hidden z-10'
				aria-label='Start light node sync'
				style={{
					willChange: "opacity, transform",
					transform: "translateZ(0)",
				}}
			>
				<LuminaStartSVG className='translate-x-0.5' />
			</motion.button>
		)}

		{/* Stop Button */}
		{showStopButton && (
			<motion.button
				key='stop-button'
				initial={{ opacity: 0, scale: 0.9, x: 50 }}
				animate={{ opacity: 1, scale: 1, x: 0 }}
				exit={{ opacity: 0, scale: 0.9, x: 30 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					mass: 1,
					duration: 0.7,
				}}
				onClick={handleStop}
				className='hidden sm:flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#F63E5829] hover:bg-[#F63E584D] overflow-hidden z-10'
				aria-label='Stop light node sync'
				style={{
					willChange: "opacity, transform",
					transform: "translateZ(0)",
				}}
			>
				<LuminaStopSVG />
			</motion.button>
		)}

		{/* Explorer Link */}
		{showButton && (
			<motion.a
				key='explorer-link'
				initial={{ opacity: 0, scale: 0.9, x: 50 }}
				animate={{ opacity: 1, scale: 1, x: 0 }}
				exit={{ opacity: 0, scale: 0.9, x: 30 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 15,
					mass: 1,
					duration: 0.7,
				}}
				href={`https://celenium.io/block/${blockNumber}`}
				target='_blank'
				rel='noopener noreferrer'
				className='hidden sm:flex group flex-shrink-0 relative items-center justify-center rounded-full transform transition-colors duration-200 size-[36px] bg-[#2E2C31] hover:bg-[#3E3C41] overflow-hidden z-10'
				aria-label='View block details'
				style={{
					willChange: "opacity, transform",
					transform: "translateZ(0)",
				}}
			>
				<div className='absolute top-0 left-0 w-full h-full transition-transform'>
					<div className='absolute top-0 left-0 w-full h-full transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full'>
						<div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
							<LuminaDiagonalArrowSVG />
						</div>
						<div className='absolute flex items-center justify-center w-full h-full top-full right-full'>
							<LuminaDiagonalArrowSVG />
						</div>
					</div>
				</div>
			</motion.a>
		)}
	</AnimatePresence>
</div>;
```

11. **Update wrapper component:**

```jsx
// Wrapper component that provides the context and initializes the node
const DynamicBlockNumberDisplay = ({ onAnimationComplete }) => {
	return (
		<AutoLuminaContextProvider>
			<BlockNumberDisplayInternal onAnimationComplete={onAnimationComplete} />
		</AutoLuminaContextProvider>
	);
};
```

### **File 6: `src/components/Lumina/BlockNumberDisplay.jsx`** (MODIFY)

**Key Changes:**

-   Remove `shouldInitialize` logic
-   Simplify wrapper component
-   Remove `setShouldInitialize` state and related effects

**Updated wrapper:**

```jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Simple loading state display - completely hidden initially
const LoadingDisplay = () => {
	// Completely invisible during initial load
	return null;
};

// Dynamically load the block number display component
const DynamicBlockNumberDisplay = dynamic(() => import("./DynamicBlockNumberDisplay"), {
	ssr: false,
	loading: () => <LoadingDisplay />,
});

// Main component that renders either the dynamic block display or nothing during initial load
const LuminaBlockNumber = ({ onAnimationComplete }) => {
	// Track if component is mounted (client-side only)
	const [isMounted, setIsMounted] = useState(false);

	// Only enable dynamic import on client-side
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Return nothing until mounted (completely hidden during initial load)
	if (!isMounted) {
		return null;
	}

	// Render the dynamic component when mounted
	return <DynamicBlockNumberDisplay onAnimationComplete={onAnimationComplete} />;
};

export default LuminaBlockNumber;
```

## 🎨 **Visual States Flow**

1. **Idle**: `[Start Light Node] [▶️]` (no spinning icon)
2. **Initializing**: `[🔄] [Initializing] [❌]` (with spinning icon)
3. **Syncing**: `[🔄] [Syncing Light Node] [45.67%] [❌]` (with spinning icon)
4. **Connected**: `[✅] [Block number] [1,234,567] [↗️]` (checkmark icon)

## 🔧 **Button Styling Details**

-   **Start Button**: `bg-[#0F870229] hover:bg-[#0F87024D]` with `translate-x-0.5` for icon
-   **Stop Button**: `bg-[#F63E5829] hover:bg-[#F63E584D]`
-   **Size**: `size-[36px]` for both buttons
-   **Positioning**: Specific padding adjustments for each button type

## ⚠️ **Critical Implementation Notes**

1. **No Auto-Initialization**: Node spawns but doesn't start syncing until user clicks start
2. **State Management**: Use `isNodeStarted` from context, not just hook status
3. **Cleanup**: Proper cleanup of event listeners and polling when stopped
4. **Button Visibility**: Start/stop buttons hidden once sync completes
5. **Responsive**: Buttons only show on desktop (`hidden sm:flex`)
6. **Icon Positioning**: Start button icon needs `translate-x-0.5` for centering
7. **Linting Fix**: Add `status` and `connectedPeers.length` to polling effect dependencies

## 🧪 **Testing Checklist**

-   [ ] Initial state shows "Start Light Node" with no spinning icon
-   [ ] Start button appears and functions
-   [ ] Clicking start begins sync with spinning icon
-   [ ] Stop button appears during sync and functions
-   [ ] Clicking stop returns to idle state
-   [ ] Sync completion shows block number with explorer link
-   [ ] No buttons visible once sync completes
-   [ ] Proper button positioning (not hanging off edges)
-   [ ] Responsive behavior on mobile/desktop
-   [ ] No linting errors
-   [ ] Proper cleanup when stopping

## 🚀 **Implementation Steps**

1. Create the two new SVG components
2. Update AutoLuminaContext.js with manual control
3. Update useLuminaNode.js hook with new states and functions
4. Update DynamicBlockNumberDisplay.jsx with buttons and idle state
5. Update BlockNumberDisplay.jsx wrapper
6. Test all states and transitions
7. Verify button positioning and responsiveness
8. Run linting and fix any issues

This guide provides complete reproducibility of the start/stop feature implementation across different branches.
