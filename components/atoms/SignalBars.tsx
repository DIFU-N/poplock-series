export default function SignalBars({ signal }: { signal: number }) {
  return (
    <span className="signal-bars flex items-end gap-0.75">
      {[1, 2, 3, 4, 5].map((n) => {
        const value = signal - (n-1) * 2;

        return (
          <i key={n} 
          className={
            value >= 2 
            ? "full" 
            : value === 1 
              ? "half"
              : ""
            } />
        )
      }
    )}
    </span>
  );
}
