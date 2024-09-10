import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../@/components/ui/dialog'
import Button from '../../../component/reusable/button/button'


interface Props{
    onDelete:()=> void
    open: boolean,
    onClose:()=> void
}


const DeleteModal = ({
    onDelete,
    open,
    onClose
}:Props) => {
    return (
        <div>
            <Dialog open={open}
            onOpenChange={onClose}>
                
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Are you sure want to delete this items?</DialogTitle>
                        <DialogDescription>
                           This action can't be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='flex justify-end'>
                        <Button
                            buttonType={'button'}
                            buttonColor={{
                                secondary: true,
                            }} onClick={onDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DeleteModal