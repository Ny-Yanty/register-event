'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export function CompletionMessage() {
  return (
    <Card className="p-8 text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Thank You for Your Interest!
        </h2>
        <p className="text-muted-foreground text-white">
          SpringBoard4Education Team will reach out to participants
        </p>
        <p className="text-sm text-muted-foreground text-white">
          You can expect to hear from us within 2-3 business days.
        </p>
      </div>
      <div className="pt-4">
        <Link href="/">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </div>
    </Card>
  )
}
