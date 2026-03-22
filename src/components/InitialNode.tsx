"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { PlaceholderNode } from "@/components/reactFlow/placeholder-node";
import { WorkflowNode } from "@/components/WorkflowNode";
import { NodeSelector } from "@/components/NodeSelector";

export const InitialNode = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <WorkflowNode
        showToolbar={false}
        name="Initial Node"
        description="Click to add a new node"
      >
        <PlaceholderNode {...props} onClick={() => setSelectorOpen(true)}>
          <div className="flex items-center justify-center cursor-pointer">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
});

InitialNode.displayName = "InitialNode";
