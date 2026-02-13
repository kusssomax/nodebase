"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());
  console.log(data);

  const createWorkflow = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center flex-col justify-center">
      {JSON.stringify(data)}
      <Button disabled={createWorkflow.isPending} onClick={() => createWorkflow.mutate()}>Create Workflow</Button>
      <LogoutButton />
    </div>
  )
}

export default Page;