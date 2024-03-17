export type ICheckedData = {
  label: string
  value: string
}

export type IMultiSelect = {
  itemIds?: string[]
  checkedItems?: ICheckedData[]
  items?: any[]
  searchPlaceholder?: string
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
