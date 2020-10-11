<template>
  <div>
    <div>
      <div>共有 {{CDDirData.length}} 条记录</div>
      <a-table v-if="CDDirData.length>0"
               :columns="columns"
               :data-source="CDDirData"
               :rowKey="record => record.filename"
                bordered
               style="max-height: 500px;overflow-y: scroll"
                :pagination = "false">
        <span slot="fileType" slot-scope="text, record, index">
          {{text==true?'文件夹' : '文件'}}
        </span>

        <span slot="createTime" slot-scope="text">
          {{transTime(text)}}
        </span>

        <span slot="fileSize" slot-scope="text,record,index">
          {{record.isFile == true ? transSize(text) : ' '}}
        </span>

        <span slot="fileStatus" slot-scope="text">
           {{text==0?'就绪':'复制中'}}
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>

  import * as fs from "fs"
  import * as path from 'path'
  import {timestampToTime,fileSizeFilter} from "../../util/ifDirExists";
  import {mapGetters} from 'vuex'

  export default {
    name: 'file-listing-page',
    data() {
      return {
        dictorySelected: '',
        isLoading: false,
        CDDirData: [],
        columns:[
          {
            title:'名称',
            dataIndex: 'filename',
            width:400

          },
          {
            title: '类型',
            dataIndex: 'isDirectory',
            scopedSlots: { customRender: 'fileType' },
            width:150
          },
          {
            title: '大小',
            dataIndex: 'filesize',
            scopedSlots: { customRender: 'fileSize'},
            width:100
          },
          {
            title: '创建日期',
            dataIndex: 'createtime',
            scopedSlots: { customRender: 'createTime'},
            width:200
          },
          {
            title: '状态',
            dataIndex : 'status',
            scopedSlots: { customRender: 'fileStatus'},
            width:200
          }
        ]

    }
    },
    mounted() {

      this.showDirList()
    },
    computed: {
      ...mapGetters([
        'sourcePath',
        'targetPath',
  ])
    },
    methods: {
      transSize(size) {
        return fileSizeFilter(size)
      },
      transTime(time) {
          return timestampToTime(time)
      },
      showDirList() {
        this.CDDirData = []
        fs.readdir(this.sourcePath,{withFileTypes:true},(err,files)=> {
          if (err) {
            console.log('Read Dir Failed')
          }
          console.log('file')
          console.log(files)
          for (let filename of files) {
            let filePath = path.join(this.sourcePath, filename)
            let stats = fs.statSync(filePath)
              this.CDDirData.push(
              {
                filename: filename,
                isDirectory: stats.isDirectory(),
                isFile: stats.isFile(),
                filesize: stats.size,
                createtime: Math.trunc(stats.ctimeMs),
                status: 0
              }
              )
          }

          console.log('CDDirData')
          console.log(JSON.stringify(this.CDDirData))
         // console.log(JSON.stringify(this.tableData))
          console.log(typeof this.CDDirData)
          console.log(this.CDDirData)
        })
      },
      showFileDialog() {
        const dialog = require('electron').remote.dialog
        dialog.showOpenDialog({ properties: ['openDirectory'] }, (filename) => {
         //console.log(filename)
          if (filename.length === 1) {
            this.dictorySelected = filename[0]
            //this.listingFile(this.dictorySelected)
          }
        })
      },
      listingFile(filepath) {
        this.isLoading = true
        fs.readdir(filepath, (err, file) => {
          if (err) {
            this.isLoading = false
            return alert(err)
          }
          this.CDDirData = []

          console.log(this.CDDirData)
          this.isLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
