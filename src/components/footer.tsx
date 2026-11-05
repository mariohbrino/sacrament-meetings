export default async function Footer() {
  "use cache";

  return (
    <footer className="border-border bg-secondary text-foreground border-t py-6">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()} | Sacrament Meetings | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
