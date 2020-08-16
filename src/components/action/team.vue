<template>
  <div class="team">
    <!-- 团队 -->
    <div class="left">
      <div>
        <div :class="isAdd ? 'btn btnHover' : 'btn'" @click="selectBtn(true)">新增</div>
      </div>
      <div>
        <div :class="!isAdd ? 'btn btnHover' : 'btn'" @click="selectBtn(false)">修改</div>
      </div>
    </div>
    <div class="right">
      <div class="updataBox">
        <div class="phoneView">
          <div class="phone_head">餐厅团队</div>
          <div class="cardList">
            <div class="card" @click="clickCard(item)" v-for="(item, i) in teamList" :key="i">
              <el-image class="photo" fit="cover" :src="item.imageUrl">
                <div
                  slot="error"
                  style="width: 1rem;height: 1rem;box-sizing: border-box;border: 1px solid #663024;"
                  class="image-slot"
                >
                  <i style="font-size: .3rem;margin-top: 0.35rem;" class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="cardTextBox">
                <div class="cardTit">{{item.name}}</div>
                <div class="cardContent">{{item.content_top}}</div>
                <img
                  class="delIcon"
                  v-if="!isAdd"
                  @click="delCard(item)"
                  src="@/assets/nutrition_04.png"
                  alt
                />
              </div>
            </div>
            <!-- <div class="addCard">
              <img src="@/assets/nutrition_03.png" alt=''>
            </div>-->
          </div>
        </div>
        <div class="updataPhone">
          <el-input v-model="phone.name" placeholder="请输入标题"></el-input>
          <div class="phoneContent">
            <div>
              <el-input
                type="textarea"
                resize="none"
                autosize
                v-model="phone.content_top"
                :rows="6"
                placeholder="请输入内容"
                style="font-size: .1rem;padding-top: .1rem;"
              ></el-input>
              <!-- {{phone.content_top}} -->
            </div>
            <!-- <el-image class="phoneContent_img" fit="cover" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"> -->
            <el-image class="phoneContent_img" fit="cover" :src="phone.imageUrl">
              <span slot="error"></span>
              <!-- <div slot="error" style="width: 1rem;height: 1rem;box-sizing: border-box;border: 1px solid #663024;" class="image-slot">
                <i style="font-size: .3rem;margin-top: 0.35rem;" class="el-icon-picture-outline"></i>
              </div>-->
            </el-image>
            <div>
              <el-input
                type="textarea"
                resize="none"
                autosize
                v-model="phone.content_bottom"
                :rows="6"
                placeholder="请输入内容"
                style="font-size: .1rem;padding-top: .1rem;"
              ></el-input>
            </div>
          </div>
          <!-- <div class="bottomBtn">
            <el-button type="warning" @click="savePhone" round>保存</el-button>
          </div>-->
        </div>
        <div class="btnPhone">
          <el-upload
            class="avatar-uploader"
            action="/admin/api/webUploaderImages"
            :show-file-list="false"
            :on-success="handleAvatarSuccessVideo"
            :before-upload="beforeAvatarUploadVideo"
          >
            <div class="btnBox" :style="phone.videoUrl === '' ? '' : 'padding: 0;'">
              <img v-if="phone.videoUrl === ''" src="@/assets/team_01.png" alt />
              <img v-if="phone.videoUrl === ''" class="addIcon" src="@/assets/team_03.png" alt />
              <video v-else style="width: .8rem;height: .8rem;" :src="phone.videoUrl"></video>
            </div>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="/admin/api/webUploaderImages"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="btnBox" :style="phone.imageUrl === '' ? '' : 'padding: 0;'">
              <img v-if="phone.imageUrl === ''" src="@/assets/team_02.png" alt />
              <img v-if="phone.imageUrl === ''" class="addIcon" src="@/assets/team_03.png" alt />
              <!-- <img v-else style="width: .8rem;height: .8rem;" :src="phone.imageUrl"> -->
              <el-image
                v-else
                style="width: .8rem;height: .8rem;"
                fit="cover"
                :src="phone.imageUrl"
              >
                <span slot="error"></span>
              </el-image>
            </div>
          </el-upload>
          <div class="bottomBtn">
            <el-button type="warning" @click="savePhone" round>确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'team',
  props: {
    rightText: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      phone: {
        name: '',
        content_top: '',
        photo: '',
        content_bottom: '',
        video: '',
        imageUrl: '',
        videoUrl: ''
      },
      teamList: [],
      isAdd: true
    }
  },
  mounted () {
    this.getTeam()
  },
  methods: {
    savePhone () {
      let saveObj = {
        name: this.phone.name,
        content_top: this.phone.content_top,
        photo: this.phone.photo,
        content_bottom: this.phone.content_bottom,
        video: this.phone.video
      }
      if (this.phone.id) {
        saveObj.id = this.phone.id
      }
      console.log(saveObj.photo)
      if (saveObj.name === '') {
        this.$message.error('请输入标题')
        return
      } else if (saveObj.content_top === '') {
        this.$message.error('请输入内容1')
        return
      } else if (saveObj.photo === '' || saveObj.photo === undefined) {
        this.$message.error('请选择封面图')
        return
      }
      let obj = this.$qs.stringify(saveObj)
      this.$api.post('/admin/api/InsertTeam', obj).then((res) => {
        if (res.data.code === 1) {
          // this.$router.push({path: '/home'})
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.getTeam()
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    getTeam () {
      this.$api.post('/admin/api/GetTeam', {}).then((res) => {
        if (res.data.code === 1) {
          console.warn(res.data)
          let list = res.data.lists
          let data = []
          list.forEach((item) => {
            data.push({
              ...item,
              imageUrl: 'http://ep.zerom.cn' + item.photo,
              videoUrl: 'http://ep.zerom.cn' + item.video
            })
          })
          this.selectTeam = data[0]
          this.teamList = data
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.phone.imageUrl = 'http://ep.zerom.cn' + res.data.path
      this.phone.photo = res.data.path
      console.log(this.phone.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      console.log(file.type)

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccessVideo (res, file) {
      this.phone.videoUrl = 'http://ep.zerom.cn' + res.data.path
      this.phone.video = res.data.path
    },
    beforeAvatarUploadVideo (file) {
      const isMp4 = file.type === 'video/mp4'
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isMp4) {
        this.$message.error('上传视频只能是 Mp4 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传视频大小不能超过 4MB!')
      }
      return isMp4 && isLt4M
    },
    selectBtn (isAdd) {
      this.isAdd = isAdd
      if (!this.isAdd && this.teamList.length > 0) {
        console.log(this.teamList[0])
        this.phone = this.teamList[0]
      } else if (this.isAdd) {
        this.phone = {
          name: '',
          content_top: '',
          photo: '',
          content_bottom: '',
          video: '',
          imageUrl: '',
          videoUrl: ''
        }
      }
    },
    delCard (item) {
      let obj = { id: item.id }
      obj = this.$qs.stringify(obj)
      this.$api.post('/admin/api/DelTeam', obj).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getTeam()
        } else {
          console.warn(res.data.msg)
          this.$message.error(res.data.msg)
        }
      })
    },
    clickCard (item) {
      this.phone = item
    }
  }
}
</script>

<style scoped>
.team {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  margin: 0.28rem;
  width: 20%;
  height: 80%;
  box-sizing: border-box;
  overflow: auto;
}
.left .btn {
  padding: 0.1rem 0.44rem;
  font-size: 0.15rem;
  color: #fb882b;
  background: #3c2a36;
  border: 1px solid #653428;
  border-radius: 5rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.2rem;
}
.left .smallBtn {
  display: inline-block;
  padding: 0.11rem 0.29rem;
  box-sizing: border-box;
}
.left .btnHover,
.left .btn:hover {
  background: #fbcd2b;
  color: #333;
  border: 1px solid #fbcd2b;
}
.right {
  width: 100%;
  flex: 1;
  height: 99%;
  overflow: hidden;
  padding-top: 1%;
  padding-right: 1%;
  box-sizing: border-box;
}
.updataBox {
  border: 1px solid #c29b29;
  border-radius: 10px;
  background: #3c2a26;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 98%;
  display: flex;
  padding: 0;
  border-radius: 0.2rem;
}
.updataBox .phoneView {
  width: 2.6rem;
  border: 1px solid #fbcd2b;
  border-radius: 0.2rem;
  height: 100%;
  box-sizing: border-box;
  background: #51352b;
  overflow: auto;
  text-align: left;
  display: flex;
  flex-flow: column;
}
.updataBox .phoneView .phone_head {
  color: #fbcd2b;
  font-size: 0.14rem;
  padding: 0.14rem 0;
  padding-bottom: 0.05rem;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  border-bottom: 0.02rem solid #fbcd2b;
}
.updataPhone {
  flex: 1;
  box-sizing: border-box;
  padding: 0.15rem 0.3rem;
  text-align: left;
  display: flex;
  flex-flow: column;
}
.phoneContent {
  padding: 0.1rem;
  margin-top: 0.1rem;
  border: 1px solid #663024;
  box-sizing: border-box;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.1rem;
  overflow: auto;
  height: 3.3rem;
}
.phoneContent_img {
  width: 100%;
  max-height: 1.7rem;
  border-radius: 0.1rem;
  margin: 0.1rem 0;
}
.cardList {
  padding: 0.25rem 0.15rem;
  overflow: auto;
  box-sizing: border-box;
  height: 3.7rem;
}
.card .photo {
  width: 100%;
  height: 0.6rem;
}
.card {
  width: 45%;
  text-align: left;
  color: #fff;
  border-radius: 0.2rem;
  display: inline-block;
  margin-right: 4%;
  margin-bottom: 0.1rem;
  position: relative;
  cursor: pointer;
}
.card .cardTextBox {
  background: #3c2a26;
  padding: 0.05rem;
  margin-top: -0.05rem;
}
.card .cardTit {
  font-size: 0.1rem;
  color: #dc6841;
  padding: 0.05rem 0;
}
.phoneView .addCard {
  padding: 0.3rem 0.37rem;
  background: #3c2a26;
  width: max-content;
  cursor: pointer;
}
.updataBox .phoneView .addCard img {
  height: 0.3rem;
}
.btnPhone {
  padding: 0.15rem 0.2rem 0 0;
  position: relative;
}
.btnBox {
  padding: 0.15rem;
  border: 1px solid #663024;
  position: relative;
  margin-bottom: 0.2rem;
}
.btnBox .addIcon {
  position: absolute;
  height: 0.14rem;
  width: 0.14rem;
  top: -0.07rem;
  right: -0.07rem;
}
.bottomBtn {
  position: absolute;
  bottom: 0.15rem;
}
.bottomBtn .el-button {
  padding: 0.06rem 0.2rem;
  border-radius: 5rem;
}
.bottomBtn .el-button--warning {
  color: #333;
}
.cardContent {
  height: 48px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.card .delIcon {
  height: 0.14rem;
  width: 0.14rem;
  position: absolute;
  top: -0.07rem;
  right: -0.07rem;
}
</style>
