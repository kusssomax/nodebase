"use client";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/useWorkflows";
import { EntityHeader } from "@/components/EntityComponents";
import { EntityContainer } from "@/components/EntityComponents";
import { useUpgradeModal } from "@/hooks/useUpgadeModal";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <div className="flex flex-1 justify-center items-center">{JSON.stringify(workflows.data, null, 2)}</div>;
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();
  
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      }
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        newButtonLabel="New Workflow"
        onNew={handleCreate}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};


export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {

  return (
    <EntityContainer
    header={<WorkflowsHeader />}
    search={<></>}
    pagination={<></>}
    >
      {children}
    </EntityContainer>
  )
}