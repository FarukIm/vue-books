const getBooks = async () => {
  const response = await fetch(`https://freetestapi.com/api/v1/books`)
  let data = await response.json()
  return data
}

export { getBooks }
