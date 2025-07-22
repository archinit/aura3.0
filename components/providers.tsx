'use client'

import { ThemeProvider } from "next-themes";
import { SessionProvider as NextAuthSessionProivder } from "next-auth/react";
import { SessionProvider as CustomSessionProivder } from "@/lib/contexts/session-context";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <NextAuthSessionProivder>
            <CustomSessionProivder>
                <ThemeProvider 
                attribute="class" 
                defaultTheme="system" 
                enableSystem
                disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </CustomSessionProivder>
        </NextAuthSessionProivder>
    )
}