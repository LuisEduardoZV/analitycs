import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type GendersUsers = {
  male: number,
  female: number,
  others: number
}

export type AgesUsers = {
  '18-25': number,
  '25-35': number,
  '35-45': number,
  '45-60': number,
  '60-75': number,
}

export type UsersTypes = { 
  'new': number, 
  'returning': number
} 

export type DefaultData = { 
  "Usuarios totales": number,
  country: string,
  ages: AgesUsers, 
  genders: GendersUsers, 
  userType: UsersTypes
} 

export type DefaultDataUsersByCountry = { 
  [country: string]: { 
    "Usuarios totales": number,
    ages: AgesUsers, 
    genders: GendersUsers, 
    userType: UsersTypes
  } 
}

export type TotalDataUsers = {
  totalUsers: number,
  totalGenders: GendersUsers
  newUsers: number,
  firtsCountry: {
    country: string,
    total: number
  },
  secondCountry: {
    country: string,
    total: number
  },
  thirdCountry: {
    country: string,
    total: number
  },
  maxAge: any[],
  minAge: any[]
}