import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Sharing Heli",
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <p className="label">404</p>
          <h1 className="font-display text-4xl text-white sm:text-5xl">Page Not Found</h1>
          <p className="copy mt-4 max-w-2xl">
            The page you are looking for is unavailable. Explore our helicopter tours, services, or contact desk to continue your journey.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/" className="inquiry-button">
              Go Home
            </Link>
            <Link href="/tours" className="outline-button">
              View Tours
            </Link>
            <Link href="/contact" className="outline-button">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
