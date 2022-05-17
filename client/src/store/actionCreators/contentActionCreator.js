import {
    CONTENT_SET_SUCCEED,
    CONTENT_SET_CONTENTS,
    CONTENT_SET_PRELOADER,
    CONTENT_SET_ADD_FORM,
    CONTENT_CLEAR_ADD_FORM
} from "../actions/contentActions"
  
export function contentSetSucceed(data){
    return {
        type: CONTENT_SET_SUCCEED,
        data
    }
}
  
export function contentSetPreloader (isLoading) {
    return {
        type: CONTENT_SET_PRELOADER,
        data: isLoading
    }
}
  
export function contentSetContents(data) {
    return {
        type: CONTENT_SET_CONTENTS,
        data
    }
}
  
export function contentLoadContents() {
    return async(dispatch) => {
        dispatch(contentSetPreloader(true))
    
        const method = 'GET'
        const headers = {'Content-Type': 'application/json'}
        const responce = await fetch("/api/content", {method, headers})

        const data = await responce.json()
        if (responce.ok) {
            dispatch(contentSetContents(data))
        }
    
        dispatch(contentSetPreloader(false))
    }
}
  
export function contentSetAddForm(name, value) {
    return {
        type: CONTENT_SET_ADD_FORM,
        data: {name, value}
    }
}
  
export function contentClearAddForm () {
    return {
        type: CONTENT_CLEAR_ADD_FORM
    }
}
  
export function contentAdd(form){
    return async(dispatch) => {
        dispatch(contentSetPreloader(true))
        
        const data = new FormData()
        data.append("name", form.name)
        data.append("url", form.url)
        data.append("file", form.file)

        const XHRRequest = new XMLHttpRequest()
        XHRRequest.open("POST", "/api/content")
        XHRRequest.send(data)

        XHRRequest.onload = function() {
            if (XHRRequest.status === 200) {
                dispatch(contentSetSucceed(true))
                dispatch(contentClearAddForm())
            }
        }

        dispatch(contentSetPreloader(false))
    }
}
  
export function contentDelete(playlistId) {
    return async(dispatch) => {
        dispatch(contentSetPreloader(true))
    
        const method = 'DELETE'
        const headers = {'Content-Type': 'application/json'}
        const responce = await fetch("/api/content/" + playlistId, {method, headers})
    
        if (responce.ok) {
            dispatch(contentLoadContents())
        }
    
        dispatch(contentSetPreloader(false))
    }
}