// This script will run after Next.js build on Vercel
// to fix any issues with parentheses in folder paths

const fs = require('fs');
const path = require('path');

// Function to create empty manifests if they're missing
function ensureManifestFiles() {
  console.log('Checking for missing manifest files...');
  
  // The problematic path from the error
  const manifestPath = path.join('.next', 'server', 'app', '(routes)', 'page_client-reference-manifest.js');
  
  // Create the directory structure if it doesn't exist
  const dir = path.dirname(manifestPath);
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create an empty manifest file if it doesn't exist
  if (!fs.existsSync(manifestPath)) {
    console.log(`Creating empty manifest: ${manifestPath}`);
    fs.writeFileSync(manifestPath, 'module.exports = {};\n');
  }
  
  console.log('Manifest check complete');
}

// Function to check and fix build output
function fixBuildOutput() {
  try {
    ensureManifestFiles();
    console.log('Build post-processing completed successfully');
  } catch (error) {
    console.error('Error during build post-processing:', error);
    process.exit(1);
  }
}

// Run the fix
fixBuildOutput(); 