
export const api={
    async login(data){
        const response = await fetch("https://v1.stormapi.com/users/login",{
           method:"POST",
           body:data
       })
       return response.json()
    },

    async addContact(data,AUTH_TOKEN){
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
    async addContacts(data,AUTH_TOKEN){
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
    async updateContact(data,AUTH_TOKEN){
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
    async updateContacts(data,AUTH_TOKEN){
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

    async readContact(id,AUTH_TOKEN){
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
    async readContacts(AUTH_TOKEN){
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
    async readContactsFilter(query,AUTH_TOKEN){
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

    async deleteContact(id,AUTH_TOKEN){
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
    async deleteContacts(ids,AUTH_TOKEN){
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
