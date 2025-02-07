"use client"

import { HeroUIProvider } from "@heroui/system"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { useRouter } from "next/navigation"
import * as React from "react"

// store
import { AppStore, store } from "@/store"
import { Provider } from "react-redux"

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  const storeRef = React.useRef<AppStore | null>(null)
  if (!storeRef.current) storeRef.current = store()

  return (
    <Provider store={storeRef.current}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </Provider>
  )
}
