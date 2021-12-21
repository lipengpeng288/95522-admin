<template>
    <div class="container">
        <div class="card">
            <div style="width: 400px; height: 400px;">
                <div class="header">
                    <img src="../../assets/logo.png" />
                    <span>官微服务-综合管理后台</span>
                </div>
                <div class="content">
                    <a-input v-model:value="userName" size="large" placeholder="用户名">
                        <template #prefix>
                            <user-outlined type="user" />
                        </template>
                    </a-input>

                    <a-input-password v-model:value="pass" size="large" placeholder="密码">
                        <template #prefix>
                           <lock-outlined />
                        </template>
                    </a-input-password>
                    <a-button type="primary" size="large" @click="login">Primary Button</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import 'echarts-liquidfill';
import { SmileOutlined, DownOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
export default {
    name: 'Loign',
    components: {
        SmileOutlined,
        DownOutlined,
        UserOutlined,
        LockOutlined
    },
    // components: {},
    setup() {
        const router = useRouter();
        let userName = ref<string>('');
        let pass =  ref<string>('');
        const login = ()=> {
            console.log(userName.value)
            console.log(pass.value)
            localStorage.setItem('_atk', 'jfajsldfjlasdfl;asjdflasdjfl');
            router.push('/');
        }

        onMounted(() => {

        })

        return {
            userName,
            pass,
            login
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    background-image: url("../../assets/login.svg");
    background-color: #f0f2f5;
    .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        text-align: center;
        .header {
            img {
                width: 30px;
                height: 30px;
                margin-right: 8px;
            }
            span{
                font-size: 20px;
                font-weight: 600;
            }
        }
        .content{
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
}
</style>
