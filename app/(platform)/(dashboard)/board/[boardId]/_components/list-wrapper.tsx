interface ListWrappersProps {
    children: React.ReactNode
}

export const ListWrapper = ({
    children
}: ListWrappersProps) => {
  return (
    <li className="shrink-0 h-full md:w-[272px] select-none">
        {children}
    </li>
  )
}
