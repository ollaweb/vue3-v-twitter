export const process = {
  dev: true
}

export const site = {
  home: process.dev ? 'Dev' : 'Prod'
}

export const app = {
  title: 'VTwitter'
}
export const links = [
  {
    title: 'Home',
    alias: 'home',
    url: '/'
  },
  {
    title: 'About',
    alias: 'about',
    url: '/about'
  }
]
