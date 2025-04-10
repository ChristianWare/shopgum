export default function Price({
  amount,
  className,
  currencyCode = "USD",
}: {
  amount: string;
  className?: string;
  currencyCode: string;
} & React.ComponentProps<"p">) {
  return (
    <div>
      <p suppressHydrationWarning={true} className={className}>
        {`${new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: currencyCode,
          currencyDisplay: "narrowSymbol",
        }).format(parseFloat(amount))}`}
        <span>{`${currencyCode}`}</span>
      </p>
    </div>
  );
}
