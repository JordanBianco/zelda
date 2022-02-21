import state from '@/store/modules/books/state'
import * as getters from '@/store/modules/books/getters'
import * as actions from '@/store/modules/books/actions'
import * as mutations from '@/store/modules/books/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}