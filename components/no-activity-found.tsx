import Image from "next/image"

export const NoActivityFound = () => {
  return (
   <div className="flex items-center justify-center">
    <div>
    <Image src="/no-docs.png" alt="" height={350} width={350}/>
    <p className="hidden last:block text-xl font-semibold text-center text-muted-foreground">
        No activity found inside this organization
      </p>
    </div>
   </div> 
  );
};
