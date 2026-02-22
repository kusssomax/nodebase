"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("job is queued");
    }, 
    onError: (error) => {
      toast.error(error.message);
    }
  }));

  return (
    <div className="min-h-screen min-w-screen flex items-center flex-col justify-center">
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>Test AI</Button>
      {JSON.stringify(data)}
      <Button disabled={createWorkflow.isPending} onClick={() => createWorkflow.mutate()}>Create Workflow</Button>
      <LogoutButton />
    </div>
  )
}

export default Page;