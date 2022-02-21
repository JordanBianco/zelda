import state from '@/store/modules/reviews/state'
import * as getters from '@/store/modules/reviews/getters'
import * as actions from '@/store/modules/reviews/actions'
import * as mutations from '@/store/modules/reviews/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}