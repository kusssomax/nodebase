"use client";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/useWorkflows";
import { EntityHeader, EntityPagination, EntitySearch, ErrorView, LoadingView, EmptyView, EntityList, EntityItem } from "@/components/EntityComponents";
import { EntityContainer } from "@/components/EntityComponents";
import { useUpgradeModal } from "@/hooks/useUpgadeModal";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/useWorkflowsParams";
import { useEntitySearch } from "@/hooks/useEntitySearch";
import type { Workflow } from "@/generated/prisma/client";
import { Divide, PackageOpenIcon, WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";


export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();

  const { searchValue, onSearchChange } = useEntitySearch({params, setParams});
  return (
    <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search workflows" />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  
  return (
    <EntityList 
    items={workflows.data.items}
    getKey={(item) => item.id}
    renderItem={(item) => <WorkflowsItem data={item} />}
    emptyView={<WorkflowsEmpty />}
    />
  )
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

export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return <EntityPagination page={workflows.data.page} totalPages={workflows.data.totalPages} onPageChange={(page) => setParams({...params, page})} disabled={workflows.isPending} />
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {

  return (
    <EntityContainer
    header={<WorkflowsHeader />}
    search={<WorkflowsSearch />}
    pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
}

export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows" />;
}

export const WorkflowsEmpty = () => {
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
    <EmptyView message="You haven't created any workflows yet" onNew={handleCreate} />
    </>
  )
}

export const WorkflowsItem = ({ data }: { data: Workflow }) => {

  const removeWorkflow = useRemoveWorkflow();
  const handleRemove = () => {
    removeWorkflow.mutate({id: data.id})
  }

  return (
    <EntityItem
    href={`/workflows/${data.id}`} 
    title={data.name}
    subtitle={<>
    Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
    &bull; Created {formatDistanceToNow(data.createdAt, { addSuffix: true })}{" "}
    </>}
    image={<div className="size-8 flex items-center justify-center">
      <WorkflowIcon className="size-5 text-muted-foreground" />
    </div>}
    onRemove={handleRemove}
    isRemoving={removeWorkflow.isPending}
    />
  )
}