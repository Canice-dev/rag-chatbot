import React from 'react'
import { Button } from './ui/button'
import { Link } from 'lucide-react'

const navbar = () => {
  return (
    <nav className="border-b border-[var(--foreground)]/10 flex">
      <div className="flex container h-16 items-center justify-between gap-4 mx-auto">
        <div>Chat AI</div>
        <div className="flex gap-2">
            <Button variant="outline">Upgrade</Button>
          <Button variant="default">Sign In</Button>
        </div>
      </div>
    </nav>
  )
}

export default navbar