import { defineStore } from 'pinia'


export const useLoginStore = defineStore('login', {
  actions: {
    async verifyCode(enteredCode) {
      const generatedCode = '123456'; // This should be replaced with the actual generated code logic
      return enteredCode === generatedCode;
    },
    async userlogin(data) {
      // Simulate an API call
      // Simulate an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const validUsers = [
            { username: 'admin1', password: 'password' },
            { username: 'user', password: 'userpass' },
          ]

          const user = validUsers.find(
            (u) => u.username === data.get('controlno') && u.password === data.get('password'),
          )

          if (user) {
            resolve(1) // Successful login
          } else {
            resolve(0) // Failed login
          }
        }, 1000)
      })
    },
  },
})
