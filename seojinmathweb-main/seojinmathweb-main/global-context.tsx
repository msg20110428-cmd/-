import {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { useLocale } from 'next-intl'

type LocaleType = {
  name: string
  short: string
}

type GlobalContextType = {
  locales: LocaleType[]
  locale: LocaleType | undefined
  setLocales: React.Dispatch<React.SetStateAction<LocaleType[]>>
  setLocale: React.Dispatch<React.SetStateAction<LocaleType | undefined>>
}

const GlobalContext = createContext<GlobalContextType | null>(null)

type GlobalProviderProps = {
  initialLocales?: LocaleType[]
  children: ReactNode
}

export const GlobalProvider = ({
  initialLocales,
  children
}: GlobalProviderProps) => {
  const localeValue = useLocale()

  const [locales, setLocales] = useState<LocaleType[]>(
    initialLocales ?? [{ name: 'English', short: 'en' }]
  )

  const [locale, setLocale] = useState<LocaleType | undefined>(
    { name: 'English', short: 'en' }
  )

  useEffect(() => {
    if (!locales) return

    const currentLangValue = locales.find(
      (el) => el.short === localeValue
    )

    setLocale(currentLangValue)
  }, [locales, localeValue])

  const value = useMemo(
    () => ({
      locales,
      locale,
      setLocales,
      setLocale
    }),
    [locales, locale]
  )

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalProvider'
    )
  }

  return context
}