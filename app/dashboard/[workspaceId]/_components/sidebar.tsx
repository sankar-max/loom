"use client"

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UseLoomQuery } from "@/hooks/useLoomQuery";
import { Menu } from "lucide-react";
import { getUserWorkspace, GetUserWorkspaceReturnType } from "../_actions/getUserWorkspace";

type Props = {
 activeWorkspaceId: string
}
export const Sidebar = ({ activeWorkspaceId }: Props) => {

 const { data } = UseLoomQuery({
  queryKey: ["workspace"],
  queryFn: () => getUserWorkspace(),
 });

 const workspace = (data || {}) as {
  subscription: {
   plan: string;
  };
  workspace: Array<{
   id: string;
   name: string;
   type: string;
  }>;
  members: Array<any>; // Assuming members is an array of any type, you can replace `any` with a more specific type if needed
 };
 console.log(workspace?.workspace[0].name)
 return (
  <div className="full">
   <div className="fixed my-4">

    <h1 className="text-xl font-semibold " >{workspace?.workspace[0].name}</h1>
    <Sheet>
     <SheetTrigger
      asChild
      className="ml-2"
     >
      <Button
       variant={'ghost'}
       className="mt-[2px]"
      >
       <Menu />
      </Button>
     </SheetTrigger>
     <SheetContent
      side={'left'}
      className="p-0 w-fit h-full"
     >
     </SheetContent>
    </Sheet>
   </div>
   <div className="md:block hidden h-full"></div>
  </div >
 );
}
