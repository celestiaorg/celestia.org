"use client";

import { useState } from "react";
import {
	isPersistentStorageSupported,
	isPersistentStorageGranted,
	requestPersistentStorage,
	getStorageEstimate,
	checkStorageSpace,
} from "@/utils/persistentStorage";

/**
 * Test component to verify storage permission functionality
 * This component can be used to test the storage permission flow
 */
const StoragePermissionTest = () => {
	const [testResults, setTestResults] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const runTests = async () => {
		setIsLoading(true);
		const results = {};

		try {
			// Test 1: Check if persistent storage is supported
			results.isSupported = isPersistentStorageSupported();
			console.log("Persistent storage supported:", results.isSupported);

			// Test 2: Check if already granted (should not trigger popup)
			if (results.isSupported) {
				results.isAlreadyGranted = await isPersistentStorageGranted();
				console.log("Already granted:", results.isAlreadyGranted);
			}

			// Test 3: Get storage estimate
			results.storageEstimate = await getStorageEstimate();
			console.log("Storage estimate:", results.storageEstimate);

			// Test 4: Check storage space
			results.storageSpace = await checkStorageSpace();
			console.log("Storage space check:", results.storageSpace);

			setTestResults(results);
		} catch (error) {
			console.error("Test error:", error);
			results.error = error.message;
			setTestResults(results);
		} finally {
			setIsLoading(false);
		}
	};

	const requestPermission = async () => {
		setIsLoading(true);
		try {
			const result = await requestPersistentStorage();
			console.log("Permission request result:", result);
			setTestResults((prev) => ({ ...prev, permissionResult: result }));
		} catch (error) {
			console.error("Permission request error:", error);
			setTestResults((prev) => ({ ...prev, permissionError: error.message }));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='p-4 bg-gray-100 rounded-lg max-w-2xl mx-auto mt-8'>
			<h2 className='text-xl font-bold mb-4'>Storage Permission Test</h2>

			<div className='space-y-4'>
				<button
					onClick={runTests}
					disabled={isLoading}
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
				>
					{isLoading ? "Running Tests..." : "Run Storage Tests"}
				</button>

				<button
					onClick={requestPermission}
					disabled={isLoading}
					className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ml-2'
				>
					{isLoading ? "Requesting..." : "Request Permission (Will Show Popup in Firefox)"}
				</button>

				{Object.keys(testResults).length > 0 && (
					<div className='mt-4 p-4 bg-white rounded border'>
						<h3 className='font-semibold mb-2'>Test Results:</h3>
						<pre className='text-sm overflow-auto'>{JSON.stringify(testResults, null, 2)}</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export default StoragePermissionTest;
