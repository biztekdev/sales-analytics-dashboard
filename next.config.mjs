// // // // /** @type {import('next').NextConfig} */
// // // // const nextConfig = {
// // // //   reactStrictMode: true,
// // // //   experimental: {
// // // //     // Disable static optimization for pages that use client-side features
// // // //     staticPageGenerationTimeout: 1000,
// // // //   },
// // // //   // Ensure proper handling of client components
// // // //   compiler: {
// // // //     // Remove console logs in production
// // // //     removeConsole: process.env.NODE_ENV === 'production',
// // // //   },
// // // // };

// // // // export default nextConfig;
// // // /** @type {import('next').NextConfig} */
// // // const nextConfig = {
// // //   reactStrictMode: true,

// // //   experimental: {
// // //     staticPageGenerationTimeout: 1000,
// // //   },

// // //   // Disable Next.js default Websocket overlay (error popup)
// // //   devIndicators: {
// // //     buildActivity: false,
// // //     buildActivityPosition: "bottom-right",
// // //   },

// // //   webpackDevMiddleware: (config) => {
// // //     config.watchOptions = {
// // //       ignored: "**/node_modules/**",
// // //     };
// // //     return config;
// // //   },

// // //   compiler: {
// // //     removeConsole: process.env.NODE_ENV === "production",
// // //   },
// // // };

// // // export default nextConfig;
// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,

// //   // only add if you Really need to remove console in production
// //   compiler: {
// //     removeConsole: process.env.NODE_ENV === "production"
// //   },

// //   // agar tumne file extensions change kiye hain then:
// //   experimental: {
// //     serverActions: {
// //       bodySizeLimit: "2mb"
// //     }
// //   }
// // };

// // export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },

//   experimental: {
//     serverActions: {
//       bodySizeLimit: "2mb",
//     },
//   },

//   // **ADD THIS TO HIDE DEV ERROR OVERLAY**
//   webpack: (config, { dev }) => {
//     if (dev) {
//       config.devServer = config.devServer || {};
//       config.devServer.client = config.devServer.client || {};
//       config.devServer.client.overlay = false; // disable overlay
//     }
//     return config;
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // production mai console remove
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = config.devServer || {};
      config.devServer.client = config.devServer.client || {};
      config.devServer.client.overlay = false; // 🚫 Hide red error overlay in local dev
    }
    return config;
  },
};

export default nextConfig;
