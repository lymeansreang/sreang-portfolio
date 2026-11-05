/** @type {import('next').NextConfig} */
const isPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1"

const nextConfig = {
  images: { unoptimized: true },
  // `NEXT_PUBLIC_STATIC_PREVIEW=1 npm run build` produces a static export in /out
  ...(isPreview ? { output: "export" } : {}),
}

export default nextConfig
