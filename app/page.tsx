"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Select, SelectItem } from "@nextui-org/select"
import { ChangeEvent, useMemo, useState } from "react"

import { defaultData } from "@/config/defaultData"

import { BarChart } from "@/components/Charts/BarChart"
import { UserData } from "@/config/defaultData"
import { UserOutlinedIcon } from '../components/icons'
import { AgesUsers, DefaultData, DefaultDataUsersByCountry, GendersUsers, TotalDataUsers } from '../types/index'


const options = [
  { value: 'gender', label: 'Genero' },
  { value: 'age', label: 'Edad' },
  { value: 'userType', label: 'Tipo' },
]

export default function Home() {
  const [filterUsers, setFilterUsers] = useState<string>('gender')
  console.log(defaultData);

  const infoUsers = useMemo(() => {
    const countryData = defaultData.users.reduce((acc: DefaultDataUsersByCountry, user: UserData) => {
      const { country, gender, age, userType } = user
      if (!acc[country]) {
        acc[country] = { "Usuarios totales": 0, genders: {
          'others': 0,
          'male': 0,
          'female': 0
        }, ages: {
          '0-18': 0,
          '18-35': 0,
          '35-100': 0
        }, userType: {
          'new': 0,
          'returning': 0
        } }
      }
      acc[country]["Usuarios totales"] += 1
      
      if (age >= 0 && age <= 18) {
        acc[country].ages['0-18'] += 1
      } else if (age >= 18 && age <= 35) {
        acc[country].ages['18-35'] += 1
      } else {
        acc[country].ages['35-100'] += 1
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
        acc['0-18'] = user.ages['0-18']
        acc['18-35'] = user.ages['18-35']
        acc['35-100'] = user.ages['35-100']
      }
      
      const {ages} = user
      acc['0-18'] += ages['0-18']
      acc['18-35'] += ages['18-35']
      acc['35-100'] += ages['35-100']
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
    
    const gender = Object.entries(totalGenders)
    const maxGender = gender.reduce((max, entry) => (entry[1] > max[1] ? entry : max))
    const minGender = gender.reduce((min, entry) => (entry[1] < min[1] ? entry : min))

    const ages = Object.entries(totalAges)
    const maxAge = ages.reduce((max, entry) => (entry[1] > max[1] ? entry : max))
    const minAge = ages.reduce((min, entry) => (entry[1] < min[1] ? entry : min))
    
    const response = {
      totalUsers,
      maxGender,
      minGender,
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

  const dataByCountry = useMemo(() => {
    return infoUsers.find((user) => user.country === countrySelect)
  }, [countrySelect, infoUsers])

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
  }, [dataByCountry, filterUsers])

  const handleSetFilterUsers = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterUsers(e.target.value)
  }

  const handleSetCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountrySelect(e.target.value)
  }

  return (
    <section className="flex flex-col w-full gap-4">
      <article className="flex gap-4 justify-between">
        <Card className="w-full max-w-xs shadow-lg">
          <CardBody>
          <div className="flex flex-col items-start">
              <p className="text-tiny uppercase font-bold">Usuarios totales reigstrados</p>
              <div className="flex w-min self-center justify-self-center items-center">
                <UserOutlinedIcon className="w-8 h-8" />
                <h4 className="font-bold text-large">{totalInfo.totalUsers}</h4>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardBody>
          <div className="flex-col items-start">
              <p className="text-tiny uppercase font-bold">Género de usuario mas registrado</p>
              <h4 className="font-bold text-large">{totalInfo.maxGender[0]}: {totalInfo.maxGender[1]}</h4>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardBody>
          <div className="flex-col items-start">
              <p className="text-tiny uppercase font-bold">Nuevos usuarios registrados</p>
              <h4 className="font-bold text-large">{totalInfo.newUsers}</h4>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-sm shadow-lg">
          <CardBody>
          <div className="flex-col items-start">
              <p className="text-tiny uppercase font-bold">Países con mayor cantidad de usuarios</p>
              <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full max-w-xs shadow-lg">
          <CardBody>
          <div className="flex-col items-start">
              <p className="text-tiny uppercase font-bold">Preferencia de edad</p>
              <h4 className="font-bold text-large">{totalInfo.maxAge[0]} años: {totalInfo.maxAge[1]} usuarios</h4>
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

        <div className="grid grid-cols-2 gap-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardBody>
            <div className="flex-col items-start">
                <p className="text-tiny uppercase font-bold">Usuarios totales reigstrados</p>
                <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-md shadow-lg">
            <CardBody>
            <div className="flex-col items-start">
                <p className="text-tiny uppercase font-bold">Usuarios registrados en {countrySelect}</p>
                <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-md shadow-lg">
            <CardBody>
            <div className="flex-col items-start">
                <p className="text-tiny uppercase font-bold">Nuevos usuarios</p>
                <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-md shadow-lg">
            <CardBody>
            <div className="flex-col items-start">
                <p className="text-tiny uppercase font-bold">Usuarios</p>
                <small className="text-default-500">{defaultData.users.length} registros</small>
                <h4 className="font-bold text-large">Total de usuarios registrados por país</h4>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
