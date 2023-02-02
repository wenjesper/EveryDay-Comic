export interface PopularityTopics {
    id: number,
    cover_image_url: string
    vertical_image_url: string
    square_image_url: string
    title: string
    description: string
    tags: Array<string>
    user: {
        user_id: number
        nickname: string
        avatar: string
    },
    latest_comic: {
        id: number
        title: string
        locked_code: number
        likes_count_number: number
    },
    signing_status: string,
    update_remind: string
}

export interface BannersType {
    action_type: number
    target_id: number
    image_url: string
}

export interface CategoriesType {
    tagId: number
    title: string
}
//discovery_modules的topics分化
export interface DiscoveryModules {
    title: string
    topics: Array<topicsType>
}
export interface topicsType {
    id: number
    cover_image_url: string
    vertical_image_url: string
    square_image_url: string
    title: string
    description: string
    likes_count: string
    tags: Array<string>
    user: {
        user_id: number
        nickname: string
        avatar: string
    },
    view_count_info: string
    signing_status: string
    update_remind: string
}
export interface RanksType {
    rank_id: number
    title: string
    next_update_date: string
    rank_desc: string
    topics: [{
        id: number
        cover_image_url: string
        vertical_image_url: string
        square_image_url: string
        title: string
        description: string
        tags: Array<string>
        user: {
            user_id: number
            nickname: string
            avatar: string
        },
        latest_comic: {
            id: number
            title: string
            locked_code: number
            likes_count_number: number
        },
        rank_change_type: number
        rank_change_value: string
        signing_status: string
        update_remind: string
    }]
}
//daily_topics:拆分
export interface DailyTopic {
    id: number
    cover_image_url: string
    vertical_image_url: string
    square_image_url: string
    title: string
    description: string
    likes_count: string
    tags: Array<string>
    user: {
        user_id: number
        nickname: string
        avatar: string
    },
    signing_status: string
    update_remind: string
}
// export interface UgcTopicsType{

//  }
// export interface RecTopicsType{

//  }
//全部首页数据
export interface PwebHome {
    data: {
        popularity_topics: Array<PopularityTopics> //热门话题
        banners: Array<BannersType> //轮播
        categories: Array<CategoriesType>  //类别
        discovery_modules: Array<DiscoveryModules>//发现
        ranks: Array<RanksType>  //快捷榜单(三个)
        daily_topics: {    //每日主题(更新)
            week_days: Array<string>
            topics: Array<DailyTopic>
        }
        ugc_topics: Array<DailyTopic>
        rec_topics: Array<DailyTopic>
    }
}
//更新列表2
export interface Updata {
    data: {
        week_days: Array<string>
        topics: Array<DailyTopic>
    }
}
//榜单全部数据
export interface BangDan {
    data: {
        rank_info: {
            rank_id: number
            title: string
            next_update_date: string
            rank_desc: string
            topics: Array<BangDanRanksTopics>
        }
    }
}
// 榜单数据分类
// export interface BangDanRanks{
//     rank_id:number
//     title:string
//     next_update_date:string
//     rank_desc:string
//     topics:Array<BangDanRanksTopics>
// }

// 新topic
export interface BangDanRanksTopics {
    id: number
    cover_image_url: string
    vertical_image_url: string
    square_image_url: string
    title: string
    description: string
    tags: Array<string>
    user: {
        user_id: number
        nickname: string
        avatar: string
    },
    latest_comic: {
        id: number
        title: string
        locked_code: number
        likes_count_number: number
    },
    rank_change_type: number
    rank_change_value: string
    signing_status: string
    update_remind: string
}

// 详情页

export interface DetailComics {
    id: number
    title: string
    cover_image_url: string
    is_pay_comic: boolean
    need_vip: boolean
    locked: boolean
    locked_code: number
    likes_count: string
    likes_count_number: number
    created_at: string
    is_free: boolean
    is_vip_exclusive: boolean
}
export interface DetailTopicInfo {
    id: number
    cover_image_url: string
    vertical_image_url: string
    title: string
    description: string
    likes_count: string
    origin_likes_count: number
    comments_count: string
    origin_comments_count: number
    popularity_info: string
    fav_count: string
    comics_count: number
    comic_body_count: number
    tags: Array<string>
    comics: Array<DetailComics>
    first_comic_id: number
    user: {
        user_id: number
        nickname: string
        avatar: string
    },
    signing_status: string
    is_free: boolean
    update_status: string
    is_favourite: boolean
}
export interface DetailRecommendTopics {
    id: number
    cover_image_url: string
    vertical_image_url: string
    title: string
    description: string
    likes_count: string
    origin_likes_count: number
    comments_count: string
    origin_comments_count: number
}
export interface BottomTopic {
    id: number
    cover_image_url: string
    vertical_image_url: string
    square_image_url: string
    title: string
    description: string
    tags: Array<string>
    user: {
        user_id: number
        avatar: string
    },
    signing_status: string
    update_remind: string,
    update_time: string
}
export interface Detail {
    data: {
        topic_info: DetailTopicInfo
        recommend_topics: Array<DetailRecommendTopics>
        bottom_recommend: {
            title:string,
            topic_list:Array<BottomTopic>
        }
    }
}

