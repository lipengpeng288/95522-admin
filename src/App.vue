<template>
    <template v-if="isLogin">
        <login></login>
    </template>
    <template v-if="!isLogin">
        <a-layout>
            <a-layout-header class="header">
                <div class="header-container">
                    <div class="logo">
                        <img src="../src/assets/logo.png"/>
                        <span>官微服务-综合管理后台</span>
                    </div>
                    <div class="header-right">
                        <menu-unfold-outlined
                            v-if="collapsed"
                            class="trigger"
                            @click="() => (collapsed = !collapsed)"
                        />
                        <menu-fold-outlined
                            v-else
                            class="trigger"
                            @click="() => (collapsed = !collapsed)"
                        />
                        <div>
                            <a-input v-model:value="value" class="input" placeholder="输入想搜索的内容" />
                            <search-outlined />
                            <bell-outlined />
                            <img src="../src/assets/avatar.jpg" class="avatar" />
                            <span>张三</span>
                        </div>
                    </div>
                </div>
            </a-layout-header>
            <a-layout style="height: calc(100vh - 64px);">
                <a-layout-sider v-model:collapsed="collapsed" width="200" style="background: #fff;">
                    <a-menu
                        v-model:selectedKeys="selectedKeys2"
                        v-model:openKeys="openKeys"
                        mode="inline"
                        :style="{ height: '100%', borderRight: 0 }"
                    >
                        <a-sub-menu key="sub1">
                            <template #title>
                                <dashboard-outlined />
                                <span style="margin-left: 10px;">工作台</span>
                            </template>
                            <router-link to="/apimonitoring">
                                <a-menu-item key="sub1-api" router>接口运行监控</a-menu-item>
                            </router-link>
                            <router-link to="/datamonitoring">
                                <a-menu-item key="sub1-data">数据监控</a-menu-item>
                            </router-link>
                        </a-sub-menu>
                        <a-sub-menu key="sub2">
                            <template #title>
                                <form-outlined />
                                <span style="margin-left: 10px;">功能模块配置</span>
                            </template>
                            <a-menu-item key="sub2-api">投连产品价格公布</a-menu-item>
                            <a-menu-item key="sub2-data">万能产品利率查询</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="sub3">
                            <template #title>
                                <table-outlined />
                                <span style="margin-left: 10px;">广告配置</span>
                            </template>
                            <a-menu-item key="sub3-api">轮播图配置</a-menu-item>
                            <a-menu-item key="sub3-data">活动配置</a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <a-layout style="background-color: #fff;">
                    <a-breadcrumb style="padding: 16px;">
                        <a-breadcrumb-item
                            v-for="(item, index) in getBreadcrumbList"
                            :key="index"
                        >{{ item }}</a-breadcrumb-item>
                        <!-- <a-breadcrumb-item>接口数据运行</a-breadcrumb-item> -->
                    </a-breadcrumb>
                    <a-layout-content
                        :style="{ background: '#f0f2f5', margin: 0, minHeight: '280px', overflowY: 'scroll' }"
                    >
                        <router-view />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </template>
</template>

<script lang="ts">
import { LaptopOutlined, NotificationOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, BellOutlined, DownOutlined, DashboardOutlined, FormOutlined, TableOutlined } from '@ant-design/icons-vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { useStore, mapGetters } from 'vuex';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Login from '@/views/login/Login.vue'
// 引入echart
import * as echarts from 'echarts'
import { provide } from 'vue';
export default {
    components: {
        LaptopOutlined,
        NotificationOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        SearchOutlined,
        BellOutlined,
        DownOutlined,
        DashboardOutlined,
        FormOutlined,
        TableOutlined,
        Login
    },
    setup() {
        // 根组件引入echart
        provide('echart', echarts)
        let store = useStore();
        let login = false;
        const isLogin = ref(login)
        const route = useRoute();
        // console.log(route.path);
        // 监听路由变化

        watch(route, (to, from) => {
            if (to.path === '/login') {
                console.log(111111111);
                isLogin.value = true

            } else {
                isLogin.value = false;
            }
        },)

        // setInterval(() => {
        //     login = !login
        //     console.log(login)
        // }, 1000)

        onMounted(() => {
            // console.log(store.getters.getBreadcrumbList)
        });

        return {
            selectedKeys1: ref<string[]>(['2']),
            selectedKeys2: ref<string[]>(['1']),
            collapsed: ref<boolean>(false), 
            openKeys: ref<string[]>(['sub1']),
            value: ref<string>(''),
            isLogin,
        };
    },
    computed: {
        ...mapGetters(['getBreadcrumbList'])
    },

};
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

.site-layout-background {
    background: #fff;
}
.header {
    background-color: #001529;
    height: 64px;
    padding: 0;
}
.header-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.85);
    .logo {
        width: 200px;
        height: 64px;
        padding: 0 0 0 15px;
        color: #eea114;
        font-size: 12px;
        img {
            height: 30px;
            margin-right: 5px;
        }
    }
    .header-right {
        width: calc(100% - 200px);
        height: 64px;
        padding: 20px 16px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        & > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            flex-grow: 1;
            flex-shrink: 1;
            gap: 10px;
            color: #fff;
            span {
                margin-right: 15px;
            }
            input {
                width: 40%;
            }
        }
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
    }
}
</style>
