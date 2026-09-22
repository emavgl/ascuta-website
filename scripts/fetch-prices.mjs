#!/usr/bin/env node
// Regenerates public/prices.json from the live Google Play Console data.
//
// Requirements: the `playconsole-cli` tool must be installed and authenticated
// (see `playconsole-cli doctor`). Run with:
//
//   npm run prices

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const PACKAGE_NAME = process.env.GPC_PACKAGE || 'eu.viglianisi.ascuta';
const PRODUCT_ID = process.env.GPC_PRODUCT_ID || 'ascuta_lifetime_pro';
const CURRENCY_DECIMALS = 2;

const here = dirname(fileURLToPath(import.meta.url));
const outputPath = join(here, '..', 'public', 'prices.json');

function amountOf(price) {
  const units = Number.parseInt(price.units || '0', 10);
  const nanos = Number(price.nanos || 0);
  const value = units + nanos / 1e9;
  return Number(value.toFixed(CURRENCY_DECIMALS));
}

function main() {
  const raw = execFileSync(
    'playconsole-cli',
    ['products', 'get', '--product-id', PRODUCT_ID, '-o', 'json'],
    { env: { ...process.env, GPC_PACKAGE: PACKAGE_NAME }, encoding: 'utf8' }
  );
  const product = JSON.parse(raw);

  const options = product.purchaseOptions || [];
  if (options.length === 0) {
    throw new Error(`No purchase options found for ${PRODUCT_ID}`);
  }
  const option = options[0];

  const regions = {};
  for (const region of option.regionalPricingAndAvailabilityConfigs || []) {
    if (region.availability && region.availability !== 'AVAILABLE') continue;
    const price = region.price;
    if (!price || !region.regionCode) continue;
    regions[region.regionCode] = {
      currency: price.currencyCode,
      amount: amountOf(price),
    };
  }

  const newRegions = option.newRegionsConfig || {};
  const fallbackSource = newRegions.usdPrice || newRegions.eurPrice;
  if (!fallbackSource) {
    throw new Error('No USD/EUR fallback price configured for the product');
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    packageName: product.packageName || PACKAGE_NAME,
    productId: product.productId || PRODUCT_ID,
    fallback: {
      currency: fallbackSource.currencyCode,
      amount: amountOf(fallbackSource),
    },
    regions,
  };

  writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `Wrote ${Object.keys(regions).length} regions to ${outputPath} ` +
      `(fallback ${payload.fallback.currency} ${payload.fallback.amount})`
  );
}

main();
