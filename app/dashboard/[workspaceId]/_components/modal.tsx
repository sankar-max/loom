'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ModalProps = {
  children: React.ReactNode
  trigger?: string | React.ReactNode  
  className?: string
  title: string | React.ReactNode
  description?: string | React.ReactNode
}
const Modal = ({ children, trigger, className, title, description }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger className={cn("w-full",className)}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
