interface SideNavConfig {
    type: string;
    name: string;
    icon?: string;
    link?: string;
    children?: SideNavConfig[];
}

const NAV_CONFIG: SideNavConfig[] = [{
    type: 'group',
    name: '工作台',
    icon: '', 
    link: '',
    children: [{
        type: 'item',
        name: '接口运行监控',
        icon:'<up-circle-two-tone />',
        link: ''
    }, {
        type: 'item',
        name: '数据监控',
        icon:'',
        link: ''
    }]
}, {
    type: 'group',
    name: '功能模块配置',
    icon:'',
    link: '',
    children: []
}, {
    type: 'group',
    name: '广告配置',
    icon:'',
    link: '',
    children: []
}]

export default {
    NAV_CONFIG
}