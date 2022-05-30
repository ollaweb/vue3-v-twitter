import axios from 'axios'

export default axios.create({
  baseURL:
    'https://v-twitter-d140a-default-rtdb.europe-west1.firebasedatabase.app',
  header: {
    'Content-type': 'application/json'
  }
})
