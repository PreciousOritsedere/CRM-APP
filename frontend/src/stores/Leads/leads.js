import { defineStore } from 'pinia'
import axios from 'axios'

export const useLeadsStore = defineStore('leads', {
  state: () => ({
    data: [],
    loading: false,
    notify: {
      showNotification: false,
      textNotification: '',
      typeNotification: 'warn',
    },

            searchResultContact: [],

            searchResultOwner: [],

  }),
  actions: {
    async fetch(id = '', query) {
      this.startLoading()
      try {
        const result = await axios.get(`leads${query || (id ? `/${id}` : '')}`);
        this.getData(id ? result.data : result.data.rows)
      } catch (e) {
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/leads/${id}`);
        this.showNotification('Users has been deleted', 'success');
        await this.fetch()
      } catch (e) {
        console.log('deleteItem error', e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      }
    },
    async newItem(payload) {
      this.startLoading();
      try {
        const result = await axios.post('/leads', { data: payload });
        this.showNotification('Leads has been created', 'success');
        this.getData(result.data)
      } catch (e) {
        console.log(e)
        // dispatch('snackbar/showSnackbar', e, { root: true });
      } finally {
        this.finishLoading()
      }
    },
    async edit(payload) {
      this.startLoading();
      try {
        const result = await axios.put(`/leads/${payload.id}`, {id: payload.id, data: payload.data})
        // 
        this.showNotification('Leads has been updated', 'success');
        this.getData(result.data)
      } catch (e) {
        this.showNotification(e, 'error');
      } finally {
        this.finishLoading()
      }
    },

            async searchContact(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/contacts/autocomplete?query=${val}&limit=100`,
                  );
                  this.setContact(result.data);
                } else {
                  const result = await axios(`/contacts/autocomplete?limit=100`);
                  this.setContact(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setContact([]);
              }
            },

            async searchOwner(val) {
              try {
                if (val) {
                  const result = await axios(
                    `/users/autocomplete?query=${val}&limit=100`,
                  );
                  this.setOwner(result.data);
                } else {
                  const result = await axios(`/users/autocomplete?limit=100`);
                  this.setOwner(result.data);
                }
              } catch (e) {
                this.showNotification(e, 'error')
                this.setOwner([]);
              }
            },

    startLoading() {
      this.loading = false;
    },
    getData(payload) {
      this.data = payload;
    },
    finishLoading() {
      this.loading = false;
    },
    showNotification(payload, type) {
      this.notify.showNotification = true
      this.notify.textNotification = payload
      this.notify.typeNotification = type
    },
    hideNotification() {
      this.notify.showNotification = false
      this.notify.textNotification = ''
    },

        setContact(payload) {
            this.searchResultContact = payload
        },

        setOwner(payload) {
            this.searchResultOwner = payload
        },

  }
})
