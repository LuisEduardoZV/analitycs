'use client'

import { Link } from "@nextui-org/link"
import { useDisclosure } from "@nextui-org/modal"

import { Modal } from "@/components/modal"
import { Navbar } from "@/components/navbar"

export const Home = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Navbar openModal={onOpen} />
            <main className="pt-16 px-10 flex-grow">
                {children}
                <Modal isOpen={isOpen} openChange={onOpenChange} />
            </main>
            <footer className="w-full flex items-center justify-center py-3">
                <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
                >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
                </Link>
            </footer>
        </>
    )
}