"use client";

import { Position, type NodeProps } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode, useCallback } from "react";
import { BaseNode, BaseNodeContent } from "@/components/reactFlow/base-node";
import { BaseHandle } from "@/components/reactFlow/base-handle";
import { WorkflowNode } from "@/components/WorkflowNode";

interface BaseExecutionNodeProps extends NodeProps {
    name: string;
    description: string;
    icon: LucideIcon | string
    children: ReactNode;
    // status?: NodeStatus;
    onSettings?: () => void;
    onDoubleClick?: () => void;
}

export const BaseExecutionNode = memo(({ id, name, description, icon: Icon, children, onSettings, onDoubleClick }: BaseExecutionNodeProps) => {

    const handleDelete = () => {};

    return (
        <WorkflowNode name={name} description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
        >
            <BaseNode onDoubleClick={onDoubleClick}>
            <BaseNodeContent>
            {
                typeof Icon === "string" ? (
                    <Image src={Icon} alt={name} width={16} height={16} />
                ) : (
                    <Icon className="size-4 text-muted-foreground" />
                )
            }
            {children}
            <BaseHandle type="target" id="taget1" position={Position.Left} />
            <BaseHandle type="source" id="source1" position={Position.Right} />
            </BaseNodeContent>
            </BaseNode>
        </WorkflowNode>
    )
})

BaseExecutionNode.displayName = "BaseExecutionNode";