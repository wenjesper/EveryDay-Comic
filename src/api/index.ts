import  http  from "@/http";
import type {PwebHome,Updata,BangDan,Detail,Chapter,SortData,search,searchM} from "@/typings";

//首页的全部数据
export const Api ={
    getHomeData:() =>{
      return http.request<PwebHome>({
            url:'v2/pweb/home',
            method:'get'
        })
    },

//每天更新的另一部分

    getUpdata:() =>{
      return http.request<Updata>({
            url:'v2/pweb/daily/topics?pos=6',
            method:'get'
        })
    },
    
//榜单数据

    getBangDan:(id:number) =>{
      return http.request<BangDan>({
            url:`v2/pweb/rank/topics?rank_id=${id}`,
            method:'get'
        })
    },


    getDetail:(id:unknown) =>{
      return http.request<Detail>({
            url:`v2/pweb/topic/${id} `,
            method:'get'
        })
    },

    getChapter:(id:unknown) =>{
      return http.request<Chapter>({
            url:`v2/pweb/comic/${id} `,
            method:'get'
        })
    },
    getChapter2:(id:number) =>{
      return http.request<Chapter>({
            url:`v2/pweb/comic/${id} `,
            method:'get'
        })
    },
    getChapter3:(id:number) =>{
      return http.request<Chapter>({
            url:`v2/pweb/comic/${id} `,
            method:'get'
        })
    },

    //获取分类
    
    getSort:(tag_id:number,update_id:number,topic_id:number,num:number) =>{
        return http.request<SortData>({
            url:`v1/search/by_tag?since=0&count=${num}&f=3&tag=${tag_id}&sort=${topic_id}&query_category={"update_status":${update_id}} `,
            method:'get'
        })
    },
    // 获取搜索结果
    getSearch:(name:unknown)=>{
        return http.request<search>({
              url:`v1/search/topic?q=${name}&f=3&size=18 `,
              method:'get'
          })
      },
    // 获取模糊搜索
    getSearchM:(name:string) =>{
        return http.request<searchM>({
              url:`v1/search/suggestion_topic_author?q=${name}&type=2&f=2 `,
              method:'get'
          })
      }
}
