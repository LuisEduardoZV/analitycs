'use client'

import { useDisclosure } from "@heroui/modal"

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
            <section className="relative pt-16 px-10 flex-grow">
                {children}
                <Modal isOpen={isOpen} openChange={onOpenChange} />
            </section>
        </>
    )
}