const AUTH_TOKEN=localStorage.getItem("AUTH_TOKEN")
export const api={
    async addContact(data){
       const response = await fetch("https://v1.stormapi.com/contacts/create",{
           method:"POST",
           mode:"cors",
           headers:{
               "Content-Type":"application/json",
               "Authorization":`Bearer ${AUTH_TOKEN}`
           },
           body:data
       })
       return response.json()
    },
    async addContacts(data){
        const response = await fetch("https://v1.stormapi.com/contacts/create-all",{
           method:"POST",
           mode:"cors",
           headers:{
               "Content-Type":"application/json",
               "Authorization":`Bearer ${AUTH_TOKEN}`
           },
           body:data
       })
       return response.json()
    },
    async updateContact(data){
        const response = await fetch("https://v1.stormapi.com/contacts/update",{
           method:"POST",
           mode:"cors",
           headers:{
               "Content-Type":"application/json",
               "Authorization":`Bearer ${AUTH_TOKEN}`
           },
           body:data
       })
       return response.json()
    },
    async updateContacts(data){
        const response = await fetch("https://v1.stormapi.com/contacts/update-all",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            },
            body:data
        })
        return response.json()
    },

    async readContact(id){
        const response = await fetch(`https://v1.stormapi.com/contacts/read/${id}`,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            }
        })
        return response.json()
    },
    async readContacts(){
        const response = await fetch("https://v1.stormapi.com/contacts/read-all",{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            }
        })
        return response.json()
    },
    async readContactsFilter(query){
        const response = await fetch(`https://v1.stormapi.com/contacts/read-all?query=${query}`,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            }
        })
        return response.json()
    },

    async deleteContact(id){
        const response = await fetch(`https://v1.stormapi.com/contacts/delete/${id}`,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            }
        })
        return response.json()
    },
    async deleteContacts(ids){
        const response = await fetch(`https://v1.stormapi.com/contacts/delete/${ids}`,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${AUTH_TOKEN}`
            }
        })
        return response.json()
    }
}
