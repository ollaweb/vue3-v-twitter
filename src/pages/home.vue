<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div v-else>
    <div class="tweet-menu-wrapper">
      <div class="tweet-menu">
        <select v-model="sortBy" name="sortBy">
          <option value="date">Sort by date</option>
          <option value="likes">Sort by likes</option>
        </select>
      </div>
    </div>
    <div class="tweets" v-for="item in dataSorted" :key="item.id">
      <Tweet
        @onSubmit="handleLikeSubmit"
        :id="item.id"
        :likes="item.likes"
        :name="item.date"
        :imgUrl="item.avatar"
      >
        {{ item.body }}
      </Tweet>
    </div>
    <button @click="handleModalShow" class="btn btnTweet btnTweetHome">
      New Tweet
    </button>
    <Modal v-if="showModal" @onClose="handleModalShow" title="New Tweet">
      <TweetForm @onSubmit="handleTweetSubmit"></TweetForm>
    </Modal>
  </div>
</template>

<script>
import { onMounted, ref, reactive, computed } from 'vue'
import http from '@/http-common'
import Spinner from '@/components/UI/Spinner.vue'
import Tweet from '@/components/UI/Tweet.vue'
import TweetForm from '@/components/UI/TweetForm.vue'
import Modal from '@/components/UI/Modal.vue'

export default {
  components: { Tweet, TweetForm, Spinner, Modal },
  setup() {
    const isLoading = ref(true)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 2000)

    const data = ref([])

    onMounted(() => getTweets())

    const getTweets = () => {
      http
        .get('/tweets.json')
        .then(res => {
          const nextData = []
          Object.keys(res.data).forEach(key => {
            const item = res.data[key]
            nextData.push({ id: key, ...item })
          })

          data.value = nextData
          isLoading.value = false
        })
        .catch(e => console.log(e))
    }

    const sortBy = ref('date')
    const dataSorted = computed(() => {
      return data.value.sort((a, b) => {
        if (a[sortBy.value] < b[sortBy.value]) return 1
        if (a[sortBy.value] > b[sortBy.value]) return -1
      })
    })

    const handleLikeSubmit = id => {
      console.log(`tweet id ${id} has been liked`)
    }

    const handleTweetSubmit = body => {
      const tweet = reactive({
        body,
        avatar: `https://avatars.dicebear.com/api/adventurer/human/${Date.now()}.svg`,
        likes: 0,
        date: new Date(Date.now()).toLocaleString()
      })

      http
        .post('/tweets.json', tweet)
        .then(() => {
          getTweets()
          handleModalShow()
        })
        .catch(e => console.log(e))
    }

    const showModal = ref(false)
    const handleModalShow = () => {
      const nextShowModal = !showModal.value
      showModal.value = nextShowModal
    }

    return {
      data,
      sortBy,
      dataSorted,
      handleLikeSubmit,
      handleTweetSubmit,
      isLoading,
      showModal,
      handleModalShow
    }
  }
}
</script>
