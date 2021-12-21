<template>
    <div class="container">
        <div class="analysis">
            <a-card title="当日访问客户等级" style="width: 50%">
                <template #extra>
                    <a href="#">更多</a>
                </template>
                <div class="chart">
                    <div id="blackDiamond" style="width: 32%; height: 100%;"></div>
                    <div id="happiness" style="width: 32%; height: 100%;"></div>
                    <div id="zunDiamond" style="width: 32%; height: 100%;"></div>
                </div>
            </a-card>
            <a-card title="服务器压力" style="width: 25%">
                <!-- <template #extra><a href="#">more</a></template> -->
                <div class="chart">
                    <div id="server" style="width: 100%; height: 100%;"></div>
                </div>
            </a-card>
            <a-card title="接口平均访问成功率" style="width: 25%">
                <!-- <template #extra><a href="#">more</a></template> -->
                <div class="chart">
                    <div id="api" style="width: 100%; height: 100%;"></div>
                </div>
            </a-card>
        </div>
        <a-card>
            <div class="search">
                <div>
                    <div style="width: 70px;">API查询:</div>
                    <a-input v-model:value="apiValue" class="input" placeholder="请输入API名称或URL" />
                </div>
                <div>
                    <span>所属功能:</span>
                    <a-select ref="select" v-model:value="selectValue" style="width: 120px" @focus="focus" @change="handleChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </div>
                <div>
                    <a-button type="primary">提交</a-button>
                    <a-button>取消</a-button>
                </div>
            </div>
            <a-form-item label="客户等级">
                <a-checkbox-group v-model:value="grade">
                    <a-checkbox value="1" name="1">普通客户</a-checkbox>
                    <a-checkbox value="2" name="2">金卡客户</a-checkbox>
                    <a-checkbox value="3" name="3">白金客户</a-checkbox>
                    <a-checkbox value="4" name="6">铂金客户</a-checkbox>
                    <a-checkbox value="5" name="4">幸福有约客户</a-checkbox>
                    <a-checkbox value="6" name="5">黑钻客户</a-checkbox>
                </a-checkbox-group>
            </a-form-item>
        </a-card>
        <!-- 表格 -->
        <a-card>
            <h1>共922条数据 </h1>
            <template style="display: block;">
                <a-table :dataSource="dataSource" :columns="columns">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'grade'">
                            <a>
                                查看详情
                            </a>
                        </template>
                        <template v-else-if="column.key === 'error'">
                            <div>
                                <p :style="{width: '10px', height:'10px', backgroundColor: record.error ? 'red' : 'green', borderRadius: '50%', display: 'inline-block', position: 'relative', top: '15px'}"></p> <span> {{record.error ? '异常' : '正常'}}</span>
                            </div>
                        </template>
                    </template>    
                </a-table>
            </template>
        </a-card>
    </div>
</template>

