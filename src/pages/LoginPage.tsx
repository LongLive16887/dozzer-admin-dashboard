import { LoginForm } from "@/widgets/login/LoginForm"
import Icon from "/icons/icon-64x64.png"

const LoginPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <img src={Icon} alt="dozzer icon" className="size-8" />
          </div>
          DOZZER ADMIN DASHBOARD
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;