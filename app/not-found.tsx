import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center space-y-4">
      <h1 className="font-serif text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">未找到对应的框架</p>
      <Button asChild>
        <Link href="/">回到首页</Link>
      </Button>
    </div>
  )
}
