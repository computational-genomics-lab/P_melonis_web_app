/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       // test: /\.fai$/, 
//      test: /\.(fna|fai)$/,
//       use: 'file-loader',
//     });

//     return config;
//   },
// };
