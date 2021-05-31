import { Items } from './Items'

export function UrlList({ user, isFormVisible, onShowForm }: any) {
  return (
    <>
      {user && user.id ? (
        <Items user={user} isFormVisible={isFormVisible} onShowForm={onShowForm} />
      ) : null}
    </>
  )
}
