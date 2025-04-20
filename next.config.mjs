let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        pathname: '**',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    serverComponentsExternalPackages: [],
    outputFileTracingExcludes: {
      '*': [
        // Exclude specific files that might cause issues
        '**/node_modules/@swc/core-linux-x64-gnu',
        '**/node_modules/@swc/core-linux-x64-musl',
        '**/node_modules/sharp',
      ],
    },
  },
  // Ensure output tracing includes all necessary files
  outputFileTracing: true,
  // Customize webpack config to ensure compatibility with React 19
  webpack: (config, { isServer }) => {
    // Fix issues with packages that might not be fully compatible with React 19
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add any problematic packages here if needed
      '@radix-ui/react-use-effect-event': new URL('./compatibility/radix-use-effect-event-shim.mjs', import.meta.url).pathname,
    }
    
    return config
  },
  // Add this to help Vercel better understand the project structure
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Provide a more structured output
  productionBrowserSourceMaps: false,
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