<script lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import 'echarts-liquidfill';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'
export default {
    name: 'ApiMonitoring',
    components:{
        SmileOutlined,
        DownOutlined
    },
    // components: {},
    setup() {
        let echart = inject('echart')
        let store = useStore();
        store.commit('changeBreadcrumbList', ['工作台', '接口监控数据']);
        console.log(store.getters.getBreadcrumbList)
        const focus = () => {
            console.log('focus');
        };
        const handleChange = (value: string) => {
             console.log(`selected ${value}`);
        };

        const  dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                url: '/main/check',
                feature: '官微服务-意外险',
                responseTimeAvg: 25,
                request: 1312,
                grade: '...',
                success: '99.98%',
                error: false
            }, {
                key: '2',
                name: '胡彦斌',
                url: '/main/check',
                feature: '官微服务-意外险',
                responseTimeAvg: 25,
                request: 1312,
                grade: '...',
                success: '99.98%',
                error: true
            },
           
        ];

       const  columns = [
            {
                title: 'API名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'URL',
                dataIndex: 'url',
                key: 'url',
            }, {
                title: '所属功能',
                dataIndex: 'feature',
                key: 'feature',
            },{
                title: '5min请求量',
                dataIndex: 'request',
                key: 'request',
            }, {
                title: '平均响应时间',
                dataIndex: 'responseTimeAvg',
                key: 'responseTimeAvg',
            }, {
                title: '客户等级分布',
                dataIndex: 'grade',
                key: 'grade',
            }, {
                title: '访问成功比例',
                dataIndex: 'success',
                key: 'success',
            }, {
                title: '异常运行',
                dataIndex: 'error',
                key: 'error',
            },
        ];

        onMounted(() => {
            let blackDiamondChart = (echart as any).init(document.getElementById('blackDiamond'));
            let happinessChart = (echart as any).init(document.getElementById('happiness'));
            let zunDiamondChart = (echart as any).init(document.getElementById('zunDiamond'));
            let serverChart = (echart as any).init(document.getElementById('server'));
            let apiChart = (echart as any).init(document.getElementById('api'));
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: ["#27D9C8", "#D8D8D8"],
                title: {
                    text: "28%",
                    left: "center",
                    top: "50%",
                    textStyle: {
                        color: "#27D9C8",
                        fontSize: 36,
                        align: "center"
                    }
                },
                graphic: {
                    type: "text",
                    left: "center",
                    top: "40%",
                    style: {
                        text: "黑钻",
                        textAlign: "center",
                        fill: "#333",
                        fontSize: 20,
                        fontWeight: 700
                    }
                },
                series: [
                    {
                        name: '运动情况',
                        type: 'pie',
                        radius: ['90%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },

                        },

                        data: [
                            { value: 80, name: '已完成' },
                            { value: 20, name: '未完成' },

                        ]
                    }
                ]
            };
            blackDiamondChart.setOption(option)
            //幸福有约
            happinessChart.setOption(option)
            happinessChart.setOption({
                title: {
                    text: '22%'
                },
                graphic: {
                    style: {
                        text: '幸福有约'
                    }
                }
            })
            //尊钻
            zunDiamondChart.setOption(option)
            zunDiamondChart.setOption({
                title: {
                    text: '22%'
                },
                graphic: {
                    style: {
                        text: '尊钻'
                    }
                }
            });
            // 服务器压力
            var serverChartOption = {series: [
                {
                    name: "系列名称",
                    type: 'liquidFill',
                    data: [0.7],
                    label: {
                        normal: {
                            formatter: "服务器压力\n 72%",  //显示在水球图中间的文字，可以是字符串，可以是占位符，也可以是一个函数。
                            //如果使用{a}\n{b}\nValue: {c} ，a代表系列名称，b代表数据名称，c代表数据值。
                            textStyle: {
                                color: '#000',  //默认背景下的文字颜色
                                insideColor: 'blue', //水波背景下的文字颜色
                                fontSize: 16   //字体大小
                            }
                        }
                    },
                    radius: '80%'
                }
            ]};
            serverChart.setOption(serverChartOption)
            // 接口平均访问成功率
            let apiChartOption = {
                series: [
                    {
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 1,
                        splitNumber: 8,
                        axisLine: {
                            lineStyle: {
                                width: 6,
                                color: [
                                    [0.25, '#FF6E76'],
                                    [0.5, '#FDDD60'],
                                    [0.75, '#58D9F9'],
                                    [1, '#7CFFB2']
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 20,
                            offsetCenter: [0, '-60%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            length: 12,
                            lineStyle: {
                                color: 'auto',
                                width: 1
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto',
                                width: 2
                            }
                        },
                        axisLabel: {
                            color: '#464646',
                            fontSize: 12,
                            distance: -60,
                            formatter: function (value: number) {
                                if (value === 0.875) {
                                    return '优';
                                } else if (value === 0.625) {
                                    return '良';
                                } else if (value === 0.375) {
                                    return '中';
                                } else if (value === 0.125) {
                                    return '差';
                                }
                                return '';
                            }
                        },
                        title: {
                            offsetCenter: [0, '35%'],
                            fontSize: 16
                        },
                        detail: {
                            fontSize: 16,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function (value: number) {
                                return Math.round(value * 100) + '分';
                            },
                            color: 'auto'
                        },
                        data: [
                            {
                                value: 0.97,
                                name: '接口访问成功率'
                            }
                        ]
                    }
                ]
            };
            apiChart.setOption(apiChartOption)
            window.onresize = function () {
                blackDiamondChart.resize();
                happinessChart.resize();
                zunDiamondChart.resize();
                serverChart.resize();
                apiChart.resize();
            }
        })

        return {
            apiValue: ref<string>(''),
            selectValue:  ref<string>(''),
            grade: ref<string[]>([]),
            focus,
            handleChange,
            columns: reactive(columns),
            dataSource: reactive(dataSource),
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .analysis {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        .chart {
            width: 100%;
            height: 230px;
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            #api {
                position: relative;
                top: 30px;
            }
        }
    }
    .search {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        &>div{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 5px;
            flex-grow: 1;
            flex-shrink: 1;
        }
    }
    .ant-form-item{
        margin: 0 !important;
    }
}
</style>
