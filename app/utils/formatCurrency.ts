interface FormatCurrencyOptions {
  minorUnits?: boolean
}

export function formatCurrency(
  value: number | null | undefined,
  options: FormatCurrencyOptions = {},
) {
  const {
    minorUnits = false,
  } = options

  const amount = typeof value === 'number' && Number.isFinite(value) ? value : 0

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: minorUnits ? 2 : 0,
    maximumFractionDigits: minorUnits ? 2 : 0,
  })
    .format(amount)
    .replaceAll(/\u00A0|\u202F/g, ' ')
}
