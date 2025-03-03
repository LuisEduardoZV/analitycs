import { Home } from "../home"

export default function Page({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <Home>
            {children}
        </Home>
    )
}