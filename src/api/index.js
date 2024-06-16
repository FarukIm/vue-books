const baseUrl = import.meta.env.VITE_API_URL
const getBooks = async () => {
  // const response = await fetch(`https://freetestapi.com/api/v1/books`)
  const response = await fetch(baseUrl + `/books`)
  let data = await response.json()
  return data
}

const getComments = async (id) => {
  const response = await fetch(baseUrl + `/books/${id}/comments`)
  let data = await response.json()
  return data
}

const addComment = async (id, content) => {
  const response = await fetch(baseUrl + `/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      book_id: id,
      content: content
    })
  })
  let data = await response.json()
  return data
}

const updateLike = async (id, add) => {
  const response = await fetch(baseUrl + `/books/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      add: add
    })
  })
  let data = await response.json()
  console.log(data)
  return data
}

export { getBooks, getComments, addComment, updateLike }
