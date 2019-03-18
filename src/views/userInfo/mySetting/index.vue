<template>
    <div class="list-wrap">
        <div class="list-header">
            <div class="title">样式定制</div>
        </div>
        <div class="set-content">
            <el-form label-position="left" label-width="100px">
                <el-form-item label="用户名：">
                    <span class="boxColor" v-for="(item,index) in setList" :style="{background: item}" :key="index" @click="selectColor(item,index)"></span>
                    <el-button size="small" type="primary" @click="uploadSuccess()">更换背景色</el-button>
                </el-form-item>
                <el-form-item label="logo">
                    <el-upload
                    class="upload"
                    action="/"
                    :before-upload="beforeUpload">
                        <el-button size="small" type="primary">更换logo</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            companyInfo: {},   
            color: '',         
            setList: [
                '#b6002a','#005bac','#ff6900'
            ],
        }
    },
    created() {
        this.getCompanyInfo()
    },
    methods: {
        async getCompanyInfo() {
            let params = {
                userId: localStorage.getItem('userId')
            }
            let result = await this.$store.dispatch('AC_LoginServiceGetCompanyInfo',params)
            this.companyInfo = result.data.company
        },
        selectColor(item,index){
            this.color = item
            this.$message.success('已选择颜色'+ index)
        },
        beforeUpload(file) {
            if(file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg'){
                this.$message.error('请传入正确格式的图片!')
                return
            }

            let fd = new FormData();
            fd.append('file',file);
            this.$store.commit('loadingChange',{show: true,text:'上传logo'})
            let uploadUrl = location.pathname == '/reportManager/' ? 'http://tfapi.hipland.net/upload/ueditor/uploadFile' : 'http://tftest.hipland.net/upload/ueditor/uploadFile'
            this.$axios.post(uploadUrl,fd).then(res => {
                    this.uploadSuccess(res.data)
            })

            return false
        },
        async uploadSuccess(data) {
            let params = {
                id: this.companyInfo.id
            }
            data ? params.logoUrl = data : null
            this.color ? params.backgroundColor = this.color : null
            let result = await this.$store.dispatch('AC_CompanyServiceUpdateCompany', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.$store.commit('loadingChange',{show: false})
        }
    }
}
</script>
<style lang="less" scoped>
.set-content{
    padding: 30px;

    .boxColor{
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 20px;
    }
}

</style>
