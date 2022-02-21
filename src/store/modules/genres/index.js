import state from '@/store/modules/genres/state'
import * as getters from '@/store/modules/genres/getters'
import * as actions from '@/store/modules/genres/actions'
import * as mutations from '@/store/modules/genres/mutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}