export default function SignalBars({ signal }: { signal: number }) {
  return (
    <span className="signal-bars flex items-end gap-0.75">
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={n <= signal ? "on" : ""} />
      ))}
    </span>
  );
}
