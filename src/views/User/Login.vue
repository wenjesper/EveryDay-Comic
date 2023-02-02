<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { showToast } from 'vant';
import 'vant/es/toast/style';
import reg from "@/components/User/registered.vue"
const router = useRouter()
const goback = () => {
    router.go(-1)
}
//表单数据
const username = ref('');
const password = ref('');
const onSubmit = (values: unknown) => {
    if (localStorage.getItem('login')) {
        localStorage.setItem('user', JSON.stringify(values));
        router.push({
            path: '/',
        })
    }else{
        registered.value = true
        showToast('先注册');
    }
    username.value = ''
    password.value = ''
};
const registered = ref(false)
const gore = () => {
    registered.value = true
}
//提示先注册

</script>

<template>
    <div class="user">
        <div class="nav">
            <div class="back" @click="goback()">
                <!-- <van-icon name="arrow-left" size="25" color="#000" /> -->
            </div>
            <div class="name">
                登录
            </div>
            <div class="share">
                <van-icon name="ellipsis" size="25" color="#000" />
            </div>
        </div>
        <div class="box">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">其他登录方式</van-divider>
            <div class="other">
                <div class="o-item">
                    <img src="@/assets/icons/qq.png" alt="" style="width:45px;height: 45px;">
                </div>
                <div class="o-item">
                    <img src="@/assets/icons/wx.png" alt="">
                </div>
                <div class="o-item">
                    <img src="@/assets/icons/wb.png" alt="">
                </div>
            </div>
            <div class="registered" @click="gore()">先注册</div>
            <van-popup v-model:show="registered" z-index="10" round position="bottom" :style="{ height: '70%' }">
                <reg></reg>
            </van-popup>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user {
    width: 100vw;
    height: 100vh;
    overflow: auto;
    overflow-x: hidden;
    // background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
    background-color: #f3f1f1;

    .nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        display: flex;
        background-color: #fff;
        z-index: 20;
        border: 1px solid #f3f1f1;

        .back {
            flex: 0 0 10%;
            padding-top: 7.5px;
        }

        .name {
            flex: 0 0 80%;
            color: #000;
            font-size: 14px;
            // font-weight: bold;
            line-height: 40px;
            text-align: center;
        }

        .share {
            flex: 0 0 10%;
            padding-top: 7.5px;
        }
    }

    .box {
        width: 100%;
        height: 200px;
        margin: 200px auto;

        .other {
            width: 180px;
            height: 60px;
            display: flex;
            margin: 20px auto;

            .o-item {
                flex: 1;

                img {
                    width: 40px;
                    height: 40px;
                }
            }
        }

        .registered {
            width: 100%;
            height: 40px;
            margin: 20px 0;
            text-align: center;
            color: rgb(65, 65, 255);
            font-size: 14px;
        }
    }
}
</style>