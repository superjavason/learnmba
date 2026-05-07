export function MeceTree() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-lg border-2 border-emerald-300/70 bg-emerald-50/40 dark:bg-emerald-950/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
            ✓
          </div>
          <h4 className="font-serif font-bold">好分类（MECE）</h4>
        </div>
        <svg viewBox="0 0 400 240" className="w-full h-auto">
          <g>
            <rect x="150" y="10" width="100" height="36" rx="4" fill="var(--primary)" />
            <text x="200" y="33" textAnchor="middle" fill="var(--primary-foreground)" fontSize="12" fontWeight="700">
              客户
            </text>
            {/* lines */}
            <line x1="200" y1="46" x2="80" y2="100" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1="200" y1="46" x2="200" y2="100" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1="200" y1="46" x2="320" y2="100" stroke="var(--accent)" strokeWidth="1.5" />
            {/* children */}
            {[
              { x: 30, label: "新客户" },
              { x: 150, label: "老客户" },
              { x: 270, label: "流失客户" },
            ].map((c, i) => (
              <g key={i}>
                <rect x={c.x} y="100" width="100" height="34" rx="3" fill="#10b98140" stroke="#10b981" />
                <text x={c.x + 50} y="121" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600">
                  {c.label}
                </text>
              </g>
            ))}
            <text x="200" y="180" textAnchor="middle" fill="var(--muted-foreground)" fontSize="11">
              单维度（活跃度）切分
            </text>
            <text x="200" y="198" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">
              ✓ 无交集 · 覆盖全部
            </text>
          </g>
        </svg>
      </div>

      <div className="rounded-lg border-2 border-rose-300/70 bg-rose-50/40 dark:bg-rose-950/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
            ✕
          </div>
          <h4 className="font-serif font-bold">坏分类（混合维度）</h4>
        </div>
        <svg viewBox="0 0 400 240" className="w-full h-auto">
          <g>
            <rect x="150" y="10" width="100" height="36" rx="4" fill="var(--primary)" />
            <text x="200" y="33" textAnchor="middle" fill="var(--primary-foreground)" fontSize="12" fontWeight="700">
              客户
            </text>
            {/* lines */}
            <line x1="200" y1="46" x2="60" y2="100" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="200" y1="46" x2="200" y2="100" stroke="#dc2626" strokeWidth="1.5" />
            <line x1="200" y1="46" x2="340" y2="100" stroke="#dc2626" strokeWidth="1.5" />
            {/* children with overlap markers */}
            {[
              { x: 10, label: "男性" },
              { x: 150, label: "女性" },
              { x: 290, label: "高净值" },
            ].map((c, i) => (
              <g key={i}>
                <rect x={c.x} y="100" width="100" height="34" rx="3" fill="#fca5a560" stroke="#dc2626" />
                <text x={c.x + 50} y="121" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="600">
                  {c.label}
                </text>
              </g>
            ))}
            {/* overlap arc */}
            <path d="M 200 145 Q 200 175 290 158" stroke="#dc2626" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            <text x="240" y="190" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="700">
              交集：女性高净值
            </text>
            <text x="200" y="215" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="700">
              ✕ 性别 + 收入 双维度
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
