import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { useState } from "react"
import { useLoginMutation } from "@/shared/api/auth"
import { IUser } from "@/shared/model/authentication"
import { toast } from "sonner"
import { replace, useNavigate } from "react-router-dom"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const user: IUser = { login: username, password }

        try {

            const response = await login(user).unwrap()
            console.log(response)

            if (!response.error) {
                toast.success("Logged successfully!");
            }

            navigate("/",{ replace: true })

        } catch (err) {
            toast.error("Something went wrong!");
            console.error("Login failed", err)
        }
    }

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
