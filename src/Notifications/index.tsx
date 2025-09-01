import React from 'react';
import {
  Notification,
  FilterOptions,
  FilterAction,
  Action
} from '../types/notifications.types'; 
import FilterOptionsContainer from './FilterOptions';
import useLocalStorage from '../hooks/useLocalStorage';
const dummyNotifications: Notification[] = [
  {
    title: "Welcome to the platform!",
    message: "Thank you for signing up. We're glad to have you here.",
    time: "2025-08-30T09:15:00Z",
    tag: "system",
    read:true,
  },
  {
    title: "50% Off Promo!",
    message: "Get 50% off on your next purchase. Limited time offer!",
    time: "2025-08-29T14:45:00Z",
    tag: "promo",
    read:true

  },
  {
    title: "Friend Request",
    message: "John Doe has sent you a friend request.",
    time: "2025-08-28T18:30:00Z",
    tag: "social",
    read:false
  },
  {
    title: "Security Alert",
    message: "New login from unknown device.",
    time: "2025-08-27T07:20:00Z",
    tag: "system",
    read:false
  },
  {
    title: "Exclusive Promo",
    message: "Unlock special rewards by completing your profile.",
    time: "2025-08-26T11:10:00Z",
    tag: "promo",
    read:false
  },
  {
    title: "Mentioned in a comment",
    message: "Jane mentioned you in a comment.",
    time: "2025-08-25T16:50:00Z",
    tag: "social",
    read:false

  }
];

const initialState:FilterOptions = {
    searchText:"",
    status: [],
    tags:[],
}
export const ACTIONS= {
    SET_SEARCH_TEXT:'SET_SEARCH_TEXT',
    SET_STATUS:'SET_STATUS',
    SET_TAGS:'SET_TAGS',
    SET_ACTION:'SET_ACTION'
} as const;

const filterReducer = (state:FilterOptions,action:FilterAction):FilterOptions=>{
    switch(action.type){
        case ACTIONS.SET_SEARCH_TEXT:
            return {...state, searchText: action.payload}
        case ACTIONS.SET_STATUS:{
            const exists = state.status.includes(action.payload);
            return {...state,status:exists?state.status.filter(s=>s!==action.payload):[...state.status,action.payload]}
        }
        case ACTIONS.SET_TAGS:{
            let exists = state.tags.includes(action.payload)
            return {...state,tags:exists?state.tags.filter(t=>t!==action.payload):[...state.tags,action.payload]};
        }
    }
}
const Notifications = ()=>{
    const [notifications,setNotifications]=useLocalStorage<Notification[]>('notifications',dummyNotifications);
    const [selected,setSelected]=React.useState<string[]>([]);
    const [filterOptions,setFilterOptions]=React.useReducer(filterReducer,initialState);
    const [action,setAction]=React.useState<Action>("")
    const filteredNotifications = React.useMemo(()=>{
        let res:Notification[]=[];
        if(filterOptions.status.length>0 || filterOptions.tags.length>0 || filterOptions.searchText.length>0){
            for(const s of filterOptions.status){
                for(const n of notifications){
                    if(s==='read' && n[s]===true && !res.some(r=>r.title===n.title)){
                        res.push(n);
                    }else if(s==='unread' && n['read']===false && !res.some(r=>r.title===n.title)){
                        res.push(n);
                    }else if(s==='bookmarked' && n['bookmarked'] && !res.some(r=>r.title===n.title)){
                        res.push(n);
                    }
                }
            }
            for(const s of filterOptions.tags){
                for(const n of notifications){
                    if(n.tag===s && !res.some(r=>r.title===n.title)){
                        res.push(n);
                    }
                }
            }
            
            for(const n of notifications){
                if(n.message.includes(filterOptions.searchText) && !res.some(r=>r.title===n.title) && filterOptions.searchText){
                    res.push(n);
                }
            }
        }else{
            res=notifications;
        }
        return res;
    },[filterOptions,notifications])
    {console.log(notifications,filterOptions,'here')}
    React.useEffect(()=>{
        let edited:Notification[]=[];
        switch(action){
            case 'markRead':{
                edited = notifications.map(n=>{
                    return {
                        ...n,
                        read:selected.some(s=>s===n.title) || n.read
                    }
                })
                setAction('')
                break;
            }
            case 'markUnread':{
                console.log("inside of mark unread");
                edited = notifications.map(n=>{
                    return {
                        ...n,
                        read:selected.includes(n.title)?false:n.read
                    }
                })
                setAction('')
                console.log("edited",edited)
                break;
            }
            case 'bookmark':{
                edited = notifications.map(n=>{
                    return {
                        ...n,
                        bookmark: selected.some(s=>s===n.title)
                    }
                })
                setAction('')
                break;
            }
            case 'delete':{
                edited = notifications.filter(n=>{
                    return !selected.includes(n.title)
                })

                setAction('')
                break;
            }
            default:{
                edited = notifications;
            }
        }
        setNotifications(edited);
        
    },[action])

    return <div>
        <h4>notification system</h4>
        <FilterOptionsContainer filterOptions={filterOptions} setAction={setAction} setFilterOptions={setFilterOptions}/>
        <ul className="notificationList container">
            {filteredNotifications.map(notification=>{
                return <li key={notification.title} style={{backgroundColor:notification.read?'lightblue':''}}>
                    <input
                     type='checkbox'
                     onChange={
                        (e:React.ChangeEvent<HTMLInputElement>)=>{
                        if(e.target.checked){
                            setSelected((prev:string[])=>{
                                return [...prev,notification.title]
                            })
                        }else{
                            setSelected((prev:string[])=>{
                                let temp=prev.filter(p=>p!==notification.title)
                                return temp;
                            })
                        }
                    }}/>
                    <p>{notification.title}</p>
                    <p>{notification.message}</p>
                </li>
            })}
        </ul>
    </div>
}
export default Notifications