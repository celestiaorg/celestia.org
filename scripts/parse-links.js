#!/usr/bin/env node

/**
 * Parse linkinator JSON output and generate a broken links report
 *
 * Available fields per link:
 * - url: The checked link
 * - status: HTTP status code
 * - state: OK | BROKEN | SKIPPED
 * - parent: Page containing the link
 * - failureDetails: Array of errors explaining failure
 *
 * Environment variables:
 * - SITE_URL: Production URL to replace localhost (e.g., https://celestia.org)
 */

const fs = require('fs');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'broken-links.txt';
const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

if (!inputFile) {
  console.error('Usage: parse-links.js <input.json> [output.txt]');
  console.error('Environment: SITE_URL=https://celestia.org');
  process.exit(1);
}

/**
 * Replace localhost URL with production URL
 */
function toProductionUrl(url) {
  if (!url) return url;
  return url.replace(/http:\/\/localhost:\d+/g, siteUrl);
}

// Human-readable status descriptions
const STATUS_DESCRIPTIONS = {
  0: 'Connection failed',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  410: 'Gone',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  525: 'SSL Handshake Failed',
};

function getStatusDescription(status) {
  return STATUS_DESCRIPTIONS[status] || `HTTP ${status}`;
}

function getFailureReason(link) {
  if (link.failureDetails && link.failureDetails.length > 0) {
    const detail = link.failureDetails[0];
    if (detail.message) return detail.message;
    if (detail.code) return detail.code;
  }
  return getStatusDescription(link.status);
}

try {
  const raw = fs.readFileSync(inputFile, 'utf8');
  const data = JSON.parse(raw);

  // Filter broken links (state === 'BROKEN')
  const broken = data.links.filter(link => link.state === 'BROKEN');
  const skipped = data.links.filter(link => link.state === 'SKIPPED');
  const ok = data.links.filter(link => link.state === 'OK');

  console.log(`\n📊 Link Check Summary`);
  console.log(`   Total:   ${data.links.length}`);
  console.log(`   ✅ OK:      ${ok.length}`);
  console.log(`   ⏭️  Skipped: ${skipped.length}`);
  console.log(`   ❌ Broken:  ${broken.length}`);

  if (broken.length === 0) {
    console.log('\n✅ No broken links found!\n');
    try { fs.unlinkSync(outputFile); } catch(e) {}
    process.exit(0);
  }

  console.log(`\n❌ Broken Links:\n`);

  let report = `# Broken Links Report\n\n`;
  report += `| Metric | Count |\n`;
  report += `|--------|-------|\n`;
  report += `| Total Scanned | ${data.links.length} |\n`;
  report += `| ✅ OK | ${ok.length} |\n`;
  report += `| ⏭️ Skipped | ${skipped.length} |\n`;
  report += `| ❌ Broken | ${broken.length} |\n\n`;
  report += `## Broken Links\n\n`;

  broken.forEach(link => {
    const reason = getFailureReason(link);
    const prodUrl = toProductionUrl(link.url);
    const prodParent = toProductionUrl(link.parent);

    // Console output (local)
    console.log(`[${link.status}] ${prodUrl}`);
    console.log(`  └─ Reason: ${reason}`);
    console.log(`  └─ Found on: ${prodParent}`);
    console.log('');

    // Markdown report with clickable links
    report += `### ❌ \`${link.status}\` ${reason}\n`;
    report += `- **Broken URL:** [${prodUrl}](${prodUrl})\n`;
    report += `- **Found on:** [${prodParent}](${prodParent})\n`;
    if (link.failureDetails && link.failureDetails.length > 0) {
      const detail = link.failureDetails[0];
      if (detail.code || detail.message) {
        report += `- **Error:** \`${detail.code || detail.message}\`\n`;
      }
    }
    report += `\n`;
  });

  fs.writeFileSync(outputFile, report);
  console.log(`📄 Report saved to ${outputFile}\n`);
  process.exit(1);

} catch (e) {
  console.error('Error parsing linkinator output:', e.message);
  process.exit(1);
}
