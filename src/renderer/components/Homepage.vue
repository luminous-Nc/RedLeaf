<template>
    <div>
        <div class="home-up">
            <a-row>
                <a-col :span="8">
                    <div class="left-logo">Red Leaf 光盘备份工具</div>
                </a-col>
                <a-col :span="8">
                    <div class="welcome-text">欢迎您 牛大云</div>
                </a-col>
                <a-col class="text-message":span="24">
                    <span v-if="ifHasCD">已检测到光盘插入</span>
                    <div v-else="!ifHasCD">
                        <span>未检测到光盘插入</span>
                    </div>
                </a-col>

                <a-col class="main-button" :span="24">
                    <a-button v-if="!ifHasCD" size="large" ghost @click="freshIfHasCD">刷新</a-button>
                    <a-button v-else size="large" ghost @click="freshIfHasCD">备份</a-button>
                </a-col>
            </a-row>
        </div>

        <div class="home-down">
            <a-row class="home-down">
                <a-col :span="24" >
                    <c-d-information v-if="ifHasCD"></c-d-information>
                </a-col>
            </a-row>
        </div>


    </div>
</template>

<script>
    import * as fs from 'fs'
    import CDInformation from './LandingPage/CDInformation'
    import {ifDirExists} from "../util/ifDirExists"
    import {CDPath} from './../config/filePath'
    import { mapGetters} from 'vuex'
    export default {
        name: "Homepage",
        components: {CDInformation},
        data() {
            return {
                ifHasCD:false,
                ifHasCDInterval:0
            }
        },
        methods:{
          freshIfHasCD(){
              this.ifHasCD = ifDirExists(this.sourcePath)
          }
        },
        computed: {
          ...mapGetters([
              'sourcePath',
              'targetPath'
          ])
        },
        mounted() {
            this.freshIfHasCD()
        }
    }
</script>

<style scoped>
 .home-up {
     height:250px;
     background-color: #4e96ad;
 }
 .home-down {
     height:500px;
     margin-left: 16px;
     margin-right: 16px;
 }
    .left-logo{
        margin-left: 16px;
        margin-top:16px;
        font-size:20px;
        color: #c9c9c9;
    }

    .welcome-text {
        margin-top:16px;
        font-size:22px;
        color:#eeeeee;
        text-align:center;
    }

    .text-message {
        margin-top:16px;
        font-size:20px;
        color:#eeeeee;
        text-align:center;
    }

    .main-button {
        margin-top:16px;
        text-align:center
    }
</style>
