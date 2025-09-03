import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "Amazonbot",
                disallow: ["/"],
            },
            {
                userAgent: "Applebot-Extended",
                disallow: ["/"],
            },
            {
                userAgent: "Bytespider",
                disallow: ["/"],
            },
            {
                userAgent: "CCBot",
                disallow: ["/"],
            },
            {
                userAgent: "ClaudeBot",
                disallow: ["/"],
            },
            {
                userAgent: "Google-Extended",
                disallow: ["/"],
            },
            {
                userAgent: "GPTBot",
                disallow: ["/"],
            },
            {
                userAgent: "meta-externalagent",
                disallow: ["/"],
            },
            {
                userAgent: "*",
                allow: ["/"],
                disallow: ["/api/"],
            },
        ],
        sitemap: "https://utilities-webapp.vercel.app/sitemap.xml",
    }
}
