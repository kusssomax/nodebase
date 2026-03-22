"use client";

import { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseTriggerNode } from "@/features/triggers/components/BaseTriggerNode";
import { MousePointerIcon } from "lucide-react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        name="When clicking 'Execute Workflow'"
        description="Trigger the workflow manually"
        icon={MousePointerIcon}
        // onDoubleClick={() => {}}
        // onSettings={() => {}}
        // status="disabled"
      />
    
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
