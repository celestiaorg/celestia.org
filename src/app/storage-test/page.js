"use client";

import StoragePermissionTest from "@/components/Lumina/StoragePermissionTest";
import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

export default function StorageTestPage() {
	return (
		<div className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-3xl font-bold text-center mb-8'>Storage Permission & Lumina Node Test</h1>

				<div className='mb-8'>
					<h2 className='text-xl font-semibold mb-4'>Lumina Block Number Component</h2>
					<p className='text-gray-600 mb-4'>
						This should load without triggering storage permission popup. The popup should only appear when you click "Start Light Node".
					</p>
					<div className='flex justify-center'>
						<LuminaBlockNumber />
					</div>
				</div>

				<div className='mb-8'>
					<h2 className='text-xl font-semibold mb-4'>Storage Permission Test Utilities</h2>
					<p className='text-gray-600 mb-4'>Use these buttons to test storage permission functionality manually.</p>
					<StoragePermissionTest />
				</div>

				<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
					<h3 className='font-semibold text-yellow-800 mb-2'>Testing Instructions:</h3>
					<ol className='list-decimal list-inside space-y-2 text-yellow-700'>
						<li>Open this page in Firefox - you should NOT see a storage permission popup</li>
						<li>Click "Start Light Node" in the Lumina component above - NOW you should see the popup</li>
						<li>Test with different browsers to verify cross-browser compatibility</li>
						<li>Use the test utilities below to manually test storage permission functions</li>
					</ol>
				</div>
			</div>
		</div>
	);
}
