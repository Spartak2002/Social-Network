import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { IChangePassword } from "../lib/types"
import { handleUpdatePass } from "../lib/api"

export const EditPassword = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword>()
    const [serverError, setServerError] = useState<string | null>(null)
    const [showPasswordForm, setShowPasswordForm] = useState(false)
    serverError

    const handleClick = () => {
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

    
    return (
        <>
            <h1>Settings</h1>
            <button onClick={handleClick}>Change Password</button>
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
            
        </>
    )
}
