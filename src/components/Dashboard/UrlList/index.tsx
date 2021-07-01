import { IUser } from 'interfaces/IUser'
import { Items } from './Items'
export interface IUrlListProps {
  user: IUser
  isFormVisible: boolean
  onShowForm: () => void
}

export function UrlList({ user, isFormVisible, onShowForm }: IUrlListProps) {
  return (
    <>
      {user && user.id ? (
        <Items user={user} isFormVisible={isFormVisible} onShowForm={onShowForm} />
      ) : null}
    </>
  )
}
