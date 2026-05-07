"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, RotateCcw, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

type Role = "R" | "A" | "C" | "I" | null

interface Task {
  id: string
  name: string
  reference: Record<string, Role>
}

const ROLES_OF_PEOPLE = [
  { id: "pm", name: "产品经理" },
  { id: "eng", name: "工程师" },
  { id: "design", name: "设计师" },
  { id: "mkt", name: "营销" },
  { id: "sales", name: "销售" },
  { id: "legal", name: "法务" },
]

const TASKS: Task[] = [
  {
    id: "spec",
    name: "产品规格定义",
    reference: { pm: "A", eng: "C", design: "C", mkt: "C", sales: "I", legal: "I" },
  },
  {
    id: "build",
    name: "技术开发实施",
    reference: { pm: "C", eng: "A", design: "R", mkt: "I", sales: "I", legal: "I" },
  },
  {
    id: "launch",
    name: "市场推广方案",
    reference: { pm: "C", eng: "I", design: "C", mkt: "A", sales: "C", legal: "C" },
  },
  {
    id: "training",
    name: "销售团队培训",
    reference: { pm: "C", eng: "I", design: "I", mkt: "R", sales: "A", legal: "I" },
  },
  {
    id: "compliance",
    name: "合规审核",
    reference: { pm: "I", eng: "I", design: "I", mkt: "I", sales: "I", legal: "A" },
  },
]

type State = Record<string, Record<string, Role>>

const ROLES_OPTIONS: Role[] = ["R", "A", "C", "I", null]

const ROLE_BG: Record<Exclude<Role, null>, string> = {
  R: "bg-emerald-500 text-white",
  A: "bg-rose-500 text-white",
  C: "bg-amber-500 text-white",
  I: "bg-sky-400 text-white",
}

const ROLE_LABEL: Record<Exclude<Role, null>, string> = {
  R: "执行",
  A: "问责",
  C: "咨询",
  I: "知情",
}

function emptyState(): State {
  const s: State = {}
  TASKS.forEach((t) => {
    s[t.id] = {}
    ROLES_OF_PEOPLE.forEach((p) => {
      s[t.id][p.id] = null
    })
  })
  return s
}

interface ValidationResult {
  taskId: string
  type: "no-A" | "multi-A" | "no-R"
  message: string
}

function validate(state: State): ValidationResult[] {
  const issues: ValidationResult[] = []
  for (const task of TASKS) {
    const row = state[task.id]
    const aCount = Object.values(row).filter((r) => r === "A").length
    const rCount = Object.values(row).filter((r) => r === "R" || r === "A").length
    if (aCount === 0) {
      issues.push({
        taskId: task.id,
        type: "no-A",
        message: `「${task.name}」缺少 A — 必须有且只有 1 个问责人`,
      })
    } else if (aCount > 1) {
      issues.push({
        taskId: task.id,
        type: "multi-A",
        message: `「${task.name}」有 ${aCount} 个 A — 同一任务必须只有 1 个 A`,
      })
    }
    if (rCount === 0) {
      issues.push({
        taskId: task.id,
        type: "no-R",
        message: `「${task.name}」缺少 R — 至少需要 1 个执行人`,
      })
    }
  }
  return issues
}

