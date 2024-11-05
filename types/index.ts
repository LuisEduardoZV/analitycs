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
  '0-18': number,
  '18-35': number,
  '35-100': number,
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
    ages: {
      '0-18': number,
      '18-35': number,
      '35-100': number,
    }, 
    genders: GendersUsers, 
    userType: { 
      'new': number, 
      'returning': number
    } 
  } 
}

export type TotalDataUsers = {
  totalUsers: number,
  maxGender: any[],
  minGender: any[],
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