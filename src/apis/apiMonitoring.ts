// import post from '@/util/axios'
import api from '@/util/axios'

const fetch = (url: string, data: any) => {
    return api.get(url, data)
}

