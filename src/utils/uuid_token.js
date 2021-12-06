import { v4 as uuidv4} from 'uuid'

const getUUID = () => {
  let uuid_token = localStorage.getItem('UUID_TOKEN')
  // 没有生成uuid
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('UUID_TOKEN', JSON.stringify(uuid_token))
  }
  return uuid_token
}

export default getUUID