import state from '@/store/modules/orders/state'
import * as getters from '@/store/modules/orders/getters'
import * as actions from '@/store/modules/orders/actions'
import * as mutations from '@/store/modules/orders/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}