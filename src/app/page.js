import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/easycollab.png"
          alt="company logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by sharing your ideas.
            {/* <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code> */}
          </li>
          <li className="mb-2">View other people's ideas.</li>
          <li className="mb-2">Get AI recommendations.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
            target="_self"
            rel="noopener noreferrer"
          >
            Sign in
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/signup"
            target="_self"
            rel="noopener noreferrer"
          >
            Sign up
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://easycollab.notion.site/1479867e2dc880959eb7f47f587df44a?v=534eeaee9a7b45f784ff5b0cb9cba345"
          target="_self"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/easycollab-w.png"
            alt="company logo"
            width={16}
            height={16}
          />
          View Ideas
        </a>
      </footer>
    </div>
  );
}
