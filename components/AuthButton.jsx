"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { AuthModal } from './AuthModal'
import { signOut } from '@/app/action'

const AuthButton = ({ user }) => {
    const [showAuthModal, setshowAuthModal] = useState(false)

    if (user) {
        return (
            <form action={signOut}>

                <Button
                    variant="ghost"
                    size="sm"
                    type="submit"
                    className="text-gray-300 hover:text-white gap-2 cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>


            </form>
        )
    }

    return (
        <>
            <Button
                onClick={() => setshowAuthModal(true)}
                size="sm"
                className="cursor-pointer rounded-full px-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 gap-2"
            >
                Sign In
                <LogIn className="w-4 h-4" />
            </Button>


            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setshowAuthModal(false)}
            />
        </>
    )
}

export default AuthButton