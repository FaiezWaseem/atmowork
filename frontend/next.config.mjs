
/** @type {import('next').NextConfig} */
const nextConfig = {
    exportPathMap: () => ({
        '/': { page: '/' },
        // Exclude the /dashboard/goal/[id] page from static generation
        '/dashboard/goal/[id]': { page: null },
      }),
};

export default nextConfig;
