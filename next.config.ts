import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Ship the syllabus PDF inside the payment functions so it can be attached to emails.
  outputFileTracingIncludes: {
    "/api/payment/verify": ["./public/redroot-syllabus.pdf"],
    "/api/payment/webhook": ["./public/redroot-syllabus.pdf"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
