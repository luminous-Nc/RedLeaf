const state = {
    sourcePath:'E:/',
    targetPath:'D:/g2'
}

const mutations = {
    SET_SOURCE_PATH:(state,path) => {
      state.sourcePath = path
    },
    SET_TARGET_PATH:(state,path) =>{
        state.targetPath = path
    },
    INCREMENT_MAIN_COUNTER (state) {
        state.main++
    }
}

const actions = {
    set_source_path({ commit} ,path) {
        commit('SET_SOURCE_PATH',path)
    },
    set_target_path({ commit} ,path) {
        commit('SET_TARGET_PATH',path)
    }
}

export default {
    state,
    mutations,
    actions
}
