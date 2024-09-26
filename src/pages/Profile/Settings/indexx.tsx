import { useNavigate } from "react-router-dom"
import { handleUpdateLogin, handleUpdatePass } from "../../../lib/api"
import { IChangeLogin, IChangePassword } from "../../../lib/types"
import { useForm } from "react-hook-form"
import { useState } from "react"

export const Settings = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword & IChangeLogin>()
    const [serverError, setServerError] = useState<string | null>(null)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)


    const onClick = () => {
        setShowPasswordForm(!showPasswordForm)
    }

    const onSubmit = (data: IChangePassword) => {
        handleUpdatePass(data)
            .then(response => {
                if (response.status === 'error' && response.message) {
                    setServerError(response.message)
                } else {
                    console.log('Password updated successfully')
                    navigate('/profile')
                }
            })
    }


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
            <h1>Settings</h1>
            <button onClick={onClick}>Change Password</button>
            {showPasswordForm && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Current Password"
                            {...register("old", {
                                required: "You need to fill your current password"
                            })}
                        />
                        {errors.old && <p className="text-danger">{errors.old.message}</p>}
                    </div>
                    <div>

                        <input
                            type="text"
                            placeholder="New Password"
                            {...register("newpwd", {
                                required: "You need to fill your new password"
                            })}
                        />
                        {errors.newpwd && <p className="text-danger">{errors.newpwd.message}</p>}
                        <button>Submit</button>
                    </div>
                </form>
            )}
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
