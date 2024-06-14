import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
function MyDialog({dialogTrigger,children,open,setOpen}) {
  return (
    <Dialog open = {open} onOpenChange={(state)=>setOpen?.(state)}>
  <DialogTrigger asChild>
    {dialogTrigger}
  </DialogTrigger>
  <DialogContent>
    {children}
  </DialogContent>
</Dialog>

  )
}

export default MyDialog
