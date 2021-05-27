import { Items } from './Items'

export const UrlList = ({ user, isFormVisible, onShowForm }) => {
  return <Items user={user} isFormVisible={isFormVisible} onShowForm={onShowForm} />
}
