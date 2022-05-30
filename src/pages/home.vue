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
import { ref, reactive, computed } from 'vue'
import http from '@/http-common'
import Spinner from '@/components/UI/Spinner.vue'
import Tweet from '@/components/UI/Tweet.vue'
import TweetForm from '@/components/UI/TweetForm.vue'
import Modal from '@/components/UI/Modal.vue'

export default {
  components: { Tweet, TweetForm, Spinner, Modal },
  setup() {
    const data = ref([
      {
        id: 1,
        body: 'Hello world!',
        avatar:
          'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 34,
        date: '10-04-2021'
      },
      {
        id: 2,
        body: 'Hello world 2!',
        avatar:
          'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 0,
        date: '15-04-2021'
      },
      {
        id: 3,
        body: 'Hello world 3!',
        avatar:
          'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 15,
        date: '08-04-2021'
      }
    ])

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
      // data.value.push({
      //   id: data.value.length + 1,
      //   body,
      //   avatar:
      //     'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
      //   likes: 0,
      //   date: new Date(Date.now()).toLocaleString()
      // })

      const tweet = reactive({
        id: data.value.length + 1,
        body,
        avatar:
          'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 0,
        date: new Date(Date.now()).toLocaleString()
      })
      http.post('/tweets.json', tweet)
      handleModalShow()
    }

    const isLoading = ref(false)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 2000)

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
