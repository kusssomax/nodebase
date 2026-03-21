import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWorkflowsParams } from "./useWorkflowsParams";

export const useSuspenseWorkflows = () => {

    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));

}

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} created successfully`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }))

};

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} deleted successfully`);
            queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryFilter({ id: data.id })
            )
        },
        onError: (error) => {
            toast.error(error.message);
        }
    }));
}


/**
 * Hook to fetch single workflow useing suspense
 */

export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
}



/**
 * Hook to update workflow name
 */
export const useUpdateWorkflowName = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} updated successfully`);
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions({}));
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryOptions({ id: data.id })
            )
        },
        onError: (error) => {
            toast.error(`Failed to update workflow name: ${error.message}`);
        }
    }))

};