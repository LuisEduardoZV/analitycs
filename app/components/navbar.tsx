"use client"

import { Button } from "@heroui/button"
import { useDisclosure } from "@heroui/modal"
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar"
import NextLink from "next/link"

import { HeartFilledIcon, Logo /* SearchIcon */ } from "@/app/components/icons"
import { Modal } from "@/app/components/modal"
import { ThemeSwitch } from "@/app/components/theme-switch"

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <NextUINavbar
        className="shadow-lg w-full max-w-[35%] self-center justify-between top-2 rounded-lg transition-transform-colors-opacity"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-inherit">
                GRADA | Graficador de Datos
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Button
              className="text-sm font-normal text-default-600 bg-default-100"
              startContent={<HeartFilledIcon className="text-primary" />}
              variant="flat"
              onPress={onOpen}
            >
              Cargar Datos
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
      </NextUINavbar>
      <Modal isOpen={isOpen} openChange={onOpenChange} />
    </>
  )
}
