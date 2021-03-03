
export const api={
    async signIn(username,password){
        let formData =new FormData();
        formData.append("app_name", "CS-SPA-REACT");
        formData.append("username", username);
        formData.append("password", password);
        const response = await fetch("https://v1.stormapi.com/users/login",{
           method:"POST",
           body:formData
       })
       return response.json()
    },

    async addContact(data,AUTH_TOKEN){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
       const response = await fetch("contacts/create",{
           method:"POST",
           mode:"cors",
           headers:myHeaders,
           body:data
       })
       return response.json()
    },
    async addContacts(data,AUTH_TOKEN){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        const response = await fetch("https://v1.stormapi.com/contacts/create-all",{
           method:"POST",
           mode:"cors",
           headers:myHeaders,
           body:data
       })
       return response.json()
    },
    async updateContact(data,AUTH_TOKEN){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        const response = await fetch("/contacts/update",{
           method:"POST",
           mode:"cors",
           headers:myHeaders,
           body:data
       })
       return response.json();
    },
    async updateContacts(data,AUTH_TOKEN){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        const response = await fetch("https://v1.stormapi.com/contacts/update-all",{
            method:"POST",
            mode:"cors",
            headers:myHeaders,
            body:data
        })
        return response.json()
    },

    async readContact(id,AUTH_TOKEN){
        let myHeaders = new Headers();
        var formdata = new FormData();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          }; 

        let response = await fetch(`/contacts/read/${id}`, requestOptions)
        return response.json()
    },
    async readContacts(AUTH_TOKEN){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        
        var formdata = new FormData();
        formdata.append("is_deleted", "0");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        let response = await fetch("/contacts/read-all?query={\"filter_by\":{\"is_deleted\":\"0\"}}", requestOptions)
        return response.json()
          
    },
    async readContactsFilter(AUTH_TOKEN,query){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        
        var formdata = new FormData();
        
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        let response = await fetch(`/contacts/read-all?query=${query}`, requestOptions)
        return response.json()
    },

    async deleteContact(id,AUTH_TOKEN){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        
        var formdata = new FormData();
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        let response = await fetch(`/contacts/delete/${id}`, requestOptions)
        return response.json()
    },
    async deleteContacts(ids,AUTH_TOKEN){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
        
        var formdata = new FormData();
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        let response = await fetch(`/contacts/delete/${ids}`, requestOptions)
            console.log(response.json())
    }
}
