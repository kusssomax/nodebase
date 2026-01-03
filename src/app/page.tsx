import prisma from "@/lib/db";

const Page = async () => {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Page;