import { useState } from "react";

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const payload = await res.json()
            localStorage.setItem("token", payload.token)
            localStorage.setItem("user",JSON.stringify(payload.user))
            console.log(localStorage.getItem("user"))
        } catch (e) {
            return { ok: false, message: e.message }
        }
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>email</label>
                    <input type=" email" required value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>password</label>
                    <input type=" password" required value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}