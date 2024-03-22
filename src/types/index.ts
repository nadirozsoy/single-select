export type Option<L = string, V = number> = {
  label: L
  value: V
}

export type ISingleSelect<L = string, V = string> = {
  options: Option<L, V>[]
  placeholder: string
  defaultValue?: Option<L, V> | null
  clearable?: boolean
  pagination: {
    page?: number
    size?: number
    loader?: boolean
    hasNext?: boolean
    search?: string | null
  }
}

export type IState = {
  characters: any[]
}

export type IPagination = {
  page: number
  size: number
  loader: boolean
  hasNext: boolean
  name: string | null
}
