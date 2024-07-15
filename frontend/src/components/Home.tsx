export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-7xl py-24">
        <div className="mx-auto text-center">
          <span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              French or Fraud?
            </h2>
            <span className="text-xl tracking-tight text-white">Discover Your French Proficiency – Real or Pretend?</span>
          </span>
          
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Translate French words to English with hints on first letters and word length. 
            <br />
            Gain points for correct answers, lose points for mistakes. 
            <br />
            Reach 20 to win, 0 to lose.
            <br />
            Ready?
          </p>
          <div className="mt-10 flex flex-col items-center lg:flex-row lg:items-center lg:justify-center lg:gap-x-4">
            <a
              href="/play"
              className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Play
            </a>
            <a
              href="/history"
              className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white mt-4 lg:mt-0"
            >
              History
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
