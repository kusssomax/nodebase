"use client";

import { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "@/features/executions/components/BaseExecutionNode";

type HttpRequestNodeData = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : `not configured`;

  return (
    <>
      <BaseExecutionNode
        {...props}
        name="HTTP Request"
        description={description}
        id={props.id}
        icon={GlobeIcon}
        onDoubleClick={() => {}}
        onSettings={() => {}}
      >
        <div>
          <p>{nodeData.endpoint}</p>
        </div>
      </BaseExecutionNode>
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
