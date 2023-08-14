'use client'

import {FC, useState} from 'react'
import {Button} from './ui/Button'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import {signIn} from 'next-auth/react'




interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
    
    const[isLoading, setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()

    // Google Login //////////////////////////////////////////////////////////////////////////////////////////////
    const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
        
        await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
    //End Google Login /////////////////////////////////////////////////////////////////////////////////////// 
    return(
        <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {/* {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />} */}
        Google
      </Button>
    </div>

    )
}

export default UserAuthForm

