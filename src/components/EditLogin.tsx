import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { handleUpdateLogin } from "../lib/api"
import { IChangeLogin } from "../lib/types"

export const EditLogin = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IChangeLogin>()
    const [serverError, setServerError] = useState<string | null>(null)
    const [showLoginForm, setShowLoginForm] = useState(false)
    serverError



    const click = () => {
        setShowLoginForm(!showLoginForm)
    }

    const onChange = (data: IChangeLogin) => {

        handleUpdateLogin(data)
            .then(response => {
                if (response.status === 'error' && response.message) {
                    setServerError(response.message)
                } else {
                    console.log('Login updated successfully')
                    navigate('/profile')
                }

            })
    }
    return (
        <>
            <div>

                <button onClick={click}>Change Login</button>
                {showLoginForm && (
                    <form onSubmit={handleSubmit(onChange)}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="New Login"
                                {...register("login", {
                                    required: "You need to fill your new login"
                                })}
                            />
                            {errors.login && <p className="text-danger">{errors.login.message}</p>}
                        </div>
                        <div>

                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "You need to fill your current password"
                                })}
                            />
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            <button>Submit</button>
                        </div>


                    </form>
                )}
            </div>
        </>
    )
}
