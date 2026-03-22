import { NodeType } from "@/generated/prisma/enums";
import type { NodeTypes } from "@xyflow/react";
import { InitialNode } from "@/components/InitialNode";


export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,

} as const satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;