import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { useState } from "react"
import { useLoginMutation } from "@/shared/api/auth"
import { IUser } from "@/shared/model/authentication"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { IAuthTokensResponse } from "@/shared/model/authentication"
import { authTokenChange } from "@/shared/hooks/authSlice"
import { useDispatch } from "react-redux"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate()

    const dispatch = useDispatch();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: IUser = { login: username, password };

    try {
        const response = await login(user).unwrap();
        console.log("Login response:", response);

        const tokenData = (response as IAuthTokensResponse)?.data?.token;

        if (tokenData?.Access && tokenData?.Refresh) {
            dispatch(
                authTokenChange({
                    accessToken: tokenData.Access,
                    refreshToken: tokenData.Refresh,
                })
            );

            toast.success("Logged in successfully!");

            navigate("/dashboard"); 
        } else {
            toast.error("Token data is missing in response.");
        }

    } catch (err) {
        toast.error("Login failed. Please check your credentials.");
        console.error("Login error:", err);
    }
};

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome!</CardTitle>
                    <CardDescription>Login to Dozzer Admin Dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                {/* Username Input */}
                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Login Button */}
                                <Button type="submit" variant="outline" className="w-full cursor-pointer" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
