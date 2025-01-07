"use client";

import Script from "next/script";

export default function Plausible() {
	return (
		<>
			<Script
				defer
				data-domain='celestia.org'
				src='https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js'
				strategy='afterInteractive'
			/>
			<Script id='plausible-setup' strategy='afterInteractive'>
				{`
          window.plausible = window.plausible || function() { 
            (window.plausible.q = window.plausible.q || []).push(arguments) 
          }
        `}
			</Script>
		</>
	);
}
