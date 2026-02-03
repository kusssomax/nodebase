import RegisterForm from "@/features/auth/components/RegisterForm";
import { requireUnauth } from "@/lib/auth-utils";

const page = async () => {
  await requireUnauth();
  
  return (
    <div>
        <RegisterForm />
    </div>
  )
}

export default page;