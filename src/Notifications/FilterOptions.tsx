import { Notification, FilterOptions, Action, FilterAction, Status, Tag } from "../types/notifications.types";
import { ACTIONS } from './index';
import React from 'react';

type props = {
    filterOptions:FilterOptions;
    setFilterOptions: React.Dispatch<FilterAction>;
    setAction: React.Dispatch<React.SetStateAction<Action>>;
}
const FilterOptionsContainer = ({ filterOptions ,setFilterOptions,setAction }:props) => {
  const handleStatusClick=(e:React.MouseEvent<HTMLLIElement>)=>{
    let status = e.currentTarget.dataset.status! as Status;
    setFilterOptions({type:ACTIONS.SET_STATUS,payload: status})
  }
  const handleTagClick = (e:React.MouseEvent<HTMLLIElement>)=>{
    let tag = e.currentTarget.dataset.tag! as Tag;
    setFilterOptions({type:ACTIONS.SET_TAGS,payload:tag});
  }
  
  return (
    <div className="filterContainer">
      <div className="searchContainer">
        <h3>Search</h3>
        <input type="text" />
      </div>
      <div>
        <div>
          <h3>Status</h3>
          <ul>
            <li data-status="unread" style={{background:filterOptions.status.includes('unread')?'lightblue':""}} onClick={handleStatusClick}>Unread</li>
            <li data-status="read" style={{background:filterOptions.status.includes('read')?'lightblue':""}} onClick={handleStatusClick}>Read</li>
            <li data-status="bookmarked" style={{background:filterOptions.status.includes('bookmarked')?'lightblue':""}} onClick={handleStatusClick}>Bookmarked</li>
          </ul>
        </div>
        <div>
          <h3>Tag</h3>
          <ul>
            <li data-tag="system"  onClick={handleTagClick}>System</li>
            <li data-tag="promo" onClick={handleTagClick}>Promo</li>
            <li data-tag="social" onClick={handleTagClick}>Social</li>
          </ul>
        </div>
        <div>
          <h3>Actions</h3>
          <ul>
            <li onClick={()=>{setAction('markRead')}}>Mark read</li>
            <li onClick={()=>{setAction('markUnread')}}>Mark unread</li>
            <li onClick={()=>{setAction('bookmark')}}>Bookmark</li>
            <li onClick={()=>{setAction('delete')}}>Delete</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FilterOptionsContainer;
