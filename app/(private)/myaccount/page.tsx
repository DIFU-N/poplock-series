

const MyAccount = () => {
  return (
    <main>
      <section className="border-b border-line px-6 py-16 sm:py-20 gap-10 flex flex-col">
        <div className="mx-20 max-w-295">
          <div className="mb-4.5 flex items-center gap-2.5 font-mono text-[13px] text-dim">
            <span className="h-1.75 w-1.75 rounded-full bg-paper shadow-[0_0_0_3px_rgba(243,241,234,0.15)]" />
            YOUR ACCOUNT
          </div>
          {/* <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            My ratings
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            Everything you&apos;ve rated, in one place
          </p> */}
        </div>
        {/* <div className="mx-20 max-w-fit">
              <div className="flex gap-px overflow-x-auto border border-line bg-line">
                {yourRatings.map((p) => (
                  <div
                    key={p.blurb}
                    className="flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-ink-2"
                  >
                    <div className="w-fit h-fit">
                      {p.blurb ? (
                        <div>No Image</div>
                      ) : (
                        //   <Image alt={p.title} src={p.blurb} width={300} height={300} />
                        <div>No Image</div>
                      )}
                    </div>
                    <h3 className="font-display text-lg">{p.title}</h3>
                    <p className="grow text-[14.5px] text-[#c9c8c0]">{review.}</p>
                    <div className="flex items-center justify-between border-t border-line pt-1.5">
                      <SignalBars
                        signal={p.yourSignal ? p.yourSignal / 2 : 0}
                      />
                      <span className="font-mono text-xs text-dim">
                        {p.ratedOn ? `${p.yourSignal}/10` : "No Rating"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
        </div> */}
      </section>

      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-20 max-w-295">
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            My Must-Havs
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            The Must-Hav lists you have created
          </p>
        </div>
      </section>
      {/* <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-20 max-w-295">
          <h1 className="mb-3 font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
            My Must-Havs
          </h1>
          <p className="max-w-140 text-[17px] text-[#c9c8c0]">
            The Must-Hav lists you have created
          </p>
        </div>
      </section> */}
    </main>
  );
};

export default MyAccount;
