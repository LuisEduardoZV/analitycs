import { Link } from "@heroui/link"

export default function Page() {
  return (
    <section className="flex flex-col w-full gap-4 max-w-[100vw]">
      Pagina inicial
      <Link href="/application">Ingresar a aplicación</Link>
    </section>
  )
}
