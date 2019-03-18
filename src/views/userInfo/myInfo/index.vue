<template>
    <div class="myInfo">
        <div class="avatar">
            <avatar ref="avatar" class="user-avatar"></avatar>
            <el-upload
            class="upload"
            action="/"
            :before-upload="beforeUpload">
                <el-button size="small" type="primary">{{$t('userInfo.changeAvatar')}}</el-button>
            </el-upload>
            <i class="icon el-icon-edit" @click="selectForm()"></i>
        </div>
        <el-form label-position="left" label-width="150px">
            <el-form-item :label="$t('login.userName') + '：'">
                {{ userInfo.userName}}
            </el-form-item>
            <el-form-item :label="$t('login.name') + '：'">
                {{ userInfo.name}}
            </el-form-item>
            <el-form-item :label="$t('header.company') + '：'">
                <span  v-for="(item,index) in this.userInfo.company" :key="index"><i v-if="index != 0">、</i>{{ item }}</span>
            </el-form-item>
            <el-form-item :label="$t('userInfo.positionName') + '：'">
                <span  v-for="(item,index) in this.userInfo.roleName" :key="index"><i v-if="index != 0">、</i>{{ item }}</span>
            </el-form-item>
            <el-form-item :label="$t('login.email') + '：'" style="color:#0085cc;">
                {{ userInfo.email}}
            </el-form-item>
            <el-form-item :label="$t('dataTable.group') + '：'">
                <span  v-for="(item,index) in this.userInfo.group" :key="index"><i v-if="index != 0">、</i>{{ item }}</span>
            </el-form-item>
            <el-form-item :label="$t('login.password') + '：'">
                <span style="color:#0085cc;border-bottom:1px solid #0085cc;cursor: pointer;" @click="reviseShow = true"> {{ $t('header.changePassword') }}</span>
            </el-form-item>
        </el-form>

        <!-- 修改用户名 -->
        <el-dialog :title="$t('dataTable.user')" :visible.sync="updateShow" width="450px">
            <el-form label-width="100px">
                <el-form-item :label="$t('login.userName')">
                    <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.name')">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="update()">{{$t('message.confirm')}}</el-button>
                <el-button @click="updateShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog title="用户" :visible.sync="reviseShow" width="450px">
            <el-form ref="form" label-width="120px">
                <el-form-item :label="$t('login.oldPassword')">
                    <el-input v-model="reviseForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item :label="$t('login.newPassword')">
                    <el-input v-model="reviseForm.newPassword"></el-input>
                </el-form-item>     
                <el-form-item :label="$t('login.newPassword')">
                    <el-input v-model="reviseForm.sureOldPassword"></el-input>
                </el-form-item>       
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="revise()">{{$t('message.confirm')}}</el-button>
                <el-button @click="reviseShow = false">{{$t('message.cancel')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import avatar from '../../common/avatar'

export default {
    components: {
        avatar
    },
    data() {
        return {
            userInfo: {},
            updateShow: false,
            reviseShow: false,
            reviseForm: {},
            userForm: {
                name: '',
                userName: ''
            }
        }
    },
    created() {
        this.queryUserInfo()
    },
    methods: {
        async queryUserInfo() {
            let params = {userId: localStorage.getItem('userId')}
            let result = await this.$store.dispatch('AC_UserManageServiceQueryUserInfo', params)
            this.userInfo = result.data
        },

        async update() {
            if(!this.userForm.userName || !this.userForm.name) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            let params = {
                id: localStorage.getItem('userId'),
                userName: this.userForm.userName,
                name: this.userForm.name
            }

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let result = await this.$store.dispatch('AC_UserServiceUpdateUser', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error(this.$t('message.fail'))
            this.queryUserInfo()
            this.updateShow = false
            this.$store.commit('loadingChange',{show: false})
        },

        selectForm() {
            this.userForm.userName = this.userInfo.userName
            this.userForm.name = this.userInfo.name
            this.updateShow = true
        },

        beforeUpload(file){
            if(file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg'){
                this.$message.error(this.$t('message.empty'))
                return
            }

            let fd = new FormData();
            fd.append('file',file);
            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            let uploadUrl = location.pathname == '/reportManager/' ? 'http://tfapi.hipland.net/upload/ueditor/uploadFile' : 'http://tftest.hipland.net/upload/ueditor/uploadFile'
            this.$axios.post(uploadUrl,fd).then(res => {
                    this.uploadSuccess(res.data)
            })
            return false
        },

        async uploadSuccess(data) {
            let params = {
                id: localStorage.getItem('userId'),
                headImage: data
            }
            let result = await this.$store.dispatch('AC_UserServiceUpdateUser', params)
            result.code == 200 ? this.$message.success(this.$t('message.success')) : this.$message.error( this.$t('message.fail'))
            this.$refs.avatar.queryUserInfo()
            this.$store.commit('loadingChange',{show: false})
        },

        async revise() {
            if(!this.reviseForm.oldPassword || !this.reviseForm.newPassword || !this.reviseForm.sureOldPassword) {
                this.$message.error(this.$t('message.empty'))
                return
            }

            if(this.reviseForm.newPassword != this.reviseForm.sureOldPassword) {
                this.$message.error(this.$t('login.confirmPassword'))
                return
            }

            this.$store.commit('loadingChange',{show: true,text: this.$t('message.inRequest')})
            this.reviseForm.userId = localStorage.getItem('userId')
            const result = await this.$store.dispatch('AC_UserOnlineServiceChangePassword', this.reviseForm);
            this.$store.commit('loadingChange',{show: false})

            if(result.data.returnMsg != 'success' || result.data.returnCode != '200') {
                this.$message.error(result.data.returnMsg)
                return
            }
            this.$message.success(this.$t('message.success'))
            localStorage.removeItem('ms_username')
            this.$router.push('/login');
        },
    }
}
</script>
<style lang="less" scoped>
.myInfo{
    padding: 60px;
    .avatar{
        height: 60px;
        display: flex;
        padding-bottom: 30px;
        position: relative;
        .user-avatar{
            width: 56px;
            height: 56px;
            line-height: 56px;
            border-radius: 50%;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .upload{
            margin-top: 20px;
        }
    }
}
.icon{
    position: absolute;
    bottom: -20px;
    left: 300px;
    font-size: 24px;
    cursor: pointer;
    z-index: 999;
}
</style>
