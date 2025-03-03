import maindata from "./analytics_dataset.json"

export interface UserData {
  userId: number
  country: string
  gender: string
  age: number
  userType: string
}

interface SessionData {
  sessionId: string
  userId: number
  sessionStart: string
  sessionDuration: number
  device: string
  source: string
}

interface DefaultData {
  users: Array<UserData>
  sessions: Array<SessionData>
}

export const defaultData: DefaultData = maindata
