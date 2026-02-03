import LoginForm from "@/features/auth/components/LoginForm";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {

  await requireUnauth();
  
  return <LoginForm />
}

export default Page