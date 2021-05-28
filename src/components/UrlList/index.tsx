import { Items } from './Items'

export function UrlList({ user, isFormVisible, onShowForm }: any) {
  return <Items user={user} isFormVisible={isFormVisible} onShowForm={onShowForm} />
}
