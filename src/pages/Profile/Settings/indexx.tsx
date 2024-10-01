import {EditLogin} from '../../../components/EditLogin'
import { EditPassword } from '../../../components/EditPassword'
import { Status } from '../../../components/Status'

export const Settings = () => {

    return <>
         <EditLogin />
         <EditPassword />
         <Status user={{ isPrivate: false }}/>
    </>

}