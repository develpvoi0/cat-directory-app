export function DirectoryHeader({ total }: { total?: number }) {
  return (
    <header>
      <p className="text-[13px] font-bold uppercase tracking-[0.09em] text-ink-subtle">
        {total ? `Directorio · ${total} razas registradas` : "Directorio"}
      </p>
      <h1 className="mt-3 font-display text-[42px] font-bold leading-[0.98] tracking-[-0.035em] sm:text-[68px]">
        Razas de gatos
      </h1>
    </header>
  );
}
