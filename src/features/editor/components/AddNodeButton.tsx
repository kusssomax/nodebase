"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { NodeSelector } from "@/components/NodeSelector";

export const AddNodeButton = memo(() => {
    const [selectorOpen, setSelectorOpen] = useState(false);


  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        variant="outline"
        size="icon"
        className="bg-background"
        onClick={() => {}}
      >
        <PlusIcon className="size-4" />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";
