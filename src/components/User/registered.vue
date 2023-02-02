<script setup lang="ts">
import { ref, onMounted } from "vue"
import { showToast } from 'vant';
import 'vant/es/toast/style';
import { useRouter } from 'vue-router'
//表单数据
const username = ref('');
const password = ref('');
const router = useRouter()
const onSubmit2 = (values:unknown) => {
    console.log('submit', values);
    localStorage.setItem('login', JSON.stringify(values));
    showToast('注册成功')
      router.go(0)
};
const imgs = ref([]);
</script>

<template>
    <div class="box">
        <van-form @submit="onSubmit2">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <van-field v-model="password" type="text" name="Introduce" label="自我介绍" placeholder="自我介绍"
                    :rules="[{ required: true, message: '请填写自我介绍' }]" />
                <van-field name="uploader" label="头像">
                    <template #input>
                        <van-uploader v-model="imgs" />
                    </template>
                </van-field>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
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
}
</style>