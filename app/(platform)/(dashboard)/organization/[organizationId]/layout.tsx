import { auth } from "@clerk/nextjs";
import { OrgCtrl } from "./_components/org-ctrl"
import { startCase } from "lodash";

export async function generateMetadata() {
  const {orgSlug} = auth();

  return {
    title: startCase(orgSlug || "Organization")
  }
}

const Markinglayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <>
    <OrgCtrl />
     {children}
    </>
  )
}

export default Markinglayout