"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Select, SelectItem } from "@nextui-org/select"
import { ChangeEvent, useMemo, useState } from "react"

import { defaultData } from "@/config/defaultData"

import { BarChart } from "@/components/Charts/BarChart"
import { UserData } from "@/config/defaultData"
import { ArrowLeftSLine, CalendarFillIcon, FirstPlaceMedalIcon, GenderlessSymbolIcon, GroupIcon, MenSymbolIcon, SecondPlaceMedalIcon, ThirdPlaceMedalIcon, UserOpenArmIcon, UserOutlinedIcon, WomenSymbolIcon } from '../components/icons'
import { AgesUsers, DefaultData, DefaultDataUsersByCountry, GendersUsers, InfoUsersInCountry, TotalDataUsers } from '../types/index'

const options = [
  { value: 'gender', label: 'Genero' },
  { value: 'age', label: 'Edad' },
  { value: 'userType', label: 'Tipo' },
]

export default function Home() {
  const [filterUsers, setFilterUsers] = useState<string>('gender')
  //console.log(defaultData);

  const infoUsers = useMemo(() => {
    const countryData = defaultData.users.reduce((acc: DefaultDataUsersByCountry, user: UserData) => {
      const { country, gender, age, userType } = user
      if (!acc[country]) {
        acc[country] = { "Usuarios totales": 0, genders: {
          'others': 0,
          'male': 0,
          'female': 0
        }, ages: {
          '18-25': 0,
          '25-35': 0,
          '35-45': 0,
          '45-60': 0,
          '60-75': 0
        }, userType: {
          'new': 0,
          'returning': 0
        } }
      }
      acc[country]["Usuarios totales"] += 1
      
      if (age >= 0 && age <= 25) {
        acc[country].ages['18-25'] += 1
      } else if (age >= 25 && age <= 35) {
        acc[country].ages['25-35'] += 1
      } else if (age >= 35 && age <= 45) {
        acc[country].ages['35-45'] += 1
      } else if (age >= 45 && age <= 60) {
        acc[country].ages['45-60'] += 1
      } else if (age >= 60) {
        acc[country].ages['60-75'] += 1
      }
      
      switch (gender) {
        case 'male':
          acc[country].genders.male += 1
          break
        case 'female':
          acc[country].genders.female += 1
          break
        default:
          acc[country].genders.others += 1
      }

      if (userType === 'new') {
        acc[country].userType.new += 1
      } else {
        acc[country].userType.returning += 1
      }
      return acc
    }, {} as DefaultDataUsersByCountry)
    
    return Object.entries(countryData).map(([country, data]) => ({
      country,
      "Usuarios totales": data["Usuarios totales"],
      genders: data.genders,
      ages: data.ages,
      userType: data.userType
    }))
  }, [defaultData.users])
  
  const totalInfo: TotalDataUsers = useMemo(() => {
    const totalGenders = infoUsers.reduce((acc: GendersUsers, user: DefaultData) => {
      if (Object.keys(acc).length === 0) {
        acc.male = user.genders.male
        acc.female = user.genders.female
        acc.others = user.genders.others
      }
      
      const {genders} = user
      acc.male += genders.male
      acc.female += genders.female
      acc.others += genders.others
      return acc
    }, {} as GendersUsers)

    const totalAges = infoUsers.reduce((acc: AgesUsers, user: DefaultData) => {
      if (Object.keys(acc).length === 0) {
        acc['18-25'] = user.ages['18-25']
        acc['25-35'] = user.ages['25-35']
        acc['35-45'] = user.ages['35-45']
        acc['45-60'] = user.ages['45-60']
        acc['60-75'] = user.ages['60-75']
      }
      
      const {ages} = user
      acc['18-25'] += ages['18-25']
      acc['25-35'] += ages['25-35']
      acc['35-45'] += ages['35-45']
      acc['45-60'] += ages['45-60']
      acc['60-75'] += ages['60-75']
      return acc
    }, {} as AgesUsers)

    const newUsers = infoUsers.reduce((acc: number, user: DefaultData) => {
      const {userType} = user
      acc += userType.new
      return acc
    }, 0 as number)

    const totalUsers = infoUsers.reduce((acc: number, user: DefaultData) => {
      const {"Usuarios totales": total} = user
      acc += total
      return acc
    }, 0 as number)

    const byCountries = Array.from(infoUsers).sort((a, b) => {
      return b["Usuarios totales"] - a["Usuarios totales"]
    }).slice(0, 3)

    const ages = Object.entries(totalAges)
    const maxAge = ages.reduce((max, entry) => (entry[1] > max[1] ? entry : max))
    const minAge = ages.reduce((min, entry) => (entry[1] < min[1] ? entry : min))
    
    const response = {
      totalUsers,
      totalGenders,
      newUsers,
      firtsCountry: {
        country: byCountries[0].country,
        total: byCountries[0]["Usuarios totales"]
      },
      secondCountry: {
        country: byCountries[1].country,
        total: byCountries[1]["Usuarios totales"]
      },
      thirdCountry: {
        country: byCountries[2].country,
        total: byCountries[2]["Usuarios totales"]
      },
      maxAge,
      minAge
    }

    return response
  }, [infoUsers])

  const countries = useMemo(() => {
    return infoUsers.map((user) => user.country)
  }, [infoUsers])

  const [countrySelect, setCountrySelect] = useState<string>(countries[0])

  const dataByFilters = useMemo(() => {
    const data = infoUsers.find((user) => user.country === countrySelect)
    let dataset = data ? data.genders : {}
    let index = ''

  switch (filterUsers) {
    case 'age':
      dataset = data ? data.ages : {}
      index = 'Por edades'
      break
    case 'userType':
      dataset = data ? data.userType : {}
      index = 'Por tipo de usuario'
      break
    case 'gender':
    default:
      dataset = data ? data.genders : {}
      index = 'Por genero'
      break
  }
    const categories = Object.keys(dataset)
    return {dataset: [{...dataset, index}], categories}
  }, [filterUsers, countrySelect])

  const infoUsersInCountry: InfoUsersInCountry = useMemo(() => {
    const response = {
      country: '',
      totalUsers: 0,
      topGender: {
        gender: '',
        total: 0,
        Icon: GenderlessSymbolIcon
      },
      topAge: {
        age: '',
        total: 0
      }
    }

    if (!countrySelect) return response
    const currentCountry = infoUsers.find((user) => user.country === countrySelect)

    response.country = countrySelect
    response.totalUsers = currentCountry ? currentCountry["Usuarios totales"] : 0

    if (currentCountry) {
      const {genders} = currentCountry
      const gender = Object.entries(genders).reduce((acc, entry) => {
        const [gender, total] = entry
        if (total > acc.total) {
          acc.total = total
          acc.gender = gender
        }
        return acc
      }, {gender: '', total: 0})
      response.topGender.gender = gender.gender
      if (gender.gender === 'others') {
        response.topGender.Icon = GenderlessSymbolIcon
      } else if (gender.gender === 'male') {
        response.topGender.Icon = MenSymbolIcon
      } else if (gender.gender === 'female') {
        response.topGender.Icon = WomenSymbolIcon
      }
      response.topGender.total = gender.total

      const {ages} = currentCountry
      const age = Object.entries(ages).reduce((acc, entry) => {
        const [age, total] = entry
        if (total > acc.total) {
          acc.total = total
          acc.age = age
        }
        return acc
      }, {age: '', total: 0})
      response.topAge.age = age.age
      response.topAge.total = age.total
    }

    return response
  }, [infoUsers, countrySelect])

  console.log(infoUsersInCountry);

  const handleSetFilterUsers = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterUsers(e.target.value)
  }

  const handleSetCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountrySelect(e.target.value)
  }

  return (
    <section className="flex flex-col w-full gap-4 max-w-[100vw]">
      <article className="flex gap-4 justify-between">
        <Card className="w-full max-w-xs shadow-lg">
          <CardHeader>
            <p className="text-tiny uppercase font-bold">Usuarios totales registrados</p>
          </CardHeader>
          <CardBody className="p-0">
            <div className="flex w-min self-center justify-self-center items-end">
              <UserOutlinedIcon className="w-10 h-10 text-primary" />
              <h4 className="font-bold text-3xl self-end leading-none">{totalInfo.totalUsers}</h4>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardHeader>
            <p className="text-tiny uppercase font-bold textexts">Distribución global por géneros</p>
          </CardHeader>
          <CardBody className="p-0">
            <div className="flex items-start w-full h-full">
              <div className={`w-full max-w-[${Math.ceil((totalInfo.totalGenders.female * 100) / totalInfo.totalUsers)}%] bg-softCoral-300 h-full flex flex-col items-center justify-center`}>
                <span className="text-xs font-bold">Femenino</span>
                <h5>{totalInfo.totalGenders.female}</h5>
              </div>
              <div className={`w-full max-w-[${Math.round((totalInfo.totalGenders.male * 100) / totalInfo.totalUsers)}%] bg-primary/70 h-full flex flex-col items-center justify-center`}>
                <span className="text-xs font-bold">Masculino</span>
                <h5>{totalInfo.totalGenders.male}</h5>
              </div>
              <div className={`w-full max-w-[${Math.round((totalInfo.totalGenders.others * 100) / totalInfo.totalUsers)}%] bg-warmYellow-400 h-full flex flex-col items-center justify-center`}>
                <span className="text-xs font-bold">Otro</span>
                <h5>{totalInfo.totalGenders.others}</h5>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardBody>
          <div className="flex flex-col items-start gap-2">
              <p className="text-tiny uppercase font-bold">Nuevos usuarios registrados</p>
              <div className="flex flex-col self-center items-center gap-2 border-x-1 px-5 border-green-500">
                <ArrowLeftSLine className="w-5 h-5 text-green-500 rotate-90 -mb-3" />
                <h4 className="font-bold text-large">{totalInfo.newUsers}</h4>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <p className="text-tiny uppercase font-bold">Países con mayor cantidad de usuarios</p>
          </CardHeader>
          <CardBody className="p-0">
            <div className="grid grid-cols-3 items-start w-full h-full">
              <div className="w-full items-center justify-center flex h-full gap-2 border-r-1">
                <FirstPlaceMedalIcon className="w-7 h-7" />
                <div className="flex flex-col w-fit h-full items-center justify-start">
                <span className="text-xs font-bold">{totalInfo.firtsCountry.country}</span>
                <h5>{totalInfo.firtsCountry.total}</h5>
                </div>
              </div>
              <div className="w-full items-center justify-center flex h-full gap-2 border-r-1">
                <SecondPlaceMedalIcon className="w-7 h-7" />
                <div className="flex flex-col w-fit h-full items-center justify-start">
                <span className="text-xs font-bold">{totalInfo.secondCountry.country}</span>
                <h5>{totalInfo.secondCountry.total}</h5>
                </div>
              </div>
              <div className="w-full items-center justify-center flex h-full gap-2">
                <ThirdPlaceMedalIcon className="w-7 h-7" />
                <div className="flex flex-col w-fit h-full items-center justify-start">
                <span className="text-xs font-bold">{totalInfo.thirdCountry.country}</span>
                <h5>{totalInfo.thirdCountry.total}</h5>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardHeader>
            <p className="text-tiny uppercase font-bold">Preferencia general de edad</p>
          </CardHeader>
          <CardBody className="p-0">
            <div className="flex items-start w-full h-full">
              <div className="w-2/6 bg-electricPurple-700 h-full flex items-center justify-center">
                <GroupIcon className="w-7 h-7 text-electricPurple-50" />
              </div>
              <div className="w-4/6 flex flex-col items-center justify-center px-2">
                <h5 className="font-semibold text-sm self-start text-textSecondary">{totalInfo.maxAge[0]} años</h5>
                <h5 className="font-bold text-large">{totalInfo.maxAge[1]} usuarios</h5>
              </div>
            </div>
          </CardBody>
        </Card>
      </article>
      <div className="flex gap-4 w-full">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Usuarios</p>
            <small className="text-default-500">{infoUsers.length} países registrados</small>
            <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
          </CardHeader>
          <CardBody>
          <div className="flex flex-col gap-16">
          <BarChart
              className="h-80"
              data={infoUsers}
              index="country"
              categories={["Usuarios totales"]}
              valueFormatter={(number: number) =>
                `${Intl.NumberFormat("us").format(number).toString()}`
              }
              onValueChange={(v) => console.log(v)}
              xAxisLabel="País"
              yAxisLabel="Cantidad de usuarios"
            />
          </div>
          </CardBody>
        </Card>
        
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="pb-0 pt-2 px-4 justify-between items-center">
            <div className="flex-col items-start">
              <p className="text-tiny uppercase font-bold">Usuarios</p>
              <small className="text-default-500">{defaultData.users.length} registros</small>
              <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
            </div>
            <div className="flex gap-4 w-full max-w-[40%]">
              <div className="flex w-full max-w-28">
                <Select
                  size='sm'
                  label="Filtrar"
                  placeholder="Filtrar por..."
                  className="max-w-xs"
                  selectedKeys={[filterUsers]}
                  onChange={handleSetFilterUsers}
                >
                  {options.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex w-full max-w-32">
                <Select
                  size='sm'
                  label="País"
                  className="max-w-xs"
                  selectedKeys={[countrySelect]}
                  onChange={handleSetCountrySelect}
                >
                  {countries.map((op) => (
                    <SelectItem key={op} value={op}>
                      {op}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardBody>
          <div className="flex flex-col gap-16">
          <BarChart
              className="h-80"
              data={dataByFilters.dataset}
              index='index'
              categories={dataByFilters.categories}
              onValueChange={(v) => console.log(v)}
              xAxisLabel='Total'
              layout="vertical"
            />
          </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-2 gap-4 grid-rows-grid-byCountry w-max">
          <div className="flex col-span-2 h-fit self-start pt-2 pl-2">
            <h2 className="text-tiny uppercase font-bold text-primary">
              Análisis por país: {infoUsersInCountry.country}
            </h2>
          </div>
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <p className="text-tiny uppercase font-bold">Usuarios totales</p>
            </CardHeader>
            <CardBody>
            <div className="flex flex-col items-center justify-evenly h-full">
                <UserOpenArmIcon className="w-16 h-16 text-primary" />
                <h4 className="font-bold text-large">
                  <span className="text-secondary">{infoUsersInCountry.totalUsers}</span> usuarios
                </h4>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <p className="text-tiny uppercase font-bold">Preferencia de género</p>
            </CardHeader>
            <CardBody>
            <div className="flex flex-col items-center justify-evenly h-full">
                <infoUsersInCountry.topGender.Icon className="w-16 h-16 text-secondary" />
                <h4 className="font-bold text-medium">
                  <span className="text-primary">{infoUsersInCountry.topGender.gender}</span> con <span className="text-primary">{infoUsersInCountry.topGender.total}</span> usuarios
                </h4>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-md shadow-lg col-span-2">
            <CardHeader>
              <p className="text-tiny uppercase font-bold">Preferencia de edad</p>
            </CardHeader>
            <CardBody>
            <div className="flex flex-col items-center justify-evenly h-full">
              <CalendarFillIcon className="h-20 w-20 text-blushPink-800" />
                <h4 className="font-bold text-medium">
                  <span className="text-electricPurple-textDark">{infoUsersInCountry.topAge.age}</span> años con <span className="text-electricPurple-textDark">{infoUsersInCountry.topAge.total}</span> usuarios
                </h4>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
