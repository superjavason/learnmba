export function PyramidDiagram() {
  const W = 640
  const H = 380
  // pyramid coords (apex at top center)
  const apex = { x: W / 2, y: 30 }
  const baseLeft = { x: 80, y: 320 }
  const baseRight = { x: W - 80, y: 320 }
  // tier dividers
  const t1 = 110 // top of tier 1 ends here (wider line at this y)
  const t2 = 220
  const t3 = 320

  // helper: x at y on side line
  function leftAt(y: number) {
    const t = (y - apex.y) / (baseLeft.y - apex.y)
    return apex.x + t * (baseLeft.x - apex.x)
  }
  function rightAt(y: number) {
    const t = (y - apex.y) / (baseRight.y - apex.y)
    return apex.x + t * (baseRight.x - apex.x)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* tier 1 (apex) — main thesis */}
        <polygon
          points={`${apex.x},${apex.y} ${leftAt(t1)},${t1} ${rightAt(t1)},${t1}`}
          fill="var(--primary)"
          stroke="var(--card)"
          strokeWidth="2"
        />
        <text x={apex.x} y={t1 - 26} textAnchor="middle" fill="var(--primary-foreground)" fontSize="12" fontWeight="700" style={{ fontFamily: "var(--font-serif)" }}>
          中心思想
        </text>
        <text x={apex.x} y={t1 - 12} textAnchor="middle" fill="var(--primary-foreground)" fontSize="10" opacity="0.85">
          Main Thesis
        </text>

        {/* tier 2 — pillars (3 columns) */}
        <polygon
          points={`${leftAt(t1)},${t1} ${rightAt(t1)},${t1} ${rightAt(t2)},${t2} ${leftAt(t2)},${t2}`}
          fill="#C9A961"
          fillOpacity="0.9"
          stroke="var(--card)"
          strokeWidth="2"
        />
        {/* dividers in tier 2 */}
        <line x1={(leftAt(t1) + rightAt(t1)) / 3 + leftAt(t1)} y1={t1} x2={(leftAt(t2) + rightAt(t2)) / 3 + leftAt(t2)} y2={t2} stroke="var(--card)" strokeOpacity="0.4" />
        <line x1={leftAt(t1) + ((rightAt(t1) - leftAt(t1)) * 2) / 3} y1={t1} x2={leftAt(t2) + ((rightAt(t2) - leftAt(t2)) * 2) / 3} y2={t2} stroke="var(--card)" strokeOpacity="0.4" />
        {[0, 1, 2].map((i) => {
          const xMid = leftAt(t1 + 50) + ((rightAt(t1 + 50) - leftAt(t1 + 50)) / 3) * (i + 0.5)
          return (
            <g key={i}>
              <text x={xMid} y={t1 + 35} textAnchor="middle" fill="var(--primary-foreground)" fontSize="11" fontWeight="700" style={{ fontFamily: "var(--font-serif)" }}>
                论点 {i + 1}
              </text>
              <text x={xMid} y={t1 + 50} textAnchor="middle" fill="var(--primary-foreground)" fontSize="9" opacity="0.8">
                Pillar
              </text>
            </g>
          )
        })}

        {/* tier 3 — facts/data */}
        <polygon
          points={`${leftAt(t2)},${t2} ${rightAt(t2)},${t2} ${rightAt(t3)},${t3} ${leftAt(t3)},${t3}`}
          fill="var(--secondary)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const xMid = leftAt(t2 + 50) + ((rightAt(t2 + 50) - leftAt(t2 + 50)) / 6) * (i + 0.5)
          return (
            <g key={i}>
              <circle cx={xMid} cy={t2 + 38} r="4" fill="var(--accent)" />
              <text x={xMid} y={t2 + 55} textAnchor="middle" fill="var(--muted-foreground)" fontSize="9">
                数据/事实
              </text>
            </g>
          )
        })}

        {/* tier labels on the right */}
        <line x1={rightAt(t1) + 12} y1={apex.y} x2={rightAt(t1) + 12} y2={t1} stroke="var(--accent)" strokeWidth="2" />
        <text x={rightAt(t1) + 18} y={(apex.y + t1) / 2 + 4} fontSize="10" fill="var(--accent)" fontWeight="700">
          顶层 / 结论
        </text>
        <line x1={rightAt(t2) + 12} y1={t1} x2={rightAt(t2) + 12} y2={t2} stroke="var(--accent)" strokeWidth="2" />
        <text x={rightAt(t2) + 18} y={(t1 + t2) / 2 + 4} fontSize="10" fill="var(--accent)" fontWeight="700">
          中层 / 论点
        </text>
        <line x1={rightAt(t3) + 12} y1={t2} x2={rightAt(t3) + 12} y2={t3} stroke="var(--accent)" strokeWidth="2" />
        <text x={rightAt(t3) + 18} y={(t2 + t3) / 2 + 4} fontSize="10" fill="var(--accent)" fontWeight="700">
          底层 / 事实
        </text>

        {/* logic arrows on the left */}
        <text x="40" y="60" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">
          以上统下
        </text>
        <line x1="40" y1="70" x2="40" y2="290" stroke="var(--muted-foreground)" strokeWidth="1" markerEnd="url(#down)" />
        <defs>
          <marker id="down" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 0 L 5 10 z" fill="var(--muted-foreground)" />
          </marker>
        </defs>
        <text x="40" y="305" fontSize="10" fill="var(--muted-foreground)" textAnchor="middle">
          支撑
        </text>
      </svg>

      <div className="mt-3 text-xs text-muted-foreground text-center">
        典型 3 层金字塔：1 个核心结论 → 3-4 个论点 → 多条事实/数据支撑。
      </div>
    </div>
  )
}
