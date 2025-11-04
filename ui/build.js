#!/usr/bin/env node
/**
 * esbuild configuration with environment variable injection
 * This script builds all React components and injects environment variables
 */

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
const envPath = path.join(__dirname, '.env');
const env = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      // Remove quotes if present
      env[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  console.log('✅ Loaded environment variables from .env');
  console.log('   Variables loaded:', Object.keys(env));
} else {
  console.warn('⚠️  No .env file found, using fallback values');
}

// Create define object for esbuild
// Replace process.env.REACT_APP_* with actual values
const define = {
  'process.env.REACT_APP_RAPIDAPI_KEY': JSON.stringify(env.REACT_APP_RAPIDAPI_KEY || 'YOUR_API_KEY_HERE'),
  'process.env.REACT_APP_RAPIDAPI_HOST': JSON.stringify(env.REACT_APP_RAPIDAPI_HOST || 'cricbuzz-cricket.p.rapidapi.com'),
};

console.log('\n📦 Building React components with environment variables...\n');

// Components to build
const components = [
  { entry: 'src/PlayerInfo/PlayerInfo.jsx', out: 'dist/player-info.js' },
  { entry: 'src/PlayerBattingInfo/PlayerBattingInfo.jsx', out: 'dist/player-batting-info.js' },
  { entry: 'src/PlayerBowlingInfo/PlayerBowlingInfo.jsx', out: 'dist/player-bowling-info.js' },
  { entry: 'src/PlayerNews/PlayerNews.jsx', out: 'dist/player-news.js' },
  { entry: 'src/PlayerCareer/PlayerCareer.jsx', out: 'dist/player-career.js' },
  { entry: 'src/TrendingPlayers/TrendingPlayers.jsx', out: 'dist/trending-players.js' },
  { entry: 'src/ICCRankings/ICCRankings.jsx', out: 'dist/icc-rankings.js' },
  { entry: 'src/CricketRecords/CricketRecords.jsx', out: 'dist/cricket-records.js' },
];

// Build all components
async function buildAll() {
  for (const component of components) {
    try {
      await esbuild.build({
        entryPoints: [component.entry],
        bundle: true,
        format: 'esm',
        outfile: component.out,
        define: define,
        logLevel: 'info',
      });
      console.log(`✅ Built: ${component.out}`);
    } catch (error) {
      console.error(`❌ Error building ${component.entry}:`, error);
      process.exit(1);
    }
  }
  console.log('\n🎉 All components built successfully!\n');
}

buildAll();
