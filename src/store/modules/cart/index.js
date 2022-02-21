import state from '@/store/modules/cart/state'
import * as getters from '@/store/modules/cart/getters'
import * as actions from '@/store/modules/cart/actions'
import * as mutations from '@/store/modules/cart/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}