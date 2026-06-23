export default function ExpandableIntro({ children }: { children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="text-red-800 text-sm font-medium cursor-pointer hover:underline list-none">
        <span className="group-open:hidden">Read more ▼</span>
        <span className="hidden group-open:inline">See less ▲</span>
      </summary>
      <div className="mt-2">
        {children}
      </div>
    </details>
  );
}