export function RaciMatrix() {
  const [state, setState] = useState<State>(emptyState)
  const [showRef, setShowRef] = useState(false)

  const setCell = (taskId: string, personId: string) => {
    setState((prev) => {
      const cur = prev[taskId][personId]
      const idx = ROLES_OPTIONS.indexOf(cur)
      const next = ROLES_OPTIONS[(idx + 1) % ROLES_OPTIONS.length]
      return {
        ...prev,
        [taskId]: { ...prev[taskId], [personId]: next },
      }
    })
  }

  const fillReference = () => {
    const ref = emptyState()
    TASKS.forEach((t) => {
      ROLES_OF_PEOPLE.forEach((p) => {
        ref[t.id][p.id] = (t.reference[p.id] as Role) ?? null
      })
    })
    setState(ref)
    setShowRef(true)
  }

  const reset = () => {
    setState(emptyState())
    setShowRef(false)
  }

  const issues = validate(state)
  const isValid = issues.length === 0
  const allFilled = TASKS.every((t) =>
    Object.values(state[t.id]).some((r) => r !== null)
  )

  // accuracy vs reference
  let correctCells = 0
  let totalCells = 0
  TASKS.forEach((t) => {
    ROLES_OF_PEOPLE.forEach((p) => {
      totalCells++
      if (state[t.id][p.id] === (t.reference[p.id] ?? null)) correctCells++
    })
  })

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        点击单元格循环切换 R / A / C / I / 空白。规则：每任务必须只有 1 个 A（最终问责）+ 至少 1 个 R（执行）。下方实时显示规则违反警告。
      </p>

      <div className="rounded-lg border border-border bg-card p-3 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr>
              <th className="text-left font-serif font-bold p-2 sticky left-0 bg-card z-10">
                任务 \ 角色
              </th>
              {ROLES_OF_PEOPLE.map((p) => (
                <th
                  key={p.id}
                  className="p-2 text-center font-serif font-bold text-xs"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TASKS.map((t) => {
              const taskHasIssue = issues.some((i) => i.taskId === t.id)
              return (
                <tr
                  key={t.id}
                  className={cn(
                    "border-t border-border",
                    taskHasIssue && "bg-amber-50/40 dark:bg-amber-950/20"
                  )}
                >
                  <td className="p-2 text-sm sticky left-0 bg-card z-10">
                    <div className="font-medium">{t.name}</div>
                  </td>
                  {ROLES_OF_PEOPLE.map((p) => {
                    const r = state[t.id][p.id]
                    const ref = (t.reference[p.id] as Role) ?? null
                    const showStatus = showRef
                    const isCorrect = r === ref
                    return (
                      <td
                        key={p.id}
                        className="p-2 text-center"
                      >
                        <button
                          onClick={() => setCell(t.id, p.id)}
                          className={cn(
                            "h-9 w-9 rounded-md font-bold text-sm border transition-colors",
                            !r && "bg-background border-border hover:border-accent",
                            r && ROLE_BG[r],
                            r && "border-transparent",
                            showStatus && !isCorrect && "ring-2 ring-rose-500"
                          )}
                          aria-label={`${t.name} - ${p.name}`}
                        >
                          {r ?? ""}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap text-xs">
        <span className="text-muted-foreground mr-1">图例：</span>
        {(["R", "A", "C", "I"] as const).map((r) => (
          <span
            key={r}
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${ROLE_BG[r]}`}
          >
            <span className="font-bold">{r}</span>
            {ROLE_LABEL[r]}
          </span>
        ))}
      </div>

      {/* Validation panel */}
      {allFilled && (
        <div
          className={cn(
            "rounded-lg border-2 p-4",
            isValid
              ? "border-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/25"
              : "border-amber-300 bg-amber-50/40 dark:bg-amber-950/25"
          )}
        >
          {isValid ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <Check className="h-4 w-4" />
              <span className="font-bold text-sm">
                ✓ 通过 RACI 规则校验：每任务恰好 1 个 A + 至少 1 个 R
              </span>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-bold text-sm">
                  发现 {issues.length} 处规则违反
                </span>
              </div>
              <ul className="space-y-1 text-sm">
                {issues.map((iss, i) => (
                  <li key={i} className="text-amber-900 dark:text-amber-200 flex gap-2">
                    <span className="text-amber-600">·</span>
                    <span>{iss.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showRef && (
        <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
          <div className="text-sm">
            <span className="font-bold">参考准确率：</span>
            <span className="font-serif text-xl tabular-nums ml-2">
              {correctCells}/{totalCells}
            </span>
            <span className="text-muted-foreground ml-2">
              （{((correctCells / totalCells) * 100).toFixed(0)}%）
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            红框单元格表示与参考答案不同。RACI 没有“唯一答案”——只要满足规则、能在团队达成共识就行。
          </p>
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <Button onClick={fillReference} variant="outline">
          填入参考答案
        </Button>
        <Button onClick={reset} variant="ghost">
          <RotateCcw className="mr-2 h-3.5 w-3.5" />
          清空重做
        </Button>
      </div>
    </div>
  )
}