//章节详情

export interface Chapter {
    data: {
        comic_info:ChapterComicInfo
        previous_comic_info:{
            id:number
            locked_code:number
            likes_count_number:number
        }
        next_comic_info:{
            id:number
            locked_code:number
            likes_count_number:number
        },
        topic_info:ChapterTopicInfo
        recommend_topics:Array<ChapterRecommendTopics>
    }
}

export interface ChapterComicInfo{
    id:number
    title:string
    cover_image_url:string
    comic_images:[{
        width:number
        height:number
        url:string
    }],
    is_pay_comic:boolean,
    need_vip:boolean,
    locked:boolean,
    locked_code:number
    likes_count:string
    likes_count_number:number
    created_at:string
    is_free:boolean
    is_vip_exclusive:boolean
}

export interface ChapterTopicInfo{
    id:number
    title:string
    tags:Array<string>
    comics:Array<DetailComics>
    user:{
        user_id:number
        nickname:string
        avatar:string
    },
    signing_status:string
    is_free:boolean
}

export interface ChapterRecommendTopics{
    id:number
    cover_image_url:string
    vertical_image_url:string
    title:string
    description:string
    likes_count:string
    origin_likes_count:number
    comments_count:string
    origin_comments_count:number
}



//获取分类,向下找
export interface SortData{
    data:{
        recommend_text_interval:number
        topics:Array<SortTopic>
        tags:[{
            tag_id:number
            title:string
        }],
        update_status:Array<SortTags>
        paying_rule_status:Array<SortTags>
        label_dimension_origin:Array<SortTags>
        topic_properties:Array<SortTags>
    }
}
export interface SortTags{
    code:number
    description:string
}
export interface SortTopic{
    id:number
    title:string
    vertical_image_url:string
    cover_image_url:string
    description:string
    update_status:number
    is_free:boolean
    related_topic_id:number
    category:Array<string>
    popularity:number
    view_count:number
    is_favourite:boolean
    latest_comic_title:string
    comic_count:number
    comics_count:number
    comment_count:number
    comments_count:number
    likes_count:number
    favourite_count:number
    created_at:string
    first_comic_publish_time:string
    user_id:number
    user:{
    id:number
    nickname:string
    }
    strategy_recommendation:string
    text_mask:string
    recommend_text:string
    sentence_desc:string
    action_type:{
    type:number
    target_id:number
    },
    is_outer:boolean
    corner_text:string
    sub_title:string
    popularity_increment:number
    continueReadComic:{
    id:number
    title:string
    },
    user_topic_read_chapter:number
}


//搜索
export interface search{
    data:{
        since:-1,
        total:1,
        hit:Array<hit>
        topic_click_action_type:"half_screen_comic"
    }
}
export interface hit{
    id:number
    title:string
    vertical_image_url:string
    cover_image_url:string
    description:string
    update_status:number
    is_free:false,
    related_topic_id:number
    category:Array<string>
    popularity:number
    view_count:number
    is_favourite:boolean
    latest_comic_title:string
    comic_count:number
    comics_count:number
    comment_count:number
    comments_count:number
    likes_count:number
    favourite_count:number
    created_at:string
    first_comic_publish_time:string
    user_id:number
    user:{
    id:number
    nickname:string
    },
    strategy_recommendation:string
    text_mask:string
    recommend_text:string
    sentence_desc:string
    action_type:{
    type:number
    target_id:number
    },
    is_outer:boolean
    continueReadComic:{
    id:number
    title:string
    },
    user_topic_read_chapter:number
}
//模糊搜索
export interface searchM{
    data:{
        info:Array<str>
    }
}
export interface str{
    title:string
}