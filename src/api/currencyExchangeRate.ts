interface IApiProps {
  inCurrencyType: string;
  outCurrencyType: string;
}

export async function getExchangeRate({
  inCurrencyType,
  outCurrencyType
}: IApiProps): Promise<number | never> {
  const data: Record<string, { val: number }> = await (
    await fetch(
      'https://free.currconv.com/api/v7/convert?apiKey=' +
        process.env.REACT_APP_CURRCONV_API_KEY +
        '&q=' +
        inCurrencyType +
        '_' +
        outCurrencyType +
        '&compact=y'
    )
  ).json();
  return data[`${inCurrencyType}_${outCurrencyType}`].val;
}
