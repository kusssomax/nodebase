"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const SubscriptionPage = () => {
  const trpc = useTRPC();
  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI test successful");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return <Button onClick={() => testAi.mutate()}>Test AI</Button>;
};

export default SubscriptionPage;
