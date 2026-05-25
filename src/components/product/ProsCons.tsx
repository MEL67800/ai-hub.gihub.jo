export function ProsCons({ pros, cons }: { pros: string; cons: string }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="rounded-2xl bg-green-50 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-green-800">
          <span>👍</span> 优点
        </h3>
        <ul className="mt-4 space-y-2">
          {pros.split("\n").filter(Boolean).map((item, i) => (
            <li key={i} className="text-sm text-green-700">{item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-red-50 p-6">
        <h3 className="flex items-center gap-2 font-semibold text-red-800">
          <span>👎</span> 缺点
        </h3>
        <ul className="mt-4 space-y-2">
          {cons.split("\n").filter(Boolean).map((item, i) => (
            <li key={i} className="text-sm text-red-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
