/* eslint-disable @next/next/no-img-element */
export function Logo({ size = 30 }: { size?: number }) {
  return <img src="/images/logo.svg" alt="" width={size} height={size} />;
}
