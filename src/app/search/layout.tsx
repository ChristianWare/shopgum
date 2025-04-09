export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>{/* Collections component to go here in the future */}</div>
      <div>{children}</div>
      <div>{/* FilterList component to go here in the future */}</div>
    </>
  );
}
