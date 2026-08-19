import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Sharing Heli",
  alternates: {
    canonical: null
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <section className="band band-cream">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[4.5rem] font-bold leading-none text-accent sm:text-[6rem]">404</p>
          <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-navy sm:text-[2.6rem]">
            Page not found
          </h1>
          <p className="mt-5 text-[15px] leading-[1.85] text-[var(--muted)]">
            The page you are looking for is unavailable. Explore our helicopter tours, services or contact desk to
            continue.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inquiry-button">
              Go home
            </Link>
            <Link href="/tours" className="outline-button">
              View tours
            </Link>
            <Link href="/contact" className="outline-button">
              Contact desk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
