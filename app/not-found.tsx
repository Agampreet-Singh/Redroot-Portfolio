import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <div className="wrap py-28 md:py-36">
        <p className="font-mono text-mist">
          <span className="text-red">$</span> curl -I this-page
        </p>
        <p className="font-mono text-mist">HTTP/1.1 404 Not Found</p>
        <h1 className="display mt-8 text-5xl md:text-7xl">Nothing to exploit here.</h1>
        <p className="mt-5 max-w-lg text-lg text-mist">This page doesn't exist or has moved.</p>
        <Link href="/" className="btn btn-red mt-9">Go to the homepage</Link>
      </div>
    </section>
  );
}
