import { getUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { getWorkspace } from "./_actions/getWorkspace";
import { HydrationBoundary, QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getWorkspaceFolder } from "./_actions/getWorkspaceFolder";
import { getUserVideo } from "./_actions/getUserVideo";
import { getUserWorkspace } from "./_actions/getUserWorkspace";
import { getUserNotification } from "./_actions/getUserNotification";
import { Sidebar } from "./_components/sidebar";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
 children: React.ReactNode;
 params: {
  workspaceId: string;
 };
};

export default async function Layout({ children, params: { workspaceId } }: Props) {
 const { user, status } = await getUser();

 if (!user?.workspace || !user?.workspace.length) {
  return redirect("/auth/sign-in");
 }

 const verifyWorkspace = await getWorkspace(workspaceId);

 if (verifyWorkspace.status !== 200) {
  redirect(`/dashboard/${user?.workspace[0].id}`);
 }

 if (!verifyWorkspace.data) {
  return redirect(`/dashboard/${user?.workspace[0].id}`);
 }

 const query = new QueryClient();
 await query.prefetchQuery({
  queryKey: ["workspace-folder", workspaceId],
  queryFn: () => getWorkspaceFolder(workspaceId),
 });
 await query.prefetchQuery({
  queryKey: ["user-video", workspaceId],
  queryFn: () => getUserVideo(),
 });
 await query.prefetchQuery({
  queryKey: ["user-workspace", workspaceId],
  queryFn: () => getUserWorkspace(),
 });
 await query.prefetchQuery({
  queryKey: ["user-notification", workspaceId],
  queryFn: () => getUserNotification(),
 });

 return (
  <HydrationBoundary state={dehydrate(query)}>
   <div className="flex h-screen w-screen">
    <Sidebar activeWorkspaceId={workspaceId} />
    <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
     {/* <div className="mt-4">{children}</div> */}
    </div>
   </div>
  </HydrationBoundary>
 );
}
